<script lang="ts" setup>
type ONET = {
    chapter: number,
    verse: number,
    text: string
}

const book = await useQuran()
</script>
<template>
    <QPage>
        <div class="flex space-around items-center">
            <div v-for="(one) in book" :key="one.chapter">
                <hr>
                <ul class="text-center align-center text-lg" v-for="(V, index) in one" :key="index">
                    <section>
                        <p>{{ V.text }}</p>
                    </section>
                </ul>
            </div>
        </div>
    </QPage>
</template>