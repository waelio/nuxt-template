<script lang="ts" setup>
type ONET = {
    chapter: number,
    verse: number,
    text: string
}

import { useQuran } from "../composables/useQuran";
import { useQ2B } from "../store/q2p.pinia";
import type { Ref } from "#imports";
const q2p = useQ2B()
const book: Promise<Ref<ONET[]>> = await useQuran()
const bookSize = book.length
if (!!bookSize) {
    q2p.setQuran(book)
}
const bBook = q2p.GetQ
</script>
<template>
    <QPage padding class="fit rtl">
 <pre>{{ bBook[0] }}</pre>
        <div class="flex column space-around items-center">
            <q-list padding bordered class="fit rounded-borders" v-for="(one, X) in bBook" :label="one.Name" :key="one.Index">
                <q-expansion-item dense dense-toggle expand-separator :label="X">
                    <q-card v-for="V in one" :key="V.">
                        <q-card-section class="text-center justify fit">
                            <p>{{ V.text }}</p>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>
    </QPage>
</template>