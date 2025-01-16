<script lang="ts" setup>
import { useNuxtApp } from 'nuxt/app';
import { computed, ref } from 'vue';
type ONET = {
    Index: number | string,
    Name: string,
    Location: string,
    TotalVerses: number,
    Verses: string[],
}
const lok = ref(1)

const nuxtApp = useNuxtApp()
const Quran: ONET[] = nuxtApp.payload.data['B6H5jvHlMH'].data
const sura = computed(() => Quran[lok.value - 1])
const total = ref(Quran).value.map(v => ({ verses: v.TotalVerses }))

const Verses = computed(() => sura.value.Verses)
</script>
<template>
    <QPage padding>
        <h1>stats: {{ sura.TotalVerses }}</h1>
        <ol>
            <li v-for="i in total" :key="i.verses">{{ i.verses }}</li>
        </ol>
    </QPage>
</template>
<style></style>