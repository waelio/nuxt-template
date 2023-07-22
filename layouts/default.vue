<script lang="ts" setup>
import { ref, Ref, watch, computed } from "vue";
import { links1, links2, links3 } from "~/statics/index";
import { UserT } from "../types/index";
// import { LightModes } from '~~/types';
import { isDark, useToggle, autoStyle, autoClass } from "../mixins";
let fabPos: Ref<number[]> = ref([18, 18]);

const toggleDark = useToggle(isDark);
const { useAuthUser, logout } = useAuth();
const user: Ref<UserT> = useAuthUser() as Ref<UserT>;
const isAuthenticated = computed(() => !!(user.value && user.value.username));
let route = computed(() =>
  useRoute().path && useRoute().path.length ? useRoute().path.split("/")[1] : "/"
);
let PageName = ref(route.value.charAt(0).toUpperCase() + route.value.slice(1));
const leftDrawerOpen = ref(false);
const search = ref("");
const showAdvanced = ref(false);
const showDateOptions = ref(false);
const exactPhrase = ref("");
const hasWords = ref("");
const excludeWords = ref("");
const byWebsite = ref("");
const byDate = ref("Any time");
function onClear() {
  exactPhrase.value = "";
  hasWords.value = "";
  excludeWords.value = "";
  byWebsite.value = "";
  byDate.value = "Any time";
}
const cleanPath = (Path: string) => {
  return {
    raw: Path,
    path: Path.replace("/", ""),
    capt: Path.replace("/", "").charAt(0).toUpperCase() + Path.replace("/", "").slice(1),
  };
};
const cleanerPath = computed(() => {
  return {
    raw: route.value,
    path: `/${route.value}`,
    capt:
      route.value &&
      route.value.replace("/", "").charAt(0).toUpperCase() +
        route.value.replace("/", "").slice(1),
  };
});
const changeDate = (option: any) => {
  byDate.value = option;
  showDateOptions.value = false;
};
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated :class="autoClass" height-hint="64">
      <q-toolbar class="GNL__toolbar" :class="autoClass">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <nuxt-link to="/">
            <q-img :ratio="1 / 1" src="quasar-logo.png" class="quasar-logo" />
          </nuxt-link>
          <nuxt-link :to="cleanerPath.path" v-if="PageName">
            <span class="q-ml-sm text-h5 rainbow">{{ cleanerPath.capt }}</span>
          </nuxt-link>
        </q-toolbar-title>

        <q-space />

        <q-input
          :class="autoClass"
          class="GNL__toolbar-input"
          outlined
          dense
          v-model="search"
          color="shadow-1"
          placeholder="Search for topics, locations & sources"
        >
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
          <template v-slot:append>
            <q-btn
              flat
              dense
              round
              aria-label="Menu"
              icon="arrow_drop_down"
              :class="autoClass"
            >
              <q-menu anchor="bottom end" self="top end" :class="autoClass">
                <div class="q-pa-md" cl:class="widtCautoClass0px" :class="autoClass">
                  <div class="text-body2 q-mb-md">Narrow your search results</div>

                  <div class="row items-center">
                    <div class="col-3 text-subtitle2 text-grey">Exact phrase</div>
                    <div class="col-9 q-pl-md">
                      <q-input dense v-model="exactPhrase" />
                    </div>

                    <div class="col-3 text-subtitle2 text-grey">Has words</div>
                    <div class="col-9 q-pl-md">
                      <q-input dense v-model="hasWords" />
                    </div>

                    <div class="col-3 text-subtitle2 text-grey">Exclude words</div>
                    <div class="col-9 q-pl-md">
                      <q-input dense v-model="excludeWords" />
                    </div>

                    <div class="col-3 text-subtitle2 text-grey">Website</div>
                    <div class="col-9 q-pl-md">
                      <q-input dense v-model="byWebsite" />
                    </div>

                    <div class="col-12 q-pt-lg row justify-end">
                      <q-btn
                        flat
                        dense
                        no-caps
                        color="grey-7"
                        size="md"
                        style="min-width: 68px"
                        label="Search"
                        v-close-popup
                      />
                      <q-btn
                        flat
                        dense
                        no-caps
                        color="grey-7"
                        size="md"
                        style="min-width: 68px"
                        @click="onClear"
                        label="Clear"
                        v-close-popup
                      />
                    </div>
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </template>
        </q-input>

        <q-space />
        <LangSwitcher v-if="!isAuthenticated" />
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

                  <div class="text-subtitle1 q-mt-md q-mb-xs">0</div>
                  <q-btn
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
          :color="isAuthenticated ? 'green' : 'red'"
          :label="$t(isAuthenticated ? 'navigation.Signout' : 'navigation.Signin')"
          @click.prevent="isAuthenticated ? logout() : $router.push('/auth/login')"
          size="md"
          v-close-popup
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white no-scroll"
      :width="280"
      style="height: 100vh"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item
            class="GNL__drawer-item"
            :to="link.dist"
            v-ripple
            v-for="link in links1"
            :key="link.text"
            clickable
            @click="$router.push(link.dist)"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t(link.text) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links3"
            :key="link.text"
            clickable
          >
            <q-item-section @click="$router.push(link.dist)">
              <q-item-label
                >{{ $t(link.text) }}
                <q-icon v-if="link.icon" :name="link.icon" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <nuxt-link
                class="GNL__drawer-footer-link"
                href="javascript:void(0)"
                aria-label="privacy"
                to="/privacy"
                >{{ $t("navigation.PrivacyPageTitle") }}</nuxt-link
              >
              <span> · </span>
              <nuxt-link
                class="GNL__drawer-footer-link"
                href="javascript:void(0)"
                aria-label="Terms"
                to="/terms"
                >{{ $t("navigation.TermsPageTitle") }}</nuxt-link
              >
              <span> · </span>
              <nuxt-link
                class="GNL__drawer-footer-link"
                href="javascript:void(0)"
                aria-label="About"
                to="/about"
                >About Waelio</nuxt-link
              >
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="scroll-y overflow-hidden">
      <q-page padding class="fit" style="height: 100vh">
        <NuxtLoadingIndicator />
        <slot class="all-pages" />
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="fabPos">
          <q-btn fab icon="keyboard_arrow_up" color="accent" />
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
.quasar-logo {
  width: 40px;
}
</style>
<style lang="sass">
.GNL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 55%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #5f6368
    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
