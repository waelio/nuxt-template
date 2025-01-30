<script lang="ts" setup>
const props = defineProps<{ name: string; text: string; }>()
</script>
<template>
    <div class="gi">
        <q-btn :label="props.name" :value="props.name" size="1.4em" show-value :thickness="0.2" color="blue-3"
            center-color="green" track-color="purple-1" class="q-ma-md">
            <q-tooltip>{{ props.text }}</q-tooltip>
        </q-btn>
    </div>
</template>
<style scoped lang="scss">
.gi {
    display: inline-block;
}
</style>