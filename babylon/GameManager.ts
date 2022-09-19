import {Player} from "~/babylon/player/Player";
import {MeshBuilder, Scene} from "@babylonjs/core";
import {App} from "~/babylon/App";
import {PlayerInput} from "~/babylon/player/PlayerInput";

export class GameManager {
    private static _instance: GameManager;
    private _scene: Scene;
    private _players: Array<[Player, PlayerInput]>;

    private constructor() {}

    public static get Instance(): GameManager {
        return this._instance || (this._instance = new this());
    }

    get scene(): Scene {
        return this._scene;
    }

    set scene(scene:Scene) {
        this._scene = scene;
    }

    public getPlayer(id: number): Player {
        return this._players[id][0];
    }

    public getPlayerInput(id: number): PlayerInput {
        return this._players[id][1];
    }

    // get players(): Player[] {
    //     return this._players[0];
    // }

    public createPlayers(count: number): void {
        this._players = [];
        for (let i=0; i<count; i++) {
            const mesh = MeshBuilder.CreateGoldberg('goldberg', { size: 2 }, this._scene);
            mesh.position.set(0, 1, 0);

            const player = new Player(`player_${i}`, mesh, App.canvas, this._scene);
            player.camera.initializePlayerInputs(player);
            const playerInput = player.camera.input;

            this._players.push([player, playerInput]);
        }
    }
}
