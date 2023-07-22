<template>
  <NuxtLayout name="default">
    <q-page padding class="q-gutter-md autoClass">
      <h1 class="text-h2 text-center">
        <strong>{{ t("navigation.SettingsPageTitle") }}</strong>
      </h1>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          :icon="!$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          :label="t('general.lightMode')"
        >
          <q-card class="nf" :dark="$q.dark.isActive">
            <q-card-section>
              <q-toggle v-model="isDark" clickable :label="$t('general.lightMode')" />
            </q-card-section>
            <q-card-section> </q-card-section>
          </q-card>
          <q-btn color="warning" text-color="white" label="Reload" @click="onReload" />
        </q-expansion-item>
      </q-list>
    </q-page>
  </NuxtLayout>
</template>
<script lang="ts" setup>
const { t } = useI18n();
const $q = useQuasar();
import { isDark, autoStyle, autoClass } from "../mixins";
const checkForUpdates = () => {
  Notify.create({
    message: t("general.fetchingUpdates"),
    color: "warning",
    icon: "cloud_download",
    closeBtn: "Update",
    timeout: 10000,
    onDismiss() {
      location.reload();
    },
  });
};
const onReload = () => { 
  location.reload();
}
</script>
