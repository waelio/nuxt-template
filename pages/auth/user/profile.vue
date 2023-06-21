<template>
  <q-page class="q-pa-md row items-center align-middle q-gutter-md">
    <div
      class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 q-mx-auto"
      v-if="user && !!user.profileImage"
    >
      <q-card class="my-card" flat bordered>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="user.profileImage + '?s=200'" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
            <q-item-label caption>
              {{ user.email }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section>
            {{ user.handle }}
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="col-6"> {{ user.profileImage }} </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <div class="row">
        <div class="col align-content-around">
          <q-btn
            color="red"
            icon-right="fingerprint"
            to="/auth/login"
            label="Login"
            class="absolute-center"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
const { useAuthUser } = useAuth();
const user = useAuthUser();
</script>
