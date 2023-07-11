<template>
  <div class="q-pa-lg border-2">
    <q-form @submit="onSubmit" @reset="onReset" class="q-pa-xl q-my-md q-gutter-md">
      <h4 class="text-center">{{ $t('navigation.Register') }}</h4>
      <q-input
        type="text"
        placeholder="email"
        label="Email"
        name="email"
        v-model="newUser.email"
      />
      <q-input
        type="text"
        placeholder="username"
        label="Username"
        name="username"
        v-model="newUser.username"
      />
      <q-input
        type="text"
        placeholder="first Name"
        label="First Name"
        name="username"
        v-model="newUser.firstName"
      />
      <q-input
        type="text"
        placeholder="last name"
        label="Last Name"
        name="username"
        v-model="newUser.lastName"
      />
      <q-input
        type="password"
        placeholder="password"
        label="Password"
        name="password"
        v-model="newUser.password"
      />
      <q-input
        type="password"
        placeholder="repeat password"
        label="Reapeat password"
        name="password"
        v-model="newUser.password"
      />
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
const title = useTitle("Signup Page");

const newUser = reactive({
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  repeatPassword: "",
});
function onReset() {
  newUser.email = "";
  newUser.username = "";
  newUser.firstName = "";
  newUser.lastName = "";
  newUser.password = "";
  newUser.repeatPassword = "";
}
function onSubmit() {}
</script>
