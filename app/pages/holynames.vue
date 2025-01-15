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
        <Glory v-for="one in holynames" :name="one
            .name" :text="one.text" :key="one.text">{{ one.name }}</Glory>
    </QPage>
</template>

<style></style>