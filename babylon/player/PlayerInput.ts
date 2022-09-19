import {IPlayerInput} from "~/babylon/player/IPlayerInput";
import {ArcRotateCameraPointersInput, IPointerEvent, Vector3} from "@babylonjs/core";
import {Player} from "~/babylon/player/Player";

export class PlayerInput implements IPlayerInput {
    public rmbPressed: boolean;
    public rmbReleased: boolean;
    public keyForward: boolean;
    public keyBackward: boolean;
    public keyLeft: boolean;
    public keyRight: boolean;

    private readonly _mouseInputs: ArcRotateCameraPointersInput;

    constructor(player: Player) {
        const mouseInputs = new ArcRotateCameraPointersInput();

        let pointer: IPointerEvent = null;

        mouseInputs.onButtonDown = evt => {
            pointer = evt;
            if (pointer.button === 2) {
                this.rmbPressed = true;
                this.rmbReleased = false;
                player.mesh.setParent(player.rotator);
                player.mesh.rotation = Vector3.Zero();
            }
        }

        mouseInputs.onButtonUp = () => {
            if (pointer.button === 2) {
                this.rmbPressed = false;
                this.rmbReleased = true;
                player.mesh.setParent(player);
            }
        }

        this._mouseInputs = mouseInputs;
    }

    get mouseInputs() {
        return this._mouseInputs;
    }
}
