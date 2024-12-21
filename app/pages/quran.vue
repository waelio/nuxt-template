<script lang="ts" setup>
type ONET = {
    chapter: number,
    verse: number,
    text: string
}

const book: ONET[] = await useQuran()
const bookSize = book.length
</script>
<template>
    <QPage padding class="fit rtl">
        <div class="flex column space-around items-center">
            <q-list padding bordered class="fit rounded-borders" v-for="(one, X) in book" :key="one.chapter">
                <q-expansion-item dense dense-toggle expand-separator :label="X">
                    <q-card v-for="(V, X) in one" :key="x + 1">
                        <q-card-section class="text-center justify fit">
                            <p>{{ V.text }}</p>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>
    </QPage>
</template>