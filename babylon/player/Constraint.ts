import {Camera, TransformNode} from "@babylonjs/core";

export class Constraint {
    constructor(public object: TransformNode, public to: Camera) {};

    public rotationType() {
        this.object.rotation = this.to.absoluteRotation.toEulerAngles();
        this.object.rotation.x = 0;
        this.object.rotation.z = 0;
    }
}
