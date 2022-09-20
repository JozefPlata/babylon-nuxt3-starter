import {AbstractActionManager, ActionManager, ExecuteCodeAction} from "@babylonjs/core";
import {PlayerInput} from "~/babylon/player/PlayerInput";

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
}
