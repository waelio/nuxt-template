<script lang="ts" setup>
const $q = useQuasar()
const { toggle } = $q.dark
function toggleDark() {   
  toggle()
  return $q.dark.mode
}
const router = useRouter()
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
      <q-header class="flex">
        <q-btn fab class="q-mx-auto" @click="router.push('/')">HOME</q-btn>
        <q-btn icon="light" class="q-mx-auto" @click="toggleDark">Light</q-btn>
      </q-header>
    <q-page-container>
        <slot />
    </q-page-container>
 </q-layout>
</template>

<style scoped>

</style>

