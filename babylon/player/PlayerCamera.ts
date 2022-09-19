import {ArcRotateCamera, Scene, Vector3} from "@babylonjs/core";
import {PlayerInput} from "~/babylon/player/PlayerInput";
import {App} from "~/babylon/App";
import {Player} from "~/babylon/player/Player";

export class PlayerCamera extends ArcRotateCamera{
    private _inputs: PlayerInput;

    constructor(name: string, canvas: HTMLCanvasElement, alpha: number, beta: number, radius: number, target: Vector3, scene: Scene) {
        super(name, alpha, beta, radius, target, scene)
        this.attachControl(App.canvas, true);
    }

    public initializePlayerInputs(player: Player): void {
        this.inputs.removeByType('ArcRotateCameraPointersInput');
        const playerInput = new PlayerInput(player);
        this._inputs = playerInput;
        this.inputs.add(playerInput.mouseInputs);
    }

    get input(): PlayerInput {
        return this._inputs;
    }
}

