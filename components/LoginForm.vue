<template>
  <div class="q-pa-lg border-2">
    <q-form @submit="handleLogin" @reset="onReset" class="q-my-md q-gutter-md">
      <h4 class="text-center">{{ $t("navigation.Signin") }}</h4>
      <q-input
        type="text"
        placeholder="username"
        label="Username"
        name="username"
        autocomplete="current-password"
        v-model="authUser.username"
      />
      <q-input
        :type="isPwd1? 'password': 'text'"
        placeholder="password"
        label="Password"
        name="password"
        autocomplete="off"
        v-model="authUser.password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd1 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd1 = !isPwd1"
          />
        </template>
      </q-input>
      <q-btn label="Login" type="submit" color="positive" text-color="white" />
      <q-btn
        label="Reset"
        type="reset"
        color="warning"
        text-color="white"
        class="q-ml-sm"
      />
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import useAuth from "~/composables/useAuth";
import { useTitle } from "@vueuse/core";
useTitle("Login Page");

const router = useRouter();
const isPwd1 = ref(true);

const emit = defineEmits(["loginSuccess"]);
const user = ref({});
const authUser = reactive({
  username: "",
  password: "",
  loading: false,
});
function onReset() {
  authUser.username = "";
  authUser.password = "";
}
async function handleLogin() {
  const { login } = useAuth();
  authUser.loading = true;
  try {
    await login({
      username: authUser.username,
      password: authUser.password,
    });
    emit("loginSuccess", { username: authUser.username });
    authUser.username = "";
    authUser.password = "";
  } catch (error) {
    console.log(error);
  } finally {
    authUser.loading = false;
    router.push("/");
  }
}
</script>
