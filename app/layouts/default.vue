<script lang="ts" setup>
type ONET = {
  Index: number | string,
  Name: string,
  Location: string,
  TotalVerses: number,
  Verses: string[],
}
import { useNuxtApp, useRouter } from 'nuxt/app';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { appName } from '../constants/global';

const nuxtApp = useNuxtApp()
const Quran: ONET[] = nuxtApp.payload.data['B6H5jvHlMH'].data
const names = ref(Quran).value.map(v => ({ names: v.Name }))
const router = useRouter()
const $q = useQuasar()
const offset = ref([0, 18])

const drawerLeft = ref(true)

const { toggle } = $q.dark
function toggleDark() {
  toggle()
  return $q.dark.mode
}
function navToLok(lok: number) {
  const advonced = lok + 1 || 1
  router.push(`/quran/${advonced}`)
}
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <nuxt-link :title="appName" to="/">{{ appName }}</nuxt-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer persistent min-width="200" v-model="drawerLeft" elevated side="left" bordered>
      <ol class="column q-mt-xl q-pt-lg">
        <nuxt-link class="cursor-pointer" v-for="(i, ind) in names" :key="i.names"
          @click="navToLok(ind)">{{ ind + 1 }}-{{ i.names }}
        </nuxt-link>
      </ol>
    </q-drawer>

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
