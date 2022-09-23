import {Color3, HemisphericLight, Mesh, MeshBuilder, Scene, StandardMaterial, Texture, Vector3} from "@babylonjs/core";

export class World {
    constructor(scene: Scene) {
        this._createGeometry(scene);
        this._createLighting(scene);
        this._createPostprocess(scene);
    }

    private _createGeometry(scene: Scene): void {
        const ground: Mesh = MeshBuilder.CreateGround('ground', { width:100, height:100 }, scene);
        const groundMaterial: StandardMaterial = new StandardMaterial('groundMaterial');
        const groundTexture: Texture = new Texture('/checker.jpg');
        groundTexture.uScale = 10;
        groundTexture.vScale = 10;
        groundMaterial.diffuseTexture = groundTexture;
        groundMaterial.diffuseColor = new Color3(0.5, 1, 0.5);
        ground.material = groundMaterial;
    }

    private _createLighting(scene: Scene): void {
        const light: HemisphericLight = new HemisphericLight('light', new Vector3(1, 1, 0.75), scene);
        light.intensity = 0.7;
    }

    private _createPostprocess(scene: Scene): void {

    }
}
