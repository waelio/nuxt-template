<template>
  <div class="q-pa-lg border-2">
    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-pa-xl q-my-md q-gutter-md"
    >
      <h4 class="text-center">{{ $t("navigation.Register") }}</h4>
      <q-input
        type="text"
        placeholder="email"
        label="Email"
        name="email"
        v-model="data.email"
      />
      <q-input
        type="text"
        placeholder="username"
        label="Username"
        name="username"
        v-model="data.username"
      />
      <q-input
        type="text"
        placeholder="first Name"
        label="First Name"
        name="first_name"
        v-model="data.first_name"
      />
      <q-input
        type="text"
        placeholder="last name"
        label="Last Name"
        name="last_name"
        v-model="data.last_name"
      />
      <q-input
        :type="isPwd ? 'password' : 'text'"
        placeholder="password"
        label="Password"
        name="password"
        v-model="data.password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
        :type="isPwd ? 'password' : 'text'"
        placeholder="repeat password"
        label="Reapeat password"
        name="password"
        v-model="data.repeatPassword"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn label="Register" type="submit" color="positive" text-color="white" />
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
import { useTitle } from "@vueuse/core";
const emit = defineEmits(["signup-success"]);
const props = defineProps(['data']);

const isPwd = ref(true);
useTitle("Signup Page");

const lData = reactive({
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  repeatPassword: "",
});
function onReset() {
  lData.email = "";
  lData.username = "";
  lData.firstName = "";
  lData.lastName = "";
  lData.password = "";
  lData.repeatPassword = "";
}
function onSubmit() {
  emit("signup-success", lData);
  onReset()
}
</script>
