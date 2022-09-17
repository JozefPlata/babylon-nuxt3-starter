import {Camera, Mesh, Scene, TransformNode, Vector3} from "@babylonjs/core";
import {PlayerCamera} from "~/babylon/player/PlayerCamera";

export class Player extends TransformNode {
    private readonly _camera: Camera;
    static mesh: Mesh;
    static rotator: TransformNode;

    constructor(name: string, mesh: Mesh, canvas: HTMLCanvasElement, scene: Scene) {
        super(name, scene);
        Player.mesh = mesh;

        this._camera = this._createPlayerCamera(canvas);

        Player.rotator = new TransformNode('rotator', scene);

        Player.mesh.setParent(this)
        Player.rotator.setParent(this);
        this._camera.parent = this;
    }

    get camera(): Camera {
        return this._camera;
    }

    private _createPlayerCamera(canvas: HTMLCanvasElement): Camera {
        return new PlayerCamera('camera', canvas, -Math.PI / 2, Math.PI / 3, 10, Vector3.Up(), this._scene);
    }
}
