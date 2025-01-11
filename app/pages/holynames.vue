<script lang="ts" setup>
import { useNuxtApp } from 'nuxt/app';

const nuxtApp = useNuxtApp()
interface HolyNameI {
    name: string,
    text: string
}
const holynames: HolyNameI[] = nuxtApp.payload.data['6Dst81xkaL'].data

</script>
<template>
    <QPage padding class="fit flex rtl">
        <q-btn round size="xl" v-for="single in holynames" :key="single.name" :label="single.name" color="primary">
            <q-tooltip>
                {{ single.text }}
            </q-tooltip>
        </q-btn>
    </QPage>
</template>

<style></style>