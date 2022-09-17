import {IPlayerInput} from "~/babylon/player/IPlayerInput";
import {ArcRotateCameraPointersInput, IPointerEvent} from "@babylonjs/core";
import {Player} from "~/babylon/player/Player";

export class PlayerInput implements IPlayerInput {
    rmbPressed: boolean;
    rmbReleased: boolean;
    private readonly _mouseInputs: ArcRotateCameraPointersInput;

    constructor() {
        const mouseInputs = new ArcRotateCameraPointersInput();

        let pointer: IPointerEvent = null;
        const macBookPointer = 2;

        mouseInputs.onButtonDown = evt => {
            pointer = evt;
            if (pointer.button === macBookPointer) {
                this.rmbPressed = true;
                this.rmbReleased = false;
                Player.mesh.setParent(Player.rotator);
            }
        }

        mouseInputs.onButtonUp = () => {
            if (pointer.button === macBookPointer) {
                this.rmbPressed = false;
                this.rmbReleased = true;
                Player.mesh.setParent(null);
            }
        }

        this._mouseInputs = mouseInputs;
    }

    get mouseInputs() {
        return this._mouseInputs;
    }
}
