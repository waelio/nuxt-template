<template>
  <div>
    <h1 class="text-h3 text-center underlined">Auth</h1>
    <AuthLogin></AuthLogin>
    <AuthRegister></AuthRegister>
  </div>
</template>
<script lang="ts" setup>
import { userStore } from '~/store/root.pinia'

const root = userStore()
console.log(root.Projects)

</script>
