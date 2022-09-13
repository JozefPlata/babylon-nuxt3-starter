import {ArcRotateCamera, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3} from "@babylonjs/core";

export class App {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;

    constructor() {
        this._init();

        this._createScene();

        this._runRenderLoop();
    }

    private _init(): void {
        this._canvas = <HTMLCanvasElement> document.getElementById('babylonCanvas');
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);
    }

    private _createScene(): void {
        const camera: ArcRotateCamera = new ArcRotateCamera('camera', Math.PI / 4, Math.PI / 2.2, 10, Vector3.Up(), this._scene);
        camera.attachControl(this._canvas, true);
        const light: HemisphericLight = new HemisphericLight('light', new Vector3(1, 1, 0.75), this._scene);
        light.intensity = 0.7;
        const box: Mesh = MeshBuilder.CreateBox('box', { size: 2 }, this._scene);
        box.position.set(0, 1, 0);
    }

    private _runRenderLoop(): void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        })
    }
}
