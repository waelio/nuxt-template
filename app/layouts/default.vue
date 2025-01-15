<script lang="ts" setup>
import { useRouter } from 'nuxt/app';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { appName } from '../constants/global';


const $q = useQuasar()
const offset = ref([0, 18])

const { toggle } = $q.dark
function toggleDark() {
  toggle()
  return $q.dark.mode
}
const router = useRouter()
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg-blue-1">
    <q-header reveal class="flex">
      <q-btn fab class="q-mx-auto" @click="router.push('/')">HOME</q-btn>
      <q-btn icon="light" class="q-mx-auto" @click="toggleDark">Light</q-btn>
    </q-header>

    <q-page-container>

      <slot />
      <q-page-scroller reverse position="bottom" :scroll-offset="20" :offset="[20, -9]">
        <q-btn fab icon="keyboard_arrow_down" color="accent" />
      </q-page-scroller>
    </q-page-container>

    <q-footer reveal>
      {{ appName }}
    </q-footer>

  </q-layout>
</template>

<style scoped></style>
