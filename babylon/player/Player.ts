import {
    Camera,
    Mesh,
    Scene,
    TransformNode,
    Vector3
} from "@babylonjs/core";
import {createCamera} from "~/babylon/player/PlayerCamera";

export class Player extends TransformNode {
    private readonly _camera: Camera;
    private _mesh: Mesh;
    private _input;

    constructor(name: string, mesh: Mesh, canvas: HTMLCanvasElement, scene: Scene, input?) {
        super(name, scene);
        this._mesh = mesh;
        this._mesh.parent = this;
        this._input = input;
        this._camera = this._createPlayerCamera(canvas);
        this._camera.parent = this;
    }

    get camera(): Camera {
        return this._camera;
    }

    private _createPlayerCamera(canvas: HTMLCanvasElement): Camera {
        return createCamera('camera', canvas, -Math.PI / 2, Math.PI / 3, 10, Vector3.Up(), this._scene);
    }
}
