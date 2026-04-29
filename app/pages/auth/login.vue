<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../../store/auth.pinia'
const auth = useAuthStore()
const User = ref({
    username: '',
    password: '',
    role: 'user',
})
function onSubmit() {
    auth.setUserInfo(User.value)
    onReset()
}
function onReset() {
    User.value = {
        username: '',
        password: ''
    }
}
</script>
<template>
    <q-card class="my-card" h-400>
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input v-model="User.username" type="text" label="Username" />
                <q-input v-model="User.password" type="password" label="Password" />

                <div>
                    <q-btn label="Submit" type="submit" color="primary" />
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form> </q-card-section>
    </q-card>

</template>