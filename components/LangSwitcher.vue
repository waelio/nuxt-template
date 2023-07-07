<template>
  <div>
    <q-form class="lang-switcher">
      <q-select 
      options-dense 
      v-model="aLocale" 
      :options="langs" />
    </q-form>
  </div>
</template>
<script lang="ts" setup>
type LOCALE = { label: string; value: string };
const { locale } = useI18n();
const langs: LOCALE[] = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "he", label: "Hebrew" },
];
const aLocale = ref(langs[0]);

watch(aLocale, (newLocale: LOCALE) => {
  console.log(newLocale);
  locale.value = newLocale.value;
  // setLocale(newLocale.value)
});
</script>
<style scoped>
.lang-switcher{
  margin: 0em 1em;
  padding: 1rem;
  max-width: 10em;
}
</style>
