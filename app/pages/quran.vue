<script lang="ts" async setup>
import { useNuxtApp } from 'nuxt/app';
import { computed, ref, unref } from 'vue';
const lok = ref(0)

type ONET = {
    Index: number | string,
    Location: string,
    TotalVerses: number,
    Verses: string[],
}
const nuxtApp = useNuxtApp()
const Quran: ONET[] = nuxtApp.payload.data['B6H5jvHlMH'].data
const sura = computed(() => Quran[lok.value])
const Verses = sura.value.Verses
</script>
<template>
    <QPage padding class="fit rtl">
        <div class=" column space-around items-center">
            <q-btn v-model="lok" :min="1" :max="114" label="Next" @click="lok = lok++" />
            <q-btn v-model="lok" :min="1" :max="114" label="Previose" @click="lok = lok--" />
            <pre>{{ sura[lok] }}</pre>

            <q-card>
                <q-card-section>
                    <h1>{{ sura.Name }}</h1>
                </q-card-section>
            </q-card>
            <q-card class="q-mt-md">
                <p class=" block justify"> {{ Verses }}</p>
            </q-card>
        </div>
    </QPage>
</template>