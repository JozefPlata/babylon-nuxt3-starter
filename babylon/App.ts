import {
    Color3,
    Engine,
    HemisphericLight,
    Texture,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3
} from "@babylonjs/core";
import {GameManager} from "~/babylon/GameManager";
import {KeyboardInput} from "~/babylon/player/KeyboardInput";
import {Player} from "~/babylon/player/Player";
import {PlayerInput} from "~/babylon/player/PlayerInput";

export class App {
    private static _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private _gameManager: GameManager;

    constructor() {
        const worldScene = this._init();

        this._createWorld();

        const players = this._createPlayers(1);

        this._setupPlayersMovement(players, worldScene);

        worldScene.onReadyObservable.addOnce(() => {});

        this._runRenderLoop();
    }

    public static get canvas(): HTMLCanvasElement {
        return App._canvas;
    }

    private _init(): Scene {
        App._canvas = <HTMLCanvasElement> document.getElementById('babylonCanvas');
        this._engine = new Engine(App.canvas, true);
        this._gameManager = GameManager.Instance;
        this._gameManager.scene = new Scene(this._engine);
        return this._gameManager.scene;
    }

    private _createWorld(): void {
        const light: HemisphericLight = new HemisphericLight('light', new Vector3(1, 1, 0.75), this._scene);
        light.intensity = 0.7;
        const ground: Mesh = MeshBuilder.CreateGround('ground', { width:100, height:100 }, this._scene);
        const groundMaterial: StandardMaterial = new StandardMaterial('groundMaterial');
        const groundTexture: Texture = new Texture('/checker.jpg');
        groundTexture.uScale = 10;
        groundTexture.vScale = 10;
        groundMaterial.diffuseTexture = groundTexture;
        groundMaterial.diffuseColor = new Color3(0.5, 1, 0.5);
        ground.material = groundMaterial;
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
}
