<template>
  <v-row>
    <v-col
      :key="currency.id"
      class="text-center"
      v-for="currency in currencies"
    >
      <div>
        {{ currency.name }}
      </div>
      <div>
        <v-autocomplete
          item-text="name"
          item-value="id"
          return-object
          @change="(v) => updateAccount(v)"
          :value="
            $auth.user.main_active_accounts.find(
              (v) => v.currency_id == currency.id
            )
          "
          :items="
            $auth.user.active_accounts.filter(
              (v) => v.currency_id == currency.id
            )
          "
        >
        </v-autocomplete>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      main_accounts: {},
    };
  },
  computed: {
    ...mapState({
      currencies: (state) => state.currency.all,
      main_active_accounts: (state) => state.auth.user.main_active_accounts,
    }),
  },
  methods: {
    updateAccount(v) {
      console.log(v);
      this.$save({ id: v.user_account_id, main: true }, "user_account");
    },
  },
  mounted() {
    this.$store.dispatch("currency/index");
  },
};
</script>

<style>
</style>