import {Player} from "~/babylon/player/Player";
import {MeshBuilder, Scene} from "@babylonjs/core";
import {App} from "~/babylon/App";

export class GameManager {
    private static _instance: GameManager;
    private _scene: Scene;
    private _players: Player[];

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
        return this._players[id];
    }

    get players(): Player[] {
        return this._players;
    }

    public createPlayers(count: number): void {
        this._players = [];
        for (let i=0; i<count; i++) {
            const mesh = MeshBuilder.CreateGoldberg('goldberg', { size: 2 }, this._scene);
            mesh.position.set(0, 1, 0);

            const player = new Player(`player_${i}`, mesh, App.canvas, this._scene);
            player.camera.initializePlayerInputs(player);

            this._players.push(player);
        }
    }
}
