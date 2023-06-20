<template>
  <div class="q-ma-md"> 
    <h1 class="text-h3 text-center underlined">Auth</h1>
    User: {{ user }}
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth.pinia";
const auth = useAuthStore();
const user = auth.user
</script>
