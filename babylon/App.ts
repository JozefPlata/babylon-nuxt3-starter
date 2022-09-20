import {
    Color3,
    Engine,
    HemisphericLight,
    Texture,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3
} from "@babylonjs/core";
import {GameManager} from "~/babylon/GameManager";

export class App {
    private static _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private _gameManager: GameManager;

    constructor() {
        this._init();

        this._createScene();

        GameManager.Instance.createPlayers(1);
        const player = GameManager.Instance.getPlayer(0);
        const playerInput = GameManager.Instance.getPlayerInput(0);

        const scene = GameManager.Instance.scene;

        scene.registerBeforeRender(() => {
            let direction: Vector3 = Vector3.Zero();

            if (playerInput.keyForward) direction = player.mesh.forward;
            if (playerInput.keyBackward) direction = player.mesh.forward.scale(-1);
            if (playerInput.keyLeft) direction = player.mesh.right.scale(-1);
            if (playerInput.keyRight) direction = player.mesh.right;

            player.position.x += 0.05 * direction.x;
            player.position.z += 0.05 * direction.z;
        })

        GameManager.Instance.scene.onReadyObservable.addOnce(() => {})

        this._runRenderLoop();
    }

    public static get canvas(): HTMLCanvasElement {
        return App._canvas;
    }

    private _init(): void {
        App._canvas = <HTMLCanvasElement> document.getElementById('babylonCanvas');
        this._engine = new Engine(App.canvas, true);
        this._gameManager = GameManager.Instance;
        this._gameManager.scene = new Scene(this._engine);
    }

    private _createScene(): void {
        const light: HemisphericLight = new HemisphericLight('light', new Vector3(1, 1, 0.75), this._scene);
        light.intensity = 0.7;
        const ground: Mesh = MeshBuilder.CreateGround('ground', { width:100, height:100 }, this._scene);
        const groundMaterial: StandardMaterial = new StandardMaterial('groundMaterial');
        const groundTexture: Texture = new Texture('/checker.jpg');
        groundTexture.uScale = 10;
        groundTexture.vScale = 10;
        groundMaterial.diffuseTexture = groundTexture;
        groundMaterial.diffuseColor = new Color3(0.5, 1, 0.5);
        ground.material = groundMaterial;
    }

    private _runRenderLoop(): void {
        this._engine.runRenderLoop(() => {
            GameManager.Instance.scene.render();
            GameManager.Instance.getPlayer(0).rotationConstraint.active();
        })
    }
}
