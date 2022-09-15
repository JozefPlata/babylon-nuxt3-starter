import {IPlayerInput} from "~/babylon/player/IPlayerInput";
import {ArcRotateCameraPointersInput, IPointerEvent} from "@babylonjs/core";

export class PlayerInput implements IPlayerInput {
    rmbPressed: boolean;
    rmbReleased: boolean;
    private readonly _mouseInputs: ArcRotateCameraPointersInput;

    constructor() {
        const mouseInputs = new ArcRotateCameraPointersInput();

        let pointer: IPointerEvent = null;

        mouseInputs.onButtonDown = evt => {
            pointer = evt;
            if (pointer.button === 2) {
                this.rmbPressed = true;
                this.rmbReleased = false;
                console.log('RMB Pressed');
            }
        }

        mouseInputs.onButtonUp = () => {
            if (pointer.button === 2) {
                this.rmbPressed = false;
                this.rmbReleased = true;
                console.log('RMB Released');
            }
        }

        this._mouseInputs = mouseInputs;
    }

    get mouseInputs() {
        return this._mouseInputs;
    }
}
