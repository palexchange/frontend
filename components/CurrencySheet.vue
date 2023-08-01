<template>
  <v-sheet class="text-center px-2" elevation="2">
    <v-row>
      <v-col cols="12" style="font-size:20px">
        {{ $t(currency) }}
      </v-col>
    </v-row>
    <v-row>
      <v-col
        ><v-text-field
          type="text"
          outlined
          dense
          hide-details
          :label="$t('buy')"
        ></v-text-field
      ></v-col>
      <v-col
        ><v-text-field
          type="text"
          outlined
          dense
          hide-details
          :label="$t('sale')"
        ></v-text-field
      ></v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  props: ["currency"],
};
</script>

<style>
</style>