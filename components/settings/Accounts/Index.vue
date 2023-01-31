<template>
  <div>
    <v-row>
      <!-- <v-col>
        <v-btn color="primary" @click="addBalance()">
          {{ $t("Openning palance") }}</v-btn
        >
      </v-col>
      <v-col>
        <v-btn color="primary" @click="OpenBalance()">
          {{ $t("Open Balance") }}</v-btn
        >
      </v-col>
      <v-col>
        <v-btn color="primary" @click="CloseBalance()">
          {{ $t("Close Balance") }}</v-btn
        >
      </v-col> -->
      <v-col>
        <v-btn color="primary" @click="addAccount()">
          {{ $t("add account") }}</v-btn
        >
      </v-col>
    </v-row>
    <data-table :params="{ per_page: 15 }" module="account"> </data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        type: 0,
      },
    };
  },

  methods: {
    addAccount() {
      this.$store.dispatch("setDialog", {
        name: "AddAccount",
      });
    },

    OpenBalance() {
      this.$store.dispatch("setDialog", {
        name: "SettingsAccountsBalanceOpen",
      });
    },
    CloseBalance() {
      this.$store.dispatch("setDialog", {
        name: "SettingsAccountsBalanceClose",
      });
    },
    edit(item) {
      this.$store.dispatch("setDialog", {
        name: "AddAccount",
        item,
      });
    },
    show(item) {
      this.$store.dispatch("setDialog", {
        name: "AddBeneficiary",
        item,
      });
    },
  },
  computed: {
    ...mapState({
      action: (state) => state.context.action,
      item: (state) => state.context.item,
    }),
  },
  watch: {
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
};
</script>

<style>
</style>