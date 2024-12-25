<script setup lang="ts">

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
            <q-item-section>
              <q-card>
                <q-card-actions>
                  <p>Settings Page</p>
                </q-card-actions>
              </q-card>
            </q-item-section>
          </q-item>
        </q-menu>
      </q-list>
    </q-menu>
    <h1>NUXT 4</h1>
    <h2>{{ appName }}</h2>
    <h5>{{ appDescription }}</h5>
    <NuxtLink class="q-mt-xl text-h3 block" title="Quran" to="/quran">Quran</NuxtLink>
    <NuxtLink class="q-mt-xl text-h3 block" title="HolyNames" to="/holynames">HolyNames</NuxtLink>

  </QPage>
</template>
