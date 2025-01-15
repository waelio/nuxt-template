<script lang="ts" async setup>
import { useHead, useNuxtApp, useRoute } from 'nuxt/app';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

useHead({
    title: appName,
    appDescription: appDescription,
    ogTitle: appName,
    ogDescription: appDescription,
});
const lok = ref(1)
const route = useRoute()
const router = useRouter()
console.log(router);


watchEffect(() => {
    lok.value = +route.params.name || 1
})
type ONET = {
    Index: number | string,
    Name: string,
    Location: string,
    TotalVerses: number,
    Verses: string[],
}
function inc() {
    lok.value = lok.value + 1
}
function dec() {
    lok.value = lok.value - 1
}

const nuxtApp = useNuxtApp()
const Quran: ONET[] = nuxtApp.payload.data['B6H5jvHlMH'].data
const sura = computed(() => Quran[lok.value - 1])
const Verses = computed(() => sura.value.Verses)
</script>
<template>
    <QPage padding class=" rtl">
        <div class="q-mt-xl q-gutter-md">
            <menu>
                <q-pagination v-model="lok" max="114" min="1" direction-links outline color="orange"
                    active-design="unelevated" active-color="brown" active-text-color="orange" />
            </menu>

            <q-card>
                <q-card-section>
                    <h1 class="text-h3">{{ sura.Name }}</h1>
                </q-card-section>
            </q-card>
            <q-card class="q-mt-xs">
                <q-card-section>
                    <p class=" block justify fit"> {{ Verses }}</p>
                </q-card-section>
            </q-card>
        </div>
    </QPage>
</template>