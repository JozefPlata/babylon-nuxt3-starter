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

        if (playerInput.keyForward) direction = player.mesh.forward;
        if (playerInput.keyBackward) direction = player.mesh.forward.scale(-1);
        if (playerInput.keyLeft) direction = player.mesh.right.scale(-1);
        if (playerInput.keyRight) direction = player.mesh.right;

        player.position.x += 0.05 * direction.x;
        player.position.z += 0.05 * direction.z;
    }
}
