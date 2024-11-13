<script setup lag="ts">
useServerHead({
  bodyAttrs: {
    class: "font-geist antialiased",
  },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});

useSeoMeta({
  appName,
  appDescription,
  // Either NuxtSeo SEO Experiments OR set it manually
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
