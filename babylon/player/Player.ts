import {Mesh, Scene, TransformNode, Vector3} from "@babylonjs/core";
import {PlayerCamera} from "~/babylon/player/PlayerCamera";
import {Constraint} from "~/babylon/player/Constraint";

export class Player extends TransformNode {
    private readonly _camera: PlayerCamera;
    private readonly _mesh: Mesh;
    private readonly _rotator: TransformNode;
    private readonly _rotationConstraint: Constraint;

    constructor(name: string, mesh: Mesh, canvas: HTMLCanvasElement, scene: Scene) {
        super(name, scene);
        this._mesh = mesh;

        this._camera = this._createPlayerCamera(canvas);
        this._rotator = new TransformNode('rotator', scene);
        this._rotationConstraint = new Constraint(this._rotator, this._camera);

        this._mesh.setParent(this);
        this._rotator.setParent(this);
        this._camera.parent = this;
    }

    get camera(): PlayerCamera {
        return this._camera;
    }

    get mesh(): Mesh {
        return this._mesh;
    }

    get rotator(): TransformNode {
        return this._rotator;
    }

    get rotationConstraint(): Constraint {
        return this._rotationConstraint;
    }

    private _createPlayerCamera(canvas: HTMLCanvasElement): PlayerCamera {
        return new PlayerCamera('camera', canvas, -Math.PI / 2, Math.PI / 3, 10, Vector3.Up(), this._scene);
    }
}
