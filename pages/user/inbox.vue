<template>
  <NuxtLayout name="default">
    <div
      class="fit row wrap justify-start items-start content-start scroll overflow-hidden"
      ref="chat_main"
      v-if="user"
    >
      <div class="col-4 self-start">
        <div class="bg-grey">
          <q-btn round flat icon="message" />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>New group</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Profile</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Archived</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Favorites</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section @click.stop="logout">Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <q-input
          outlined
          bordered
          dense
          class="WAL__field full-width"
          bg-color="white"
          v-model="search"
          placeholder="Search or start a new conversation"
        >
          <template slot="prepend">
            <q-icon name="search" />
          </template>
        </q-input>
        <UserList :users="users" :logout="logout" />
      </div>
      <div class="col-8 self-start" v-if="tweet">
        <div class="q-px-md row justify-center full-width" style="height: 100%">
          <div style="width: 100%; min-width: 400px; height: 50vh; overflow-y: scroll">
            <MessageList
              :messages="chats"
              :findMessages="findUsers"
              :createMessage="createMessage"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <ComposeMessage ref="composer" />
        </div>
      </div>
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
  </NuxtLayout>
</template>
<script lang="ts" setup>
import useTweets from "~/composables/useTweets";

const loading = ref(false);
const search = ref();
const tweet = ref(null);
const { useAuthUser, logout } = useAuth();
const user = useAuthUser();
const { getTweetById, getTweetsByUser } = useTweets();

watch(
  () => useRoute().fullPath,
  () => getTweet()
);

function getTweetIdFromRoute(): string {
  // @ts-ignore
  return useRoute().params?.id && "62f120cb263debfa10c1fe3a";
}

async function getTweet() {
  loading.value = true;
  let response: any;
  try {
    response = await getTweetById(getTweetIdFromRoute());
    tweet.value = response.tweet;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onBeforeMount(() => {
  getTweet();
});
</script>
