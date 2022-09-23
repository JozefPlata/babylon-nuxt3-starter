import {Mesh, Scene, TransformNode, Vector3} from "@babylonjs/core";
import {Constraint} from "~/babylon/player/Constraint";

export class Character extends TransformNode {
    private readonly _camera;
    private readonly _model: Mesh;
    private readonly _rotator: TransformNode;
    private readonly _rotationConstraint: Constraint;

    constructor(name: string, model: Mesh, position: Vector3, scene: Scene) {
        super(name, scene);
        this._model = model;
        this.position = position;
    }
}
