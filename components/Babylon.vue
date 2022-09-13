<template>
  <div class="babylonContainer">
    <canvas class="babylon" id="babylonCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import {ArcRotateCamera, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3} from "@babylonjs/core";
class App {
  constructor() {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('babylonCanvas');
      const engine = new Engine(canvas, true);
      const scene = new Scene(engine);
      const camera: ArcRotateCamera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
      camera.attachControl(canvas, true);
      const light: HemisphericLight = new HemisphericLight('light', new Vector3(1, 1, 0.75), scene);
      light.intensity = 0.7;
      const box: Mesh = MeshBuilder.CreateBox('box', { size: 1 }, scene);
      engine.runRenderLoop(() => {
        scene.render();
      })
      }
      }
      onMounted(() => {
        new App();
      })
</script>

<style scoped>
.babylon {
  height: 100%;
  width: 100%;
}
</style>
