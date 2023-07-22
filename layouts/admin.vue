<script lang="ts" setup>
let fabPos: Ref<number[]> = ref([18, 18]);
const logoSRC = ref("quasar-logo.png");
const { useAuthUser, logout } = useAuth();
import { UserT } from "../types/index";
const user: Ref<UserT> = useAuthUser() as Ref<UserT>;
const isAuthenticated = computed(() => !!(user.value && user.value.username));
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-accent text-white">
      <q-toolbar>
        <q-toolbar-title shrink class="row items-center no-wrap">
          <nuxt-link to="/" class="text-white">
            <q-img ratio="1/1" :src="logoSRC" class="quasar-logo" />
          </nuxt-link>
        </q-toolbar-title>

        <LangSwitcher v-if="!isAuthenticated" class="text-white" />
        <q-space />
        <div v-if="isAuthenticated" class="q-gutter-sm row items-center no-wrap">
          <q-btn round :class="autoClass">
            <q-avatar size="42px">
              <img :src="user.profileImage" />
            </q-avatar>
            <q-menu :class="autoClass">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Settings</div>
                  <q-toggle v-model="isDark" clickable :label="$t('general.lightMode')" />
                  <q-toggle v-model="leftDrawerOpen" :label="$t('button.toggle_langs')" />
                  <LangSwitcher />
                </div>
                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center" v-if="isAuthenticated">
                  <q-avatar size="72px">
                    <img
                      :src="
                        user.profileImage || 'https://cdn.quasar.dev/img/boy-avatar.png'
                      "
                    />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">1</div>
                  <q-btn
                    class="q-mr-lg"
                    dense
                    :color="isAuthenticated ? 'green' : 'red'"
                    :label="
                      $t(isAuthenticated ? 'navigation.Signout' : 'navigation.Signin')
                    "
                    @click.prevent="
                      isAuthenticated ? logout() : $router.push('/auth/login')
                    "
                    size="sm"
                    v-close-popup
                  />
                </div>
                <LangSwitcher v-if="!isAuthenticated" />
              </div>
            </q-menu>
          </q-btn>
        </div>
        <q-btn
          flat
          v-if="!isAuthenticated"
          :bgColor="isAuthenticated ? 'green' : 'red'"
          :label="$t(isAuthenticated ? 'navigation.Signout' : 'navigation.Signin')"
          @click.prevent="isAuthenticated ? logout() : $router.push('/auth/login')"
          size="md"
          v-close-popup
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page padding class="fit" style="height: 100vh">
        <slot />
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="fabPos">
          <q-btn fab icon="keyboard_arrow_up" color="accent" />
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
