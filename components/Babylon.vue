<template>
  <div class="babylonContainer">
    <canvas class="babylon" id="babylonCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import {App} from "~/babylon/App";

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
