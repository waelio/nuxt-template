<script setup lag="ts">

useServerHead({
  bodyAttrs: {
    class: "font-geist antialiased",
  },
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});

useHead({
  title: appName,
  appDescription: appDescription,
  ogTitle: appName,
  ogDescription: appDescription,
});

</script>
<template>

  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <VitePwaManifest />
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
