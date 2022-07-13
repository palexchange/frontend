<template>
  <v-app>
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  // middleware: "auth",
  // auth: "guest",
  beforeCreate() {
    this.$vuetify.rtl = this.$i18n.locale == "ar" || this.$i18n.locale=="he" ;
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