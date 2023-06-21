<script lang="ts" setup>
import { IUSER } from "../types";
import { Ref, ComputedRef } from "vue";
import useAuth from "~/composables/useAuth";

const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
const router = useRouter();
const loading = ref(false);
const isAuthLoading = useAuthLoading();
let isAuthenticated: ComputedRef<boolean> = computed(
  () => !!(user.value && user.value.username)
);
initAuth();

const user: Ref<IUSER> = useAuthUser();
onBeforeMount(async () => {
  initAuth();
  isAuthenticated = computed(() => !!(user.value && user.value.username));

  loading.value = true;
  if (user) {
    try {
      loading.value = true;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
});
</script>
<template>
  <ClientOnly>
    <NuxtLayout name="default">
      <MainSection class="fit no-borders" title="Home" :loading="loading">
        <LoadingPage v-if="isAuthLoading" />

        <!-- App -->
        <div clas="all-pages fit q-px-md">
          <section class="lg:px-[15%] px-[5%] pt-20">
            <h3 class="lg:text-5xl text-2xl leading-normal font-semibold text-center">
              Check Out Our Latest
            </h3>
          </section>

          <slot />
        </div>
        <div class="q-px-md">
          <q-btn
            :color="isAuthenticated ? 'green' : 'red'"
            text="white"
            :label="isAuthenticated ? 'Sign Out' : 'Sign In'"
            @click.prevent="isAuthenticated ? logout() : router.push('/auth/login')"
          />
        </div>
      </MainSection>
    </NuxtLayout>
  </ClientOnly>
</template>
<style></style>
