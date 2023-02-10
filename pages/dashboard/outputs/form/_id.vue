<template>
  <div>
    <Card class="pb-3">
      <v-card-title>
        <Title title="outcoming receipt" />
      </v-card-title>
      <v-card-text>
        <v-form v-model="validated">
          <v-row dense class="mt-5 lg5-custome-row">
            <v-col cols="12" lg="4" xs="12" sm="6">
              <AutoComplete
                :readonly="showReadOnly"
                required
                :items="accounts_with_no_expenses"
                text="to account"
                holder="to account"
                v-model="form.from_account_id"
              />
            </v-col>
            <v-col cols="12" lg="4" xs="12" sm="6">
              <InputField
                type="number"
                :readonly="showReadOnly"
                required
                text="المبلغ المسحوب"
                holder="المبلغ المسحوب"
                v-model.number="form.from_amount"
              >
              </InputField>
            </v-col>

            <v-col cols="12" lg="4" xs="12" sm="6">
              <CurrencyAutoComplete
                :readonly="showReadOnly"
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
                :readonly="showReadOnly"
                required
                text="من حساب"
                holder="من حساب"
                v-model="form.to_account_id"
              />
            </v-col>

            <v-col cols="12" lg="4" xs="12" sm="6">
              <InputField
                type="number"
                :readonly="showReadOnly"
                required
                @input="(v) => this.refreshNum++"
                text="conversion factor to usd"
                holder="conversion factor to usd"
                v-model="form.exchange_rate"
              ></InputField>
            </v-col>
            <v-col cols="12" lg="4" xs="12" sm="6">
              <InputField
                type="number"
                :readonly="showReadOnly"
                disabledd
                text="amount in usd"
                holder="amount in usd"
                :value="to_amount"
              ></InputField>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" md="6" sm="12">
              <InputField
                :readonly="showReadOnly"
                text="statement"
                holder="statement"
                v-model="form.statement"
              ></InputField>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" lg="4" xs="12" sm="6">
              <v-checkbox
                :readonly="showReadOnly"
                v-model="form.is_expenses"
                label="إيصال مصروف ؟"
              >
              </v-checkbox>
            </v-col>
          </v-row>
          <v-expand-transition>
            <v-row dense v-show="form.is_expenses">
              <v-col cols="12" lg="4" xs="12" sm="6">
                <AutoComplete
                  :readonly="showReadOnly"
                  :items="expensess_accounts"
                  text="علي حساب مصروف"
                  holder="علي حساب مصروف"
                  v-model="form.expenses_account_id"
                >
                  <template v-slot:prepend-item>
                    <v-btn
                      depressed
                      block
                      @click="
                        $store.dispatch('setDialog', { name: 'AddBeneficiary' })
                      "
                    >
                      {{ $t("add beneficiary") }}
                    </v-btn>
                  </template>
                </AutoComplete>
              </v-col>
            </v-row>
          </v-expand-transition>
        </v-form>
        <v-row justify="center">
          <v-col v-if="!showReadOnly" cols="2">
            <v-btn
              @click="
                validated
                  ? $save(form, 'receipt', null, '/dashboard/outputs')
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
      showReadOnly: false,
      validated: false,
      refreshNum: 0,
      form: {
        is_expenses: false,
        status: 1,
        type: 2, // (type = 1) => input || (type =2) => output
      },
    };
  },
  computed: {
    ...mapState({
      all_currencies: (state) => state.currency.all,
      user: (state) => state.auth.user,
      one: (state) => state.receipt.one,
      accounts: (state) => state.account.all,
    }),
    accounts_with_no_expenses() {
      return this.accounts.filter((v) => v.type_id != 7);
    },
    expensess_accounts() {
      return this.accounts.filter((v) => v.type_id == 7);
    },
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
    if (!this.all_currencies[0]) {
      this.$store.dispatch("currency/index");
    }
    if (this.$route.query.show && this.$route.query.show == "true") {
      this.showReadOnly = true;
    }
  },
  methods: {
    setToaccount(currency_id) {
      if (!this.user.main_active_accounts[0]) {
        this.$error_alert();
        return;
      }
      this.form.to_account_id = (
        this.user.main_active_accounts.find((e) => {
          return e.currency_id == currency_id;
        }) || {}
      ).id;

      let e = currency_id;
      console.log(e);
      this.form.exchange_rate = this.$newCalcBuyPrice({ id: 1 }, { id: e });
    },
  },
  watch: {
    one(val) {
      if (val) {
        this.form = { ...val }; //JSON.parse(JSON.stringify(val));
      }
    },
  },
  created() {
    if (process.client) {
      if (this.$route.params.id) {
        this.$store.dispatch("receipt/show", this.$route.params.id);
      }
    }
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