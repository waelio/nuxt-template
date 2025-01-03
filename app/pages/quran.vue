<script lang="ts" setup>
type ONET = {
    chapter: number,
    verse: number,
    text: string
}

import { useQuran } from "../composables/useQuran";
import { useQ2B } from "../store/q2p.pinia";

const q2p = useQ2B()
const bBook: Promise<Ref<ONET[]>> = q2p.GetQ


const bookSize = bBook.length


</script>
<template>
    <QPage padding class="fit rtl">
      <pre>{{ bBook[0] }}</pre>
        <div class="flex column space-around fit items-center" v-if="bookSize">
            <q-list padding bordered class="fit rounded-borders" v-for="one in bBook" :label="one.Name" :key="one.Index">
                <q-expansion-item dense dense-toggle expand-separator :label="one.Name">
                    <q-card v-for="V in one" :key="V.Index">
												<pre>{{ V }}</pre>
                        <!-- <q-card-section class="text-center justify fit" v-for="wrd in V.versus">
                            <p>{{ wrd }}</p>
                        </q-card-section> -->
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>
    </QPage>
</template>