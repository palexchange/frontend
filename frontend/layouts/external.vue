<template>
  <v-app>
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
};
</script>

<style>
.main-guest {
  background: #f5f5f5;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>