<template>
  <div>
    <Card class="pb-3">
      <v-card-title>
        <Title title="incoming receipt" />
      </v-card-title>
      <v-card-text>
        <v-form v-model="validated">
          <v-row class="mt-5 lg5-custome-row">
            <v-col cols="12" lg="4" xs="12" sm="6">
              <AutoComplete
                required
                :items="accounts.filter((v) => v.type_id == 1)"
                text="from account"
                holder="from account"
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
                @change="(v) => setToaccount(v)"
                required
                text="currency"
                holder="currency"
                v-model="form.currency_id"
              />
            </v-col>
            <v-col cols="12" lg="4" xs="12" sm="6">
              <!-- :items="
                  user.active_accounts.filter(
                    (v) => v.currency_id == form.currency_id
                  )
                " -->

              <AccountAutocomplete
                required
                text="إلي حساب"
                holder="إلي حساب"
                v-model="form.to_account_id"
              />
              <!-- -->
              <!-- :items="
                  user.active_accounts.filter(
                    (v) => v.currency_id == form.currency_id
                  )
                "  -->
              <!-- <AutoComplete
                dashed
                :items="accounts.filter((v) => v.type_id == 7)"
                required
                text="إلي حساب"
                holder="إلي حساب"
                :value="form.to_account_id"
              /> -->
            </v-col>

            <v-col cols="12" lg="4" xs="12" sm="6">
              <InputField
                required
                text="conversion factor to usd"
                @input="(v) => this.refreshNum++"
                holder="conversion factor to usd"
                v-model="form.exchange_rate"
              ></InputField>
            </v-col>
            <v-col cols="12" lg="4" xs="12" sm="6">
              <InputField
                disabledd
                text="amount in usd"
                holder="amount in usd"
                :value="to_amount"
              ></InputField>
            </v-col>
            <v-col cols="12" lg="6">
              <InputField
                text="statement"
                holder="statement"
                v-model="form.statement"
              ></InputField>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="center">
          <v-col cols="2">
            <v-btn
              @click="
                validated
                  ? $save(form, 'receipt', null, '/dashboard/inputs')
                  : ''
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
      validated: false,
      refreshNum: 0,
      form: {
        status: 1,
        type: 1, // (type = 1) => input || (type =2) => output
      },
      patams: {
        is_transaction: true,
        type_id: 4,
      },
    };
  },
  computed: {
    ...mapState({
      all_currencies: (state) => state.currency.all,
      user: (state) => state.auth.user,
      accounts: (state) => state.account.all,
    }),
    to_amount() {
      this.refreshNum;
      let factor = this.form.exchange_rate;
      let amount = this.form.from_amount;
      let a = amount / factor;
      this.form.to_amount = a;
      return a || null;
    },
  },
  mounted() {
    this.$store.dispatch("currency/index");
    this.$store.dispatch("account/index");
  },
  methods: {
    setToaccount(currency_id) {
      this.refreshNum++;
      console.log(currency_id);
      if (!this.user.active_accounts[0]) {
        this.$error_alert();
        return;
      }
      this.form.to_account_id = this.user.active_accounts.find((e) => {
        return e.currency_id == currency_id;
      }).id;

      let e = currency_id;
      this.form.exchange_rate = this.$newCalcSalePrice({ id: 1 }, { id: e });
    },
    // setToaccount(currency_id) {
    //   // console.log(currency_id);
    //   // if (!this.user.active_accounts[0]) {
    //   //   this.$error_alert();
    //   //   return;
    //   // }
    //   this.form.to_account_id = this.accounts.find((e) => {
    //     return e.currency_id == currency_id && e.type_id == 7;
    //   }).id;

    //   let e = currency_id;
    //   this.form.exchange_rate = this.$newCalcSalePrice({ id: 1 }, { id: e });
    //   this.refreshNum++;
    // },
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