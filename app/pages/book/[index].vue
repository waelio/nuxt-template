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


const nuxtApp = useNuxtApp()
const Quran: ONET[] = nuxtApp.payload.data['B6H5jvHlMH'].data
const sura = computed(() => Quran[lok.value - 1])
const Verses = computed(() => sura.value.Verses)
const cleanText = computed(() => JSON.stringify(Verses.value).replaceAll(',', '🎗'))
</script>
<template>
    <QPage padding class=" rtl">
        <div class="q-mt-xl q-gutter-md">
            <menu>
                <q-pagination v-model="lok" max="114" min="1" direction-links outline color="orange"
                    active-design="flat" active-color="brown" active-text-color="white" />
            </menu>

            <q-card>
                <q-card-section class="flex">
                    <div>

                        <h1 class="text-h3">{{ sura.Name }}</h1>
                    </div>
                    <div>
                        <h4>{{ sura.TotalVerses }}</h4>
                        <h5>{{ sura.Location }}</h5>
                    </div>

                </q-card-section>
            </q-card>
            <q-card class="q-mt-xs">
                <q-card-section>
                    <p class="block just fit verse"> {{ cleanText }}</p>
                </q-card-section>
            </q-card>
        </div>
    </QPage>
</template>
<style lang="scss">
.just {
    text-align: justify;
    letter-spacing: 1px;
    font-size: larger;
}


.rtl {
    direction: rtl;
}

.ltr {
    direction: ltr;
}

.flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
}

.verse::after {
    content: '🎗';
}
</style>