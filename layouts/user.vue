<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar v-if="isAuthenticated">
        <q-toolbar-title>
          <q-avatar>
            <router-link to="/">
              <img
                :src="
                  user.profileImage
                    ? user.profileImage + '?s=45'
                    : 'https://cdn.quasar.dev/img/boy-avatar.png'
                "
              />
            </router-link>
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/user/profile" label="Profile" />
        <q-route-tab to="/user/chat" label="Chat" />
        <q-route-tab to="/user/messages" label="Messages" />
        <q-route-tab to="/user/favorites" label="Favorites" />
        <q-route-tab to="/user/settings" label="My Settings" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
      <q-no-ssr>
        <em>@c</em>
        <template v-slot:placeholder>
          <em>@s</em>
        </template>
      </q-no-ssr>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
const logo = "favicon.ico";
// const logo2 = "/pmmlogos/white_logo.png";
// const { useAuthUser } = useAuth();
// const user = useAuthUser();
// const isAuthenticated = computed(() => user.value && user.value.profileImage);
</script>
