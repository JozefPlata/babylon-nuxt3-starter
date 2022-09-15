import {ArcRotateCamera, Camera, Scene, Vector3} from "@babylonjs/core";
import {PlayerInput} from "~/babylon/player/PlayerInput";

export function createCamera(name: string, canvas: HTMLCanvasElement, alpha: number, beta: number, radius: number, target: Vector3, scene: Scene): Camera {
    const camera: ArcRotateCamera = new ArcRotateCamera(name, alpha, beta, radius, target, scene);

    camera.inputs.removeByType('ArcRotateCameraPointersInput');
    const playerInput = new PlayerInput();
    camera.inputs.add(playerInput.mouseInputs);

    camera.attachControl(canvas, true);

    return camera;
}

