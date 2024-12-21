<script lang="ts" setup>
const book = await useQuran()
</script>
<template>
    <QPage>
        {{ book }}
    </QPage>
</template>