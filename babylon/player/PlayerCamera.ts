import {ArcRotateCamera, Camera, Scene, Vector3} from "@babylonjs/core";
import {PlayerInput} from "~/babylon/player/PlayerInput";

export class PlayerCamera extends ArcRotateCamera{
    constructor(name: string, canvas: HTMLCanvasElement, alpha: number, beta: number, radius: number, target: Vector3, scene: Scene) {
        super(name, alpha, beta, radius, target, scene)
        this._initializeInputs();
        this.attachControl(canvas, true);
    }

    private _initializeInputs(): void {
        this.inputs.removeByType('ArcRotateCameraPointersInput');
        const playerInput = new PlayerInput();
        this.inputs.add(playerInput.mouseInputs);
    }
}

