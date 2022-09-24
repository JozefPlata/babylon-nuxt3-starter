import {Camera, Mesh, Scene, TransformNode, Vector3} from "@babylonjs/core";
import {Constraint} from "~/babylon/player/Constraint";

export class Character extends TransformNode {
    private _type: CharacterType;
    private readonly _model: Mesh;
    private readonly _rotator: TransformNode;
    private readonly _rotationConstraint: Constraint;

    constructor(type: CharacterType, name: string, model: Mesh, position: Vector3, constraintTarget: Camera | TransformNode, scene: Scene) {
        super(name, scene);
        this._type = type;
        this._model = model;
        this.position = position;
        this._rotator = new TransformNode('rotator', scene);
        this._rotationConstraint = new Constraint(this._rotator, constraintTarget);

        this._model.setParent(this);
        this._rotator.setParent(this);
        constraintTarget.parent = this;
    }

    get model(): Mesh {
        return this._model;
    }

    get rotator(): TransformNode {
        return this._rotator;
    }

    get rotationConstraint(): Constraint {
        return this._rotationConstraint;
    }
}

export enum CharacterType {
    PLAYER,
    NPC
}
