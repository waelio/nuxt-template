<template>
  <div class="single-package">
    <h2 class="text-center">{{ name }}</h2>
    <div class="section link-template">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    default: "ww",
    required: false,
  },
});
</script>
<style scoped>
p {
  margin: unset !important;
}
</style>
<style lang="scss">
.single-package .h2 {
  margin-top: 0 !important;
}
.link-template {
  display: flex;
  flex-direction: row;
  align-content: flex-end;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 350px;
  margin: 2rem auto;
  h2 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
    height: 1rem;
  }
  p {
    height: 1.5rem;
  }
}
</style>
