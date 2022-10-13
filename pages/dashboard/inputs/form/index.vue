<template>
  <div>
    <Card class="pb-3">
      <v-card-title>
        <Title title="statement" />
      </v-card-title>
      <v-card-text>
        <v-row class="mt-5 lg5-custome-row">
          <v-col cols="12" lg="4" xs="12" sm="6">
            <AccountAutocomplete
              required
              :params="{ type_id: 1, per_page: -1 }"
              text="beneficiary"
              holder="beneficiary"
              v-model="form.from_account_id"
            />
          </v-col>
          <v-col cols="12" lg="4" xs="12" sm="6">
            <InputField
              required
              text="recived amount"
              holder="recived amount"
              v-model.number="form.from_amount"
            >
            </InputField>
          </v-col>
          <v-col cols="12" lg="4" xs="12" sm="6">
            <CurrencyAutoComplete
              required
              text="currency"
              holder="currency"
              v-model="form.to_account_id"
            />
          </v-col>

          <v-col cols="12" lg="4" xs="12" sm="6">
            <InputField
              required
              text="conversion factor to usd"
              holder="conversion factor to usd"
              v-model="form.exchange_rate"
            ></InputField>
          </v-col>

          <v-col cols="12" lg="4" xs="12" sm="6">
            <InputField
              disabledd
              required
              text="to ammount"
              holder="to ammount"
              :value="to_amount"
            ></InputField>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="2">
            <v-btn
              @click="
                form.date = form.date + ' ' + form.time;
                $save(form, 'receipt', null, '/dashboard/inputs');
                form = {};
              "
              height="40"
              color="primary"
              block
            >
              {{ $t("approve") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        status: 1,
        type: 1, // (type = 1) => input || (type =2) => output
        main_currency_id: 1,
      },
    };
  },
  computed: {
    ...mapState({
      all_currencies: (state) => state.currency.all,
    }),
    to_amount() {
      let factor = this.form.exchange_rate;
      let amount = this.form.from_amount;
      let a = amount / factor;
      this.form.to_amount = a;
      return a || null;
    },
  },
  mounted() {
    this.$store.dispatch("currency/index");
  },
};
</script>
  
<style>
.rounding {
  border-radius: 4px !important;
}
@media (min-width: 1264px) {
  .lg5-custome-row > div {
    width: 20% !important;
    max-width: 20% !important;
    flex-basis: 20% !important;
  }
}
</style>