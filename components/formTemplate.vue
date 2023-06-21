<template>
  <q-page id="loginPage" class="row justify-center shadow-10 q-mx-auto">
    <div
      id="loginContent"
      class="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-xl light"
    >
      <nuxt-link to="/">
        <q-img
          src="pmmlogos/logo_transparent_background.png"
          alt="PicMyMenu.com"
          srcset=""
          class="backimage"
        />
      </nuxt-link>
      <q-card-section>
        <keep-alive>
          <slot />
        </keep-alive>
      </q-card-section>
      <q-card flat class="q-px-lg">
        <div class="deviderx row">
          <span class="dev1 col-grow"></span>
          <span class="dev0 col-grow">OR</span>
          <span class="dev1 col-grow"></span>
        </div>
        <div class="q-mt-sm">
          <div class="fit row no-wrap justify-between">
            <q-btn
              color="white"
              ba
              glossy
              push
              class="bg-facebook sm_button"
              icon="fab fa-facebook-f"
              label="Facebook"
              size="md"
              @click="$emit('onAuthenticate', 'facebook')"
            >
            </q-btn>
            <q-btn
              color="white"
              ba
              glossy
              push
              class="bg-red sm_button"
              icon="fab fa-google"
              label="Google"
              size="md"
              @click="$emit('onAuthenticate', 'google')"
            >
            </q-btn>
          </div>
        </div>
      </q-card>
      <footer-navs></footer-navs>
    </div>
  </q-page>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
#loginContent {
  padding: 4vh 3vw;
  width: auto;
  height: auto;
}
.light {
  background: #ffffff;
}
.sm_button {
  height: 36px;
  font-size: 0.7rem !important;
}
.backimage {
  height: 5rem;
  display: block;
  margin: auto;
}
.login-card {
  width: 350px;
  margin: auto;
}
.subtitle {
  width: 200px;
  margin: auto;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: #999;
}
.ma-auto {
  margin: auto;
}
.devider {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
  justify-content: space-around;
}
.dev1,
.dev0 {
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  margin: 0 18px;
  display: inline-block;
  text-transform: uppercase;
}
.dev1 {
  background-color: #dbdbdb;
  height: 2px;
  vertical-align: middle;
}
.devider .dev1:nth-child(1) {
  margin-right: auto;
}
.devider .dev1:nth-child(2) {
  margin-left: auto;
}
.devider .dev1:nth-child(3) {
  margin-left: auto;
}
.dev0 {
  color: #999;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0px 0px;
  margin: -5px 15px;
}
.three-fourth-width {
  width: 70%;
}
.store-image {
  margin: auto;
  display: block;
  height: 10vw;
}
</style>
