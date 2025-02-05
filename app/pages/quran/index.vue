<script lang="ts" setup>

</script>
<template>
    <div>
        <q-menu>
            <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                    <q-item-section>New tab</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                    <q-item-section>New incognito tab</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
        <slot />
    </div>
</template>