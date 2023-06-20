<template>
  <div class="q-px-lg">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <h4 class="text-center">Register</h4>
      <q-btn label="Register" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      <q-input
        type="text"
        placeholder="username"
        label="username"
        name="username"
        v-model="newUser.username"
      />
      <q-input
        type="password"
        placeholder="password"
        label="password"
        name="password"
        v-model="newUser.password"
      />
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "#imports";

const newUser = reactive({
  username: "",
  password: "",
});
function onReset() {
  newUser.username = "";
  newUser.password = "";
}
function onSubmit() {}
</script>
