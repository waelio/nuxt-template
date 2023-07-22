<script lang="ts" setup>
import { ref } from "vue";
import { usePermissions } from "../../composables/usePermissions";
import { useCasl } from "../../composables/useCasl";
import { useTokens } from "../../composables/useTokens";
import { CaslSubjectE, CaslActionE, TokenT, UserI } from "../../types";
import { _sniffId } from "waelio-utils";

const permissions = ref({});
const data: Ref<TokenT[]> = ref([]);
const { can, cannot } = useCasl();
const { getPermissionById } = usePermissions();

const loadPermissions = async () => {
  const p = usePermissions().Permissions;
  const npId = _sniffId(p.value);
  if (!npId) return;
  const data = await getPermissionById(npId);
  permissions.value = data.permission;
};
const loadRefreshTokens = async () => {
  // @ts-ignore
  const { tokens } = (await useTokens().getAllTokens()) as Promise<TokenT[]>;

  data.value = await tokens;
};
</script>
<template>
  <NuxtLayout name="admin">
    <q-page padding class="fit">
      <h3 class="text-center rainbow underline">Back Office</h3>
      <div
        class="admin-home no-scroll"
        v-if="can(CaslActionE.MANAGE, CaslSubjectE.ADMIN)"
      >
        <q-btn
          class="q-my-sm"
          color="warning"
          text-color="white"
          label="Load Permissions"
          @click="loadPermissions"
        />
        <p class="text-left text-h5">Current Permissions</p>
        <pre>{{ permissions }}</pre>
        <q-btn
          class="q-my-sm"
          color="warning"
          text-color="white"
          label="Load Tokens"
          @click="loadRefreshTokens"
        />
        <!-- <pre>{{ data }}</pre> -->
        <fieldset v-for="tkn in data" :key="tkn.id">
          <legend>{{ tkn.id }}</legend>
          <p>user: {{ tkn.userId }}</p>
          <q-btn
            color="negative"
            text-color="white"
            :disabled="cannot(CaslActionE.MANAGE, CaslSubjectE.REFRESH_TOKEN)"
            label="delete Token"
          />
        </fieldset>
      </div>
      <div v-else>
        <p class="text-center text-h3 text-red q-my-md">Not Authorized</p>
      </div>
    </q-page>
  </NuxtLayout>
</template>
