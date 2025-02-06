<script lang="ts" async setup>
import { useHead, useNuxtApp, useRoute } from 'nuxt/app';
import { computed, ref, watchEffect, watch } from 'vue';
import type { Ref } from 'vue'
import { useRouter } from 'vue-router';
import { AlFateha, appDescription, appName } from '../../constants/global';

const { $Quran } = useNuxtApp()
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
const lok = ref(route.params?.lok || 1)
const router = useRouter()

watchEffect(() => {
    lok.value = +route.params.lok || 1
})

watch(lok, (newv) => {
    router.push(`/quran/${newv}`)

})

const Quran: ONET[] = $Quran as ONET[];
const sura: Ref<ONET> = computed(() => Quran[(lok.value - 1)])
const Verses = computed(() => sura.value.Verses)
const Infor = computed(() => sura.value)

const cleanText = computed(() => JSON.stringify(Verses.value).replaceAll(',', ' ♦ '))
</script>
<template>
    <QPage padding class=" rtl">
        <div class="q-mt-md q-gutter-md">
            <q-card class="text-sm">
                <div class="q-pa-lg flex flex-center">
                    <q-pagination h-10 v-model="lok" direction-links unelevated color="black" active-color="purple"
                        :max="114" />
                </div>
                <q-card-section>
                    <h4 class="text-h3">{{ sura.Name }}</h4>
                    <div>
                        <h4 class="capitalize">{{ sura.TotalVerses }}</h4>
                        <h4 class="capitalize text-h6">{{ sura.Location }}</h4>
                    </div>

                </q-card-section>
            </q-card>
            <q-card class="q-mt-xs">
                <q-card-section>
                    <h3>{{ AlFateha }}</h3>
                </q-card-section>
                <q-card-section>
                    <p class="capitalize block just fit verse"> {{ cleanText }}</p>
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