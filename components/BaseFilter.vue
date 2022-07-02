<template>
  <v-form ref="filter">
    <v-card elevation="1">
      <v-card-title> {{ $t(`${module_name}_filter`) }} </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn :loading="$store.state.loading" color="primary" @click="search">
          {{ $t("search") }}
        </v-btn>
        <v-btn color="red" text @click="$refs.filter.reset()">
          {{ $t("clear") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
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