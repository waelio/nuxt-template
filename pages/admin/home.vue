<script lang="ts" setup>
import { usePermissions } from "../../composables/usePermissions";
import { ref } from "vue";
import { useCasl } from "../../composables/useCasl";
import { eCaslSubject, eCaslAction } from "../../types";
const permissions = ref([]);
const { getPermissionById } = usePermissions();
const { can } = useCasl();
async function main() {
  permissions.value = [await getPermissionById("63070aa6f171adfa16083507")];
}
</script>
<template>
  <NuxtLayout name="admin">
    <q-page padding>
      <div class="admin-home" v-if="can(eCaslAction.MANAGE, eCaslSubject.ADMIN)">
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
      </div>
      <div v-else>
        <p class="text-center text-h3 text-red q-my-md">Not Authorized</p>
      </div>
    </q-page>
  </NuxtLayout>
</template>
