import {Camera, Mesh, Scene, TransformNode, Vector3} from "@babylonjs/core";
import {PlayerCamera} from "~/babylon/player/PlayerCamera";
import {Character, CharacterType} from "~/babylon/characters/Character";
import {App} from "~/babylon/App";

export class Player extends Character {
    private readonly _camera: PlayerCamera;

    constructor(name: string, model: Mesh, position: Vector3, scene: Scene) {
        const camera = new PlayerCamera(`camera_${name}`, App.canvas, -Math.PI / 2, Math.PI / 3, 10, Vector3.Up(), scene);
        super(CharacterType.PLAYER, name, model, position, camera, scene);
        this._camera = camera;
    }

    get camera(): PlayerCamera {
        return this._camera;
    }
}
