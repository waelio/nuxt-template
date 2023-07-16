<script lang="ts" setup>
import { usePermissions } from "../../composables/usePermissions";
import { ref } from "vue";
const permissions = ref([]);
const { getPermissionById } = usePermissions();

async function main() {
  permissions.value = [await getPermissionById("63070aa6f171adfa16083507")];
}
</script>
<template>
  <NuxtLayout name="admin">
    <q-page padding>
      <h3 class="text-center">Back Office</h3>
      <q-btn
        class="q-my-sm"
        color="warning"
        text-color="white"
        label="Load Permissions"
        @click="main"
      />
      <p class="text-left text-h5">Current Permissions</p>
      <p>{{ permissions }}</p>
    </q-page>
  </NuxtLayout>
</template>
