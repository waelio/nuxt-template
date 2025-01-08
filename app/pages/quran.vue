<script lang="ts" async setup>
import useQuran from '../composables/useQuran';
import { useQ2P } from '../store/q2p.pinia';

type ONET = {
    chapter: number,
    verse: number,
    text: string
}
const quran = useQuran()
const q2p = useQ2P
const gbook = q2p.GetQ

</script>
<template>
    <QPage padding class="fit rtl">
        <!-- <pre>{{ bBook[0] }}</pre> -->
        <div class="flex column space-around fit items-center">
            <q-list padding bordered class="fit rounded-borders" v-for="one in gbook" :label="one.Name"
                :key="one.Index">
                <q-expansion-item dense dense-toggle expand-separator :label="one.Name">
                    <q-card v-for="V in one" :key="V.Index">
                        <p>{{ V.Name }}</p>
                        <q-card-section class="text-center justify fit" v-for="wrd in V.versus">
                            <p>{{ wrd }}</p>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>
    </QPage>
</template>