<template>
  <div class="q-px-lg">
    <q-form @submit="handleLogin" @reset="onReset" class="q-gutter-md">
      <h4 class="text-center">Login</h4>
      <q-btn label="Login" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </q-form>
    <q-input
      type="text"
      placeholder="username"
      label="Username"
      name="username"
      v-model="authUser.username"
    />
    <q-input
      type="password"
      placeholder="password"
      label="Password"
      name="password"
      v-model="authUser.password"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import useAuth from "~/composables/useAuth";
const router = useRouter();
const emit = defineEmits(["loginSuccess"]);

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
  } catch (error) {
    console.log(error);
  } finally {
    authUser.loading = false;
    router.push("/");
  }
}
</script>
