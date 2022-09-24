import {AbstractActionManager, ActionManager, ExecuteCodeAction, Vector3} from "@babylonjs/core";
import {PlayerInput} from "~/babylon/player/PlayerInput";
import {Player} from "~/babylon/player/Player";

export class KeyboardInput {
    constructor(actionManager: AbstractActionManager, playerInput: PlayerInput) {
        actionManager.registerAction(new ExecuteCodeAction(
            {
                trigger: ActionManager.OnKeyDownTrigger,
                parameter: 'w'
            }, () => {
                playerInput.keyForward = true;
            }));
        actionManager.registerAction(new ExecuteCodeAction(
            {
                trigger: ActionManager.OnKeyUpTrigger,
                parameter: 'w'
            }, () => {
                playerInput.keyForward = false;
            }));

        actionManager.registerAction(new ExecuteCodeAction(
            {
                trigger: ActionManager.OnKeyDownTrigger,
                parameter: 's'
            }, () => {
                playerInput.keyBackward = true;
            }));
        actionManager.registerAction(new ExecuteCodeAction(
            {
                trigger: ActionManager.OnKeyUpTrigger,
                parameter: 's'
            }, () => {
                playerInput.keyBackward = false;
            }));

        actionManager.registerAction(new ExecuteCodeAction(
            {
                trigger: ActionManager.OnKeyDownTrigger,
                parameter: 'a'
            }, () => {
                playerInput.keyLeft = true;
            }));
        actionManager.registerAction(new ExecuteCodeAction(
            {
                trigger: ActionManager.OnKeyUpTrigger,
                parameter: 'a'
            }, () => {
                playerInput.keyLeft = false;
            }));

        actionManager.registerAction(new ExecuteCodeAction(
            {
                trigger: ActionManager.OnKeyDownTrigger,
                parameter: 'd'
            }, () => {
                playerInput.keyRight = true;
            }));
        actionManager.registerAction(new ExecuteCodeAction(
            {
                trigger: ActionManager.OnKeyUpTrigger,
                parameter: 'd'
            }, () => {
                playerInput.keyRight = false;
            }));
    }

    public static playerMovement(player: Player, playerInput: PlayerInput) {
        let direction: Vector3 = Vector3.Zero();

        if (playerInput.keyForward) {
            direction = player.model.forward;
            if (playerInput.keyRight) {
                const d: Vector3 = direction;
                const r: Vector3 = player.model.right;
                direction = new Vector3(d.x + r.x, d.y + r.y, d.z + r.z);
                direction = direction.normalize();
            } else if (playerInput.keyLeft) {
                const d: Vector3 = direction;
                const l: Vector3 = player.model.right.scale(-1);
                direction = new Vector3(d.x + l.x, d.y + l.y, d.z + l.z);
                direction = direction.normalize();
            }
        } else {
            if (playerInput.keyBackward) direction = player.model.forward.scale(-1);
            if (playerInput.keyLeft) direction = player.model.right.scale(-1);
            if (playerInput.keyRight) direction = player.model.right;
        }

        player.position.x += 0.05 * direction.x;
        player.position.z += 0.05 * direction.z;
    }
}
