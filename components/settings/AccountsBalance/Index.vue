<template>
  <div>
    <v-col>
      <v-btn color="primary" @click="addReceipt()">
        {{ $t("add transaction") }}</v-btn
      >
    </v-col>
    <data-table :params="params" module="receipt"> </data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: { type: 3 },
    };
  },
  methods: {
    addReceipt() {
      this.$store.dispatch("setDialog", {
        name: "SettingsAccountsBalanceCreate",
      });
    },
  },
};
</script>

<style>
</style>