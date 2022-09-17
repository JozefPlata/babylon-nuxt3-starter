import {
    Color3,
    Engine,
    HemisphericLight,
    Texture,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3, Camera
} from "@babylonjs/core";
import {Player} from "~/babylon/player/Player";
import {Constraint} from "~/babylon/player/Constraint";

export class App {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private _camera: Camera;
    private readonly _player: Player;
    private _rotationConstraint: Constraint;

    private _keyW: boolean;

    constructor() {
        this._init();

        const mesh = this._createScene();

        this._player = new Player('player', mesh, this._canvas, this._scene);

        this._camera = this._player.camera;

        this._keyboardInput();

        this._scene.registerBeforeRender(() => {
            if (this._keyW) {
                const direction: Vector3 = this._camera.getForwardRay(1).direction;
                this._player.position.x += 0.05 * direction.x;
                this._player.position.z += 0.05 * direction.z;
            }
        })

        this._rotationConstraint = new Constraint(Player.rotator, this._player.camera);

        this._scene.onReadyObservable.addOnce(() => {
            console.log(this._scene.cameras);
        })

        this._runRenderLoop();
    }

    private _init(): void {
        this._canvas = <HTMLCanvasElement> document.getElementById('babylonCanvas');
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);
    }

    private _createScene(): Mesh {
        const light: HemisphericLight = new HemisphericLight('light', new Vector3(1, 1, 0.75), this._scene);
        light.intensity = 0.7;
        const box: Mesh = MeshBuilder.CreateBox('box', { size: 2 }, this._scene);
        box.position.set(0, 1, 0);
        const ground: Mesh = MeshBuilder.CreateGround('ground', { width:100, height:100 }, this._scene);
        const groundMaterial: StandardMaterial = new StandardMaterial('groundMaterial');
        const groundTexture: Texture = new Texture('/checker.jpg');
        groundTexture.uScale = 10;
        groundTexture.vScale = 10;
        groundMaterial.diffuseTexture = groundTexture;
        groundMaterial.diffuseColor = new Color3(0.5, 1, 0.5);
        ground.material = groundMaterial;

        return box;
    }

    private _keyboardInput(): void {
        document.addEventListener('keydown', ev => {
            if (ev.key == 'w' || ev.key == 'W') this._keyW = true;
        })

        document.addEventListener('keyup', ev => {
            if (ev.key == 'w' || ev.key == 'W') this._keyW = false;
        })
    }

    private _runRenderLoop(): void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
            this._rotationConstraint.rotationType();
        })
    }
}
