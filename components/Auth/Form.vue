<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>
    <QForm>
      <div class="pt-5 space-y-6">
        <q-input
          label="Username"
          placeholder="@username"
          auto-complete="current-name"
          v-model="data.username"          
        />

        <q-input
          label="Password"
          type="password"
          auto-complete="current-password"
          v-model="data.password"
        >
          <template v-if="data.password" v-slot:append>
            <q-icon name="cancel" @click.stop.prevent="data.password = null" class="cursor-pointer" />
          </template>
        </q-input>

        <UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">
          Login
        </UIButton>
      </div>
    </QForm>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(["loginSuccess"]);
const handleUsernameEmit = (e: string) => {
  console.log(e);
};
const router = useRouter();
const data = reactive({
  username: "",
  password: "",
  loading: false,
});

async function handleLogin() {
  const { login } = useAuth();

  data.loading = true;
  try {
    await login({
      username: data.username,
      password: data.password,
    });

    emit("loginSuccess", { username: data.username });
  } catch (error) {
    console.log(error);
  } finally {
    data.loading = false;
    router.push("/");
  }
}

const isButtonDisabled = computed(() => {
  return (!data.username || !data.password) || data.loading;
});
</script>
