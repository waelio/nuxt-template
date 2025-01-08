<script setup lag="ts">

useServerHead({
  bodyAttrs: {
    class: "font-geist antialiased",
  },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});

useSeoMeta({
  title: appName,
  appDescription: appDescription,
  ogTitle: appName,
  ogDescription: appDescription,
});

</script>
<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>
