<script lang="ts" async setup>
import { useNuxtApp } from 'nuxt/app';
import useQuran from '../plugins/Quran';
import { useQ2P } from '../store/q2p.pinia';

type ONET = {
    chapter: number,
    verse: number,
    text: string
}
const nuxtApp = useNuxtApp()

const Quran = nuxtApp.payload.data['B6H5jvHlMH'].data

</script>
<template>
    <QPage padding class="fit rtl">
        <div class="flex column space-around fit items-center">
            <q-list padding bordered class="fit rounded-borders" v-for="one in Quran" :label="one.Name"
                :key="one.Index">
                <q-expansion-item dense dense-toggle expand-separator :label="one.Name">
                    <q-card v-for="V in one.Verses" :key="V.Index">
                        <p>{{ V.text }}</p>

                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>
    </QPage>
</template>