import {IPlayerInput} from "~/babylon/player/IPlayerInput";
import {
    ActionManager,
    ArcRotateCameraPointersInput,
    IPointerEvent,
    Vector3
} from "@babylonjs/core";
import {Player} from "~/babylon/player/Player";
import {GameManager} from "~/babylon/game/GameManager";
import {KeyboardInput} from "~/babylon/player/KeyboardInput";

export class PlayerInput implements IPlayerInput {
    public rmbPressed: boolean;
    public rmbReleased: boolean;
    public keyForward: boolean;
    public keyBackward: boolean;
    public keyLeft: boolean;
    public keyRight: boolean;

    private readonly _mouseInputs: ArcRotateCameraPointersInput;
    private readonly _keyboardInput: KeyboardInput;

    constructor(player: Player) {
        this._keyboardInput = this._setupKeyboardInput(player);
        this._mouseInputs = this._setupMouseInputs(player);
    }

    get mouseInputs() {
        return this._mouseInputs;
    }

    private _setupMouseInputs(player: Player): ArcRotateCameraPointersInput {
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

        return mouseInputs;
    }

    private _setupKeyboardInput(player: Player): KeyboardInput {
        const scene = GameManager.Instance.scene;
        scene.actionManager = new ActionManager(GameManager.Instance.scene);
        return new KeyboardInput(scene.actionManager, this);
    }
}
