<template>
  <div>
    <v-btn to="/dashboard"> <h1>go to dashboard here</h1></v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Index",
  middleware: "auth",
  auth: "guest",
  layout: "external",
};
</script>
<style>
</style>
