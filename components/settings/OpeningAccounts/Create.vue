<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark
        ><v-spacer></v-spacer>

        <v-spacer></v-spacer
      ></v-toolbar>
      <div>
        <v-form v-model="validated">
          <v-card-title> رصيد افتتاحي للصناديق</v-card-title>
          <v-card-text class="pa-6">
            <v-row align="center" dense>
              <v-col cols="12" sm="6" xs="12">
                <AccountAutocomplete
                  @change="(v) => get_boxes(v)"
                  required
                  force_fetch
                  return-object
                  :params="{ type_id: 4, per_page: 1000 }"
                  v-model="main_account"
                  text="حساب الخزينة"
                  holder="حساب الخزينة"
                ></AccountAutocomplete>
              </v-col>
              <v-col cols="3">
                <h4 v-if="main_account.id">
                  {{ $t("balance") }} : {{ main_account.balance | money }} (
                  {{ main_account.currency ? main_account.currency.name : "" }})
                </h4>
              </v-col>
              <v-col cols="3">
                <InputField
                  required
                  text="exchange rate to usd"
                  holder="exchange rate to usd"
                  v-if="
                    main_account.currency_id && main_account.currency_id != 1
                  "
                  style="width: 200px"
                  v-model.number="exchange_rate"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <table
                  v-if="main_account.id"
                  width="100%"
                  class="text-center user_account_table"
                >
                  <thead>
                    <th>{{ $t("user name") }}</th>
                    <th>{{ $t("account name") }}</th>
                    <th>{{ $t("balance") }}</th>
                    <th style="width: 200px">{{ $t("amount to fund") }}</th>
                  </thead>
                  <tbody>
                    <tr v-for="user_account in users_accounts">
                      <td>{{ user_account.user_name }}</td>
                      <td>{{ user_account.account_name }}</td>
                      <td>
                        {{ user_account.balance | money }}
                        {{ user_account.currency_name }}
                      </td>
                      <td>
                        <InputField
                          style="width: 200px"
                          hide-details
                          flat
                          rounded
                          filled
                          :outlined="false"
                          v-model.number="user_account.debtor"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-col>
              <v-col cols="12"> </v-col>
            </v-row>
            <v-row>
              <v-col class="text-center">
                <v-btn
                  :disabled="!validated"
                  @click="dialog = true"
                  color="primary"
                  height="45"
                >
                  {{ $t("save") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </div>
    </v-card>
    <v-dialog width="500" v-model="dialog">
      <v-sheet class="pa-5">
        <h4>هل انت متأكد من الترحيل إلي الصناديق ؟</h4>
        <h5
          class="py-3"
          v-if="!checkIfCanSave"
          style="color: red; margin-bottom: 10px"
        >
          سيصبح رصيد الخزينة بالسالب!
        </h5>
        <v-btn
          :disabled="!checkIfCanSave"
          class="primary"
          @click="
            dialog = false;
            save();
          "
          style="margin-top: 10px"
          >نعم</v-btn
        >
        <v-btn
          @click="dialog = false"
          style="margin-top: 10px; margin-right: 5px"
          >لا</v-btn
        >
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      main_account: {},
      dialog: false,
      users_accounts: [],
      exchange_rate: 1,
      entry: {
        date: this.$getDateTime(),
        status: 1,
        statement: "opening_fund",
      },
    };
  },
  methods: {
    get_boxes(account) {
      this.$store.dispatch("user/index", {
        currency_id: account.currency_id,
        type_id: 3,
      });
    },
    save() {
      if (!this.checkIfCanSave) return;
      this.$save(this.entry, "entry").then((res_entry) => {
        if (res_entry && res_entry.id) {
          this.$store.dispatch("entry_transaction/store", {
            entry_id: res_entry.id,
            debtor: 0,
            ac_debtor: 0,
            currency_id: this.main_account.currency_id,
            creditor: this.transactions_total,
            ac_creditor: this.transactions_total / this.exchange_rate,
            account_id: this.main_account.id,
            exchange_rate: this.exchange_rate,
          });
          this.users_accounts.forEach((v) => {
            if (!(v.debtor >= 0)) return;
            this.$store.dispatch("entry_transaction/store", {
              entry_id: res_entry.id,
              debtor: v.debtor,
              ac_debtor: v.debtor / this.exchange_rate,
              currency_id: this.main_account.currency_id,
              creditor: 0,
              ac_creditor: 0,
              account_id: v.on_account_id,
              exchange_rate: this.exchange_rate,
            });
          });
        }
      });
    },
  },
  computed: {
    checkIfCanSave() {
      return this.transactions_total <= this.main_account.balance;
    },
    ...mapState({
      dialog_item: (state) => state.state_dialog.item,
      user_accounts: (state) => state.user_account.all,
      users_all: (state) => state.user.all,
    }),
    transactions_total() {
      return this.users_accounts.reduce((c, n) => (n.debtor || 0) + c, 0);
    },
    validated() {
      return this.transactions_total > 0 ? true : false;
    },
  },
  filters: {
    money(value) {
      if (value) {
        return parseFloat(value).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        });
      } else {
        return 0;
      }
    },
  },
  watch: {
    main_account(val) {
      if (val && val.id) {
        if (val.currency) {
          this.entry.ref_currency_id = val.currency.id;
        }
        if (val.currency_id != 1) {
          this.exchange_rate = (
            (this.$newCalcSalePrice({ id: 1 }, { id: val.currency_id }) * 1 +
              this.$newCalcBuyPrice({ id: 1 }, { id: val.currency_id }) * 1) /
            2
          ).toFixed(4);
        }
      }
    },
    users_all(val) {
      if (val) {
        this.users_accounts = JSON.parse(JSON.stringify(val));
      }
    },
  },
};
</script>

<style>
.user_account_table,
.user_account_table td,
.user_account_table th {
  padding: 2px;
  border: black solid 1px;
  border-collapse: collapse;
}
</style>