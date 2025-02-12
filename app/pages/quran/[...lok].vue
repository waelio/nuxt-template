<script lang="ts" async setup>
import { useHead, useNuxtApp, useRoute } from 'nuxt/app';
import { computed, ref, watchEffect, watch } from 'vue';
import type { Ref } from 'vue'
import { useRouter } from 'vue-router';
import { AlFateha, appDescription, appName } from '../../constants/global';
import type revQuranT from '../../../server/api/quran'
import { QDBI } from '~~/shared/types';
const nuxtApp = useNuxtApp()
const { $quran } = nuxtApp
export type ONET = {
    Index: number | string,
    Name: string,
    Location: string,
    TotalVerses: number,
    Verses: {

    }
}

useHead({
    title: appName,
    appDescription: appDescription,
    ogTitle: appName,
    ogDescription: appDescription,
});
const route = useRoute()
const lok = ref(route.params?.lok)
const router = useRouter()

watchEffect(() => {
    lok.value = +route.params?.lok as number && 1
})

watch(lok, (newv) => {
    router.push(`/quran/${newv}`)

})

const Quran: QDBI = nuxtApp.payload.data.B6H5jvHlMH
const sura: Ref<QDBI> = computed(() => Quran[(lok.value - 1)])
const Verses = computed(() => sura.value.ayat)
// const Infor = computed(() => sura.value)

// const cleanText = computed(() => Verses.value.replaceAll(',', ' ♦ '))
</script>
<template>
    <QPage padding class=" rtl">
        <div class="q-mt-md q-gutter-md">
            <q-card class="text-sm">
                <div class="q-pa-lg flex flex-center">
                    <q-pagination h-10 v-model="lok" direction-links unelevated color="black" active-color="green"
                        :max="114" />
                </div>
                <q-card-section class="rtl">
                    <h4 class="text-h3">Name:{{ sura.name }}</h4>
                    <h5 class="text-h5">Nuber:{{ sura.id }}</h5>
                    <div>
                        <h4 class="capitalize text-h6">Number of Verses:{{ sura.total_verses }}</h4>
                        <h4 class="capitalize text-h6">Locatiom:{{ sura.type }}</h4>
                    </div>

                </q-card-section>
            </q-card>
            <q-card class="q-mt-xs">
                <q-card-section>
                    <h3>{{ AlFateha }}</h3>
                </q-card-section>
                <q-card-section>
                    <span class="capitalize block just fit verse">
                        <i class="q-mx-sm" v-for="aya in sura.ayat" :key="aya.verse">{{ aya.text }}
                            <q-chip>{{ aya.verse }}</q-chip>
                        </i>
                    </span>
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

.capitalize::first-letter {
    text-transform: uppercase;
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

// .verse::after {
//     content: '♦';
// }

.verse {
    font-size: 2rem;
}
</style>