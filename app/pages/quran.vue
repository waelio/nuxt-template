<script lang="ts" setup>
type ONET = {
    chapter: number,
    verse: number,
    text: string
}

const book: ONET[] = await useQuran()
</script>
<template>
    <QPage>
        <div class="flex column space-around items-center">
            <q-list padding bordered class="rounded-borders" v-for="(one, number) in book" :key="one.chapter">
                <q-expansion-item dense dense-toggle expand-separator icon="perm_identity" :label="number">
                    <q-card v-for="(V, index) in one" :key="index">
                        <q-card-section class="justify fit">
                            {{ V.text }}
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-list>
        </div>
    </QPage>
</template>