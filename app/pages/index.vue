<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useWebSocket } from "../composables/useWebSockets";

const { message, messages, connect, sendMessage, disconnect } = useWebSocket("ws://localhost:3000");

onMounted(() => {
  connect();
});

onUnmounted(() => {
  disconnect();
});
// const nuxtApp = useNuxtApp()
</script>
<template>
  <QPage padding>
    <q-menu class="menu q-mt-lg bg-orange text-white">
      <q-list>
        <q-menu>
          <q-item>
            <q-item-label>Profile</q-item-label>
            <q-item-section>
              <q-card>
                <q-card-actions>
                  <p>Profile Page</p>
                </q-card-actions>
              </q-card>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-label>Settings</q-item-label>
          </q-item>
        </q-menu>
      </q-list>
    </q-menu>
    <h2>{{ extra }}</h2>
    <h2>{{ appName }}</h2>
    <h5>{{ appDescription }}</h5>

    <NuxtLink class="q-mt-xl text-h3 block" title="Quran" to="/quran/1">Quran</NuxtLink>
    <NuxtLink class="q-mt-xl text-h3 block" title="HolyNames" to="/holynames">HolyNames</NuxtLink>
    <NuxtLink class="q-mt-xl text-h3 block" title="stats" to="/stats">Stats</NuxtLink>
    <div class="q-pa-md">
      <q-input v-model="message" placeholder="Type a message" />
      <q-btn @click="sendMessage(message)">Send</q-btn>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>

  </QPage>
</template>
