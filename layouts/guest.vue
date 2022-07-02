<template>
  <v-app>
    <v-main class="main-guest">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-row justify="center">
              <v-avatar
                size="128"
                style="z-index: 0; top: 10px; right: 0; left: 0; margin: auto"
              >
                <v-img
                  @click="$router.push('/')"
                  style="cursor: pointer"
                  src="/logo.png"
                ></v-img>
              </v-avatar>
            </v-row>
            <v-row justify="center" class="mb-10">
              <v-col class="text-center text-h4 font-weight-bold">
                مطبخ أون لاين
              </v-col>
            </v-row>
            <Nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
  beforeCreate() {
    this.$vuetify.rtl = this.$i18n.locale == "ar" || this.$i18n.locale == "he";
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@500&display=swap");

* {
  font-family: Tajawal;
}
.main-guest {
  background: #f5f5f5;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>