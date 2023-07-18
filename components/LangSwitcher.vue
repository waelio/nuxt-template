<template>
  <div>
    <q-form class="lang-switcher">
      <q-select
        dense
        borderless
        emit-value
        map-options
        options-dense
        v-model="aLocale"
        :options="langs"
      />
    </q-form>
  </div>
</template>
<script lang="ts" setup>
type LOCALE = { label: string; value: string };
const { locale } = useI18n();
const langs: LOCALE[] = [
  { value: "en", label: "EN" },
  { value: "ar", label: "AR" },
  { value: "he", label: "HE" },
];
const aLocale = ref(langs[0]);

watch(aLocale, (newLocale: LOCALE) => {
  locale.value = newLocale.value;
});
</script>
<style scoped>
.lang-switcher {
  margin: 0em 1em;
  padding: 1rem;
  max-width: 10em;
  color: white;
  background-color: inherit;
}

</style>
