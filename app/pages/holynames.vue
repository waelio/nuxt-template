<script lang="ts" setup>
import { onMounted, ref } from '#imports';

import { useFetch } from 'nuxt/app';
const holynames = ref()
const status = ref()

onMounted(async () => {
    const { data, status, error, refresh, clear } = await useFetch('/api/holynames')

    holynames.value = data.data
})
</script>
<template>
    <QPage padding class="fit rtl">
        <q-btn v-for="single in holynames?.data" :key="single.name" :label="single.name" color="primary">
            <q-tooltip>
                {{ single.text }}
            </q-tooltip>
        </q-btn>
    </QPage>
</template>

<style></style>