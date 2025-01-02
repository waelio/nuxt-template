<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import useNames from '../composables/useNames';
import { useHN } from '../store/holynames.pinia';
interface HolyNameI {
    name: string,
    text: string
}
onBeforeMount(() => useNames())
const holynames = useHN()
const names: HolyNameI[] = holynames.gn

</script>
<template>
    <QPage padding class="fit rtl">
        <q-btn round size="xl" v-for="single in names" :key="single.name" :label="single.name" color="primary">
            <q-tooltip>
                {{ single.text }}
            </q-tooltip>
        </q-btn>
    </QPage>
</template>

<style></style>