<script lang="ts" setup>

interface HolyNameI {
    name: string,
    text: string
}
const holynames =

</script>
<template>
    <QPage padding class="fit flex rtl">
        <q-btn round size="xl" v-for="single in names" :key="single.name" :label="single.name" color="primary">
            <q-tooltip>
                {{ single.text }}
            </q-tooltip>
        </q-btn>
    </QPage>
</template>

<style></style>