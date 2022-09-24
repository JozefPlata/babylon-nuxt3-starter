import {Camera, TransformNode} from "@babylonjs/core";

export class Constraint {
    private _object: TransformNode;
    private readonly _to: Camera | TransformNode;

    constructor(object: TransformNode, to: Camera | TransformNode) {
        this._to = to;
        this._object = object;
    };

    public active() {
        if (this._to instanceof Camera)
            this._object.rotation = this._to.absoluteRotation.toEulerAngles();
        else if (this._to instanceof TransformNode)
            this._object.rotationQuaternion = this._to.rotationQuaternion;
        this._object.rotation.x = 0;
        this._object.rotation.z = 0;
    }
}
