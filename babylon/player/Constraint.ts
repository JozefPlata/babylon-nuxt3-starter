import {Camera, TransformNode} from "@babylonjs/core";

export class Constraint {
    private _object: TransformNode;
    private _to: Camera;

    constructor(object: TransformNode, to: Camera) {
        this._to = to;
        this._object = object;
    };

    public makeActive() {
        this._object.rotation = this._to.absoluteRotation.toEulerAngles();
        this._object.rotation.x = 0;
        this._object.rotation.z = 0;
    }
}
