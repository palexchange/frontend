<template>
  <div>
    <v-btn   @click="expand = !expand" icon>
      <v-icon small> fas fa-eye</v-icon>
    </v-btn>
    <v-expand-transition>
      <v-row v-show="expand">
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
                main_active_accounts.find((v) => v.currency_id == currency.id)
              "
              :items="
                user.active_accounts.filter((v) => v.currency_id == currency.id)
              "
            >
            </v-autocomplete>
          </div>
        </v-col>
      </v-row>
    </v-expand-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      main_accounts: {},
      expand: false,
    };
  },
  computed: {
    ...mapState({
      currencies: (state) => state.currency.all,
      main_active_accounts: (state) => state.auth.user.main_active_accounts,
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    updateAccount(v) {
      console.log(v);
      this.$save({ id: v.user_account_id, main: true }, "user_account");
      this.$auth.fetchUser();
    },
  },
  mounted() {
    if (!this.currencies[0]) {
      console.log("UserActiveAccounts");
      this.$store.dispatch("currency/index");
    }
  },
};
</script>

<style>
</style>