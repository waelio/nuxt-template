<script lang="ts" setup>
import { UserI } from "../types";
import { Ref, ComputedRef } from "vue";
import useAuth from "~/composables/useAuth";
import { CaslActionE, CaslSubjectE } from "../types";
import { useAuthStore } from "~/store/auth.pinia";
const { t } = useI18n();
const router = useRouter();
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
const { can, cannot } = useCasl();
const $q = useQuasar();
const _auth = useAuthStore();

useHead({
  title: t("welcome"),
});
const loading = ref(false);
const isAuthLoading = useAuthLoading();
let isAuthenticated: ComputedRef<boolean> = computed(
  () => !!(user.value && user.value.username)
);
initAuth();

const updateStore = (subject: CaslSubjectE, action: CaslActionE) => {
  _auth.setPermission(subject, action);
};
const user: Ref<UserI> = useAuthUser();
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
const localAlert = (title: string, message: string) => {
  const p = {
    title: t(title),
    message,
  };
  $q.dialog(p);
};
</script>
<template>
  <ClientOnly>
    <NuxtLayout name="default">
      <MainSection class="fit no-borders" title="Home" :loading="loading">
        <LoadingPage v-if="isAuthLoading" />

        <!-- App -->
        <div clas="all-pages q-px-md">
          <section class="lg:px-[15%] px-[5%] pt-20">
            <h3
              class="lg:text-5xl text-2xl leading-normal font-semibold text-center revrainbow"
            >
              Check Out Our Latest
            </h3>
          </section>
          <h4>
            <a target="_blank" href="https://casl.js.org/v6/en">CASL Documentaions</a>
          </h4>
          <fieldset>
            <legend>{{ $t("demoContent.q1") }}</legend>
            <q-btn
              :label="$t('demoContent.q1')"
              :color="
                can(CaslActionE.CREATE, CaslSubjectE.POST) ? 'positive' : 'negative'
              "
              @click="
                localAlert(
                  `demoContent.q1`,
                  JSON.stringify(can(CaslActionE.CREATE, CaslSubjectE.POST))
                )
              "
            ></q-btn>
            <pre lang="html">
              v-if="can({{ CaslActionE.CREATE }}, {{
                CaslSubjectE.POST
              }})"                         
            </pre>
            <q-radio
              :label="can(CaslActionE.CREATE, CaslSubjectE.POST) ? 'True' : 'False'"
            />
            <p>
             <q-btn color="pink" text-color="white" label="change" @click="updateStore(CaslSubjectE.POST,CaslActionE.CREATE)" />
            </p>
            
          </fieldset>
          <fieldset>
            <legend>{{ $t("demoContent.q2") }}</legend>
            <q-btn
              label="Read Post"
              :color="can(CaslActionE.READ, CaslSubjectE.POST) ? 'positive' : 'negative'"
              @click="
                localAlert(
                  `demoContent.q2`,
                  JSON.stringify(can(CaslActionE.READ, CaslSubjectE.POST))
                )
              "
            ></q-btn>
            <p v-if="can(CaslActionE.READ, CaslSubjectE.POST)">POST content ...</p>
            <pre lang="html">
              v-if="can({{ CaslActionE.READ }}, {{
                CaslSubjectE.POST
              }})"                         
            </pre>
            <q-radio
              :label="can(CaslActionE.READ, CaslSubjectE.POST) ? 'True' : 'False'"
            />
          </fieldset>
          <fieldset>
            <legend>{{ $t("demoContent.q3") }}</legend>
            <q-btn
              label="Update Post"
              color="warning"
              :disable="cannot(CaslActionE.UPDATE, CaslSubjectE.POST)"
            ></q-btn>
            <pre lang="html">
              :disable="cannot({{ CaslActionE.UPDATE }}, {{
                CaslSubjectE.POST
              }})"                         
            </pre>
            <q-radio
              :label="can(CaslActionE.UPDATE, CaslSubjectE.POST) ? 'True' : 'False'"
            />
          </fieldset>

          <fieldset>
            <legend>{{ $t("demoContent.q4") }}</legend>
            <q-btn
              label="Delete Post"
              color="negative"
              :disable="cannot(CaslActionE.DELETE, CaslSubjectE.POST)"
            ></q-btn>
            <pre lang="javascript">
              :disable="cannot({{ CaslActionE.DELETE }}, {{
                CaslSubjectE.POST
              }})"                         
            </pre>
            <q-radio
              :label="can(CaslActionE.DELETE, CaslSubjectE.POST) ? 'True' : 'False'"
            />
          </fieldset>

          <slot />
        </div>
        <div class="q-px-md">
          <q-btn
            class="q-my-md q-ml-none`"
            :color="isAuthenticated ? 'green' : 'red'"
            text="white"
            :label="$t(isAuthenticated ? 'navigation.Signout' : 'navigation.Signin')"
            @click.prevent="isAuthenticated ? logout() : router.push('/auth/login')"
          />
        </div>
      </MainSection>
    </NuxtLayout>
  </ClientOnly>
</template>
<style>
pre {
  width: 100%;
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
