<template>
  <v-card
    v-bind="$attrs"
    v-on="$listeners"
    class="mb-5"
    elevation="0"
    style="border: 1px solid #e7e6e6; border-radius: 10px"
  >
    <slot />
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>