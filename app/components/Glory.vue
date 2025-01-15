<script lang="ts" setup>
const props = defineProps<{ name: string; text: string; }>()
</script>
<template>
    <div>
        <q-btn :label="props.name" :value="props.name" size="90px" show-value :thickness="0.2" color="blue-3"
            center-color="green" track-color="purple-1" class="q-ma-md" />
        <q-tooltip>{{ props.text }}</q-tooltip>å
    </div>
</template>