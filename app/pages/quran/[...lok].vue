<script lang="ts" async setup>
import { useHead, useNuxtApp, useRoute } from 'nuxt/app';
import { is } from 'quasar';
import { computed, Ref, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { isNumber } from 'waelio-utils';
import { AlFateha, appDescription, appName } from '../../constants/global';

export type ONET = {
    Index: number | string,
    Name: string,
    Location: string,
    TotalVerses: number,
    Verses: string[],
}

useHead({
    title: appName,
    appDescription: appDescription,
    ogTitle: appName,
    ogDescription: appDescription,
});

const route = useRoute()
const lok = ref(route.params?.lok || 1)

const sglok = (off = 1): number => {
    return (isNumber(off)) ? lok.value = +off : 1

}
watchEffect(() => {
    sglok(+route.params.lok)
})



const nuxtApp = useNuxtApp()
const Quran: ONET[] = nuxtApp.payload.data['B6H5jvHlMH'].data
const sura = computed(() => Quran[lok.value - 1] as unknown as number)
const Verses: Ref<string[]> = computed(() => sura.value.Verses)
const cleanText = computed(() => JSON.stringify(Verses.value).replaceAll(',', ' ♦ '))

</script>
<template>
    <QPage padding class=" rtl">
        <div class="q-mt-md q-gutter-md">
            <q-card class="text-sm">
                <q-card-section class="flex h-50">
                    <div>

                        <h4 class="text-h3">{{ sura.Name }}</h4>
                    </div>
                    <div>
                        <h4 class="capitalize">{{ sura.TotalVerses }}</h4>
                        <h4 class="capitalize text-h6">{{ sura.Location }}</h4>
                    </div>

                </q-card-section>
            </q-card>
            <q-card class="q-mt-xs">
                <q-card-section>
                    <p class="capitalize block just fit verse">
                    <p class="verse text-center" v-if="lok.value !== 1">{{ AlFateha }}</p> {{ cleanText }}</p>
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