<template>
  <div>
    <VitePwaManifest />
    <RouterView />
  </div>
</template>
<script setup>
import runSetup from "./utils/setup";

if (process.client) {
  runSetup();
}
</script>
