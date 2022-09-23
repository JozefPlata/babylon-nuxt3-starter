import {Engine, FreeCamera, Scene, Vector3, Viewport} from "@babylonjs/core";
import {GameManager} from "~/babylon/game/GameManager";
import {World} from "~/babylon/world/World";
import {Player} from "~/babylon/player/Player";
import {PlayerInput} from "~/babylon/player/PlayerInput";
import {KeyboardInput} from "~/babylon/player/KeyboardInput";
import {App} from "~/babylon/App";
import {Debug, DEBUG_MODE} from "~/babylon/game/DEBUG_MODE";

export class Game {
    private _engine: Engine;
    private _gameManager: GameManager;

    constructor(debug_mode: DEBUG_MODE, debug: Debug) {

        if (debug_mode !== 0 ) debug.appStartTime = Date.now();

        const worldScene = this._init();

        this._createWorld(worldScene);

        const players = this._createPlayers(1);

        this._setupPlayersMovement(players, worldScene);

        this._runRenderLoop();

        this._handleWindowResizing();

        worldScene.onReadyObservable.addOnce(() => {
            if (debug_mode !== 0) {
                debug.appFinishTime = Date.now() - debug.appStartTime;
                console.log(`Launched within ${debug.appFinishTime/1000} seconds`);
            }
        });
    }

    private _init(): Scene {
        this._engine = new Engine(App.canvas, true);
        this._gameManager = GameManager.Instance;
        this._gameManager.scene = new Scene(this._engine);
        return this._gameManager.scene;
    }

    private _createWorld(scene: Scene): void {
        new World(scene);
        const camera = new FreeCamera('DEBUG_topCamera', new Vector3(0, 50, 0), scene);
        camera.target = Vector3.Zero();
        scene.activeCameras.push(camera);
    }

    private _createPlayers(count: number): Array<{player: Player, playerInput: PlayerInput}> {
        GameManager.Instance.playerCount = count;
        GameManager.Instance.createPlayers(GameManager.Instance.playerCount);
        const players = [];
        for (let i=0; i<count; i++) {
            players.push({
                player: GameManager.Instance.getPlayer(0),
                playerInput: GameManager.Instance.getPlayerInput(0)
            });
        }

        GameManager.Instance.scene.activeCameras.push(players[0].player.camera);


        GameManager.Instance.scene.activeCameras[0].viewport = new Viewport(0, 0, 0.5, 1.0);
        GameManager.Instance.scene.activeCameras[1].viewport = new Viewport(0.5, 0, 0.5, 1.0);

        return players;
    }

    private _setupPlayersMovement(players: Array<{player: Player, playerInput: PlayerInput}>, scene: Scene) {
        scene.registerBeforeRender(() => {
            players.forEach(value => {
                KeyboardInput.playerMovement(value.player, value.playerInput);
            })
        })
    }

    private _runRenderLoop(): void {
        this._engine.runRenderLoop(() => {
            GameManager.Instance.scene.render();
            GameManager.Instance.getPlayer(0).rotationConstraint.active();
        })
    }

    private _handleWindowResizing(): void {
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}
