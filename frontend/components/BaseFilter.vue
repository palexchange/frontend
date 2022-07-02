<template>
  <v-card elevation="1">
    <v-card-title> {{ $t("filter") }} {{ module_name }} </v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn color="primary" @click="search">
        {{ $t("search") }}
      </v-btn>
      <v-btn color="red" text @click="params={}">
        {{ $t("clear") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    module_name: {
      type: String,
    },
    params: {
      type: Object,
      default: {},
    },
  },
  methods: {
    search() {
      this.$store.dispatch(`${this.module_name}/index`, {
        ...this.params,
      });
    },
  },
};
</script>

<style>
</style>