<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark
        ><v-spacer></v-spacer>

        <v-spacer></v-spacer
      ></v-toolbar>
      <div>
        <v-form v-model="validated">
          <v-card-title> إغلاق أرصدة الصناديق</v-card-title>
          <v-card-text class="pa-6">
            <v-row align="center" dense>
              <v-col cols="12" sm="6" xs="12">
                <AccountAutocomplete
                  @change="(v) => get_boxes(v)"
                  required
                  return-object
                  :params="{ type_id: 4, per_page: 1000 }"
                  v-model="main_account"
                  text="إلي حساب الخزينة"
                  holder="إلي حساب الخزينة"
                ></AccountAutocomplete>
              </v-col>
              <v-col>
                <h4 v-if="main_account.id">
                  {{ $t("balance") }} : {{ main_account.balance | money }} (
                  {{ main_account.currency ? main_account.currency.name : "" }})
                </h4>
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
                    <th>{{ $t("registed balance") }}</th>
                    <th style="width: 130px">{{ $t("real balance") }}</th>
                    <th style="width: 130px">{{ $t("shortage/raise") }}</th>
                  </thead>
                  <tbody>
                    <tr
                      :key="key"
                      v-for="(user_account, key) in users_accounts"
                    >
                      <td>{{ user_account.user_name }}</td>
                      <td>{{ user_account.account_name }}</td>
                      <td>
                        {{ user_account.balance | money }}
                        {{ user_account.currency_name }}
                      </td>
                      <td>
                        <InputField
                          style="width: 130px"
                          hide-details
                          flat
                          rounded
                          filled
                          @input="
                            (v) =>
                              (user_account.different =
                                user_account.creditor - user_account.balance)
                          "
                          :outlined="false"
                          v-model.number="user_account.creditor"
                        />
                      </td>
                      <td>
                        <InputField
                          style="width: 130px"
                          hide-details
                          flat
                          rounded
                          filled
                          :outlined="false"
                          v-model.number="user_account.different"
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
                  ترحيل للخزينة</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </div>
    </v-card>
    <v-dialog width="500" v-model="dialog">
      <v-sheet class="pa-5">
        <h4>هل انت متأكد من الترحيل إلي الخزينة ؟</h4>
        <v-btn
          class="primary"
          @click="
            dialog = false;
            save();
          "
          >نعم</v-btn
        >
        <v-btn @click="dialog = false">لا</v-btn>
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
      entry: {
        date: this.$getDateTime(),
        status: 1,
        statement: "closing_fund",
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
      if (!this.checkIfCanSave()) return;
      this.$save(this.entry, "entry").then((res_entry) => {
        if (res_entry && res_entry.id) {
          this.$store.dispatch("entry_transaction/store", {
            entry_id: res_entry.id,
            debtor: this.transactions_total,
            ac_debtor: this.transactions_total,
            creditor: 0,
            ac_creditor: 0,
            currency_id: this.main_account.currency_id,
            account_id: this.main_account.id,
          });
          this.users_accounts.forEach((v) => {
            if (!(v.creditor >= 0)) return;
            this.$store.dispatch("entry_transaction/store", {
              entry_id: res_entry.id,
              debtor: 0,
              ac_debtor: 0,
              creditor: v.creditor,
              ac_creditor: v.creditor,
              account_id: v.on_account_id,
              currency_id: this.main_account.currency_id,
            });
          });
        }
      });
    },
    checkIfCanSave() {
      return true;
    },
  },
  computed: {
    ...mapState({
      dialog_item: (state) => state.state_dialog.item,
      user_accounts: (state) => state.user_account.all,
      users_all: (state) => state.user.all,
    }),
    transactions_total() {
      return this.users_accounts.reduce((c, n) => (n.creditor || 0) + c, 0);
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