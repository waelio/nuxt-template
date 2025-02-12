<script lang="ts" setup>
import { useRouter, useNuxtApp } from "nuxt/app"
import { ref } from "vue"
type ONET = {
    Index: number | string,
    Name: string,
    Location: string,
    TotalVerses: number,
    Verses: string[],
}
let { $Quran } = useNuxtApp()
const Quran: ONET[] = $Quran as ONET[]
// const names = ref(Quran).value.map(v => ({ names: v.Name }))
const router = useRouter()

function navToLok(lok: number) {
    const advonced = lok + 1 || 1
    router.push(`/quran/${advonced}`)
}
</script>
<template>
    <ol class="column q-mt-xl q-pt-lg">
        <!-- <nuxt-link class="cursor-pointer" v-for="(i, ind) in names" :key="i.names"
            @click="navToLok(ind)">{{ ind + 1 }}-{{ i.names }}
        </nuxt-link> -->
    </ol>
</template>