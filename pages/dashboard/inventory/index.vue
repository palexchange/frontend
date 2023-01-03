<template>
  <div>
    <v-row justify="end">
      <v-col cols="12" xs="12" sm="4" md="3">
        <v-btn @click="clearTrans" color="primary" block>
          {{ $t("empty") }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- class="lg5-custome-row" -->
    <v-row justify="center">
      <v-col
        v-for="(curr, index) in active_accounts"
        :key="curr.id"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card class="black-font">
          <!-- v-if="cards[index].balance > 0 || cards[index].balance < 0" -->
          <v-row no-gutters class="black-font">
            <v-col
              style="color: #000 !important"
              cols="12"
              class="text-center justify-center d-flex pb-0 pt-2 black-font"
            >
              <div>
                <v-img width="30" height="30" src="/entriesBoxIcon.png" />
              </div>

              <div class="font-wigth-black">{{ curr.name }}</div>

              <!-- <InputField class="pt-3 pl-3 pr-3"></InputField> -->
            </v-col>
            <v-col class="text-center pb-0 black-font" cols="12">
              <div
                class="black-font"
                style="color: rgba(0, 0, 0); font-size: 16px"
              >
                رصيد الصندوق :
                {{ cards[index].net_balance | money }}
              </div>
              <div
                class="black-font"
                style="color: rgba(0, 0, 0); font-size: 16px"
              >
                مسحوبات ومقبوضات:
                {{ cards[index].inputs_balance | money }}
              </div>
              <div
                class="black-font"
                style="color: rgba(0, 0, 0); font-size: 16px"
              >
                الرصيد للجرد :
                {{ (cards[index].inventory_balance * 1) | money }}
              </div>
            </v-col>
            <v-col class="text-center pb-0 black-font" cols="12">
              <div class="pa-3 black-font">
                <input
                  :disabled="
                    !cards[index].balance > 0 && trans[index].length == 0
                  "
                  @keydown.enter="(v) => addTrans(v.target.value, index)"
                  @keydown.space="
                    (v) =>
                      addTrans(
                        parseFloat(cards[index].inventory_balance),
                        index
                      )
                  "
                  type="number"
                  class="border"
                  :value="vall"
                />
              </div>
            </v-col>
          </v-row>
          <v-card-text class="pa-0 black-font">
            <v-row
              v-for="(t, i) in trans[index]"
              :key="i"
              justify="start"
              no-gutters
              class="black-font"
            >
              <!-- <v-divider></v-divider> -->
              <v-col
                class="pt-2 pb-1"
                style="border-top: solid grey 1px; width: 100%"
              >
                &nbsp; {{ t | money }}
              </v-col>
              <v-col
                class="text-left pt-2 pb-1 pl-2"
                style="border-top: solid grey 1px; width: 100%"
              >
                <v-btn c icon @click="removeRow(t, index, i)">
                  <v-icon> fas fa-times </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card
            :style="{
              'background-color':
                cards[index].inventory_balance == 0
                  ? '#83b97b'
                  : 'rgba(255,1,1 , 0.5)',
            }"
            class="white--text mt-1 black-font justify-center"
            block
            height="140"
          >
            <v-card-title
              v-if="cards[index].inventory_balance == 0"
              class="justify-center"
            >
              {{ $t("balanced") }}
            </v-card-title>
            <div v-else class="text-center pt-2">
              {{ $t("unbalanced") }}
              <br />
              <p
                style="font-size: small"
                v-if="cards[index].inventory_balance > 0"
              >
                {{ $t("shortage in real balance") }}
              </p>
              <p style="font-size: small" v-else>
                {{ $t("excess in real balance") }}
              </p>
            </div>
            <!-- <div class="text-center">
              <v-btn
                :disabled="
                  cards[index].balance > 0 &&
                  cards[index].inputs_balance * 1 < 0
                "
                @click="closeFromInputs(index, curr)"
                height="25"
              >
                {{ $t("جبر العجز من المقبوضات") }}
              </v-btn>
            </div> -->
            <div class="text-center">
              <v-btn
                v-if="cards[index].currency_id != 2"
                :disabled="
                  !cards[index].balance > 0 && trans[index].length == 0
                "
                @click.once="
                  cards[index].inventory_balance == 0
                    ? closeInventory(index, curr)
                    : transferToShekeleBox(cards[index])
                "
                height="25"
              >
                {{
                  cards[index].inventory_balance == 0
                    ? $t("إعتماد الجرد وإغلاق الصندوق")
                    : $t("ترحيل لصندوق الشيكل")
                }}
              </v-btn>
              <v-btn
                @click.once="
                  cards[index].inventory_balance == 0
                    ? closeInventory(index, curr)
                    : closeToProfitAndLose(cards[index])
                "
                v-else
                height="25"
              >
                {{
                  cards[index].inventory_balance == 0
                    ? $t("إعتماد الجرد وإغلاق الصندوق")
                    : $t("ترحيل لصندوق العجز و الزيادة")
                }}
              </v-btn>
              <!-- <v-btn
              v-show="(cards[index].inventory_balance != 0)"
                :disabled="
                  !cards[index].balance > 0 && trans[index].length == 0
                "
                @click="closeInventory(index, curr)"
                height="25"
              >
                {{ $t("ترحيل لصندوق الشيكل") }}
              </v-btn> -->
            </div>
          </v-card>
          <!-- <v-card
            v-else
            depressed
            style="background-color: #ff7e7e"
            class="white--text mt-1 black-font justify-center"
            block
            height="60"
            
          >
          <v-card-title class="justify-center">
           {{ $t("unbalanced") }}
          
            <div style="font-size: small" v-if="cards[index].balance > 0">({{ $t("excess in box") }})</div>
            <div style="font-size: small" v-else>({{ $t("shortage in box") }})</div>
          </v-card-title>
          </v-card> -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test-killua",
  data() {
    return {
      inputs_accounts: [],
      item: {
        convertToUSD: null,
      },
      trans: [],
      cards: [],
      vall: null,
      entry: {
        status: 1,
        statement: "إغلاق صندوق",
        document_sub_type: 3,
        date: this.$getDateTime(),
      },
      report_data: {
        has_headers: true,
        type: "Accounting",
        sub_type: "currencyCredit",
      },
    };
  },
  methods: {
    closeToProfitAndLose(acc) {
      const diff = acc.inventory_balance;
      if (diff == 0) return;
      const exchange_rate = this.stocks.find(
        (v) => v.currency_id == acc.currency_id
      ).mid;
      if (diff < 0) {
        this.$save(
          {
            status: 1,
            statement: "ترصيد عجز ",
            document_sub_type: 3,
            date: this.$getDateTime(),
          },
          "entry"
        ).then((entry) => {
          this.$store.dispatch("entry_transaction/store", {
            entry_id: entry.id,
            debtor: Math.abs(diff),
            ac_debtor: Math.abs(diff) / exchange_rate,
            creditor: 0,
            ac_creditor: 0,
            exchange_rate: exchange_rate,
            currency_id: acc.currency_id,
            account_id: acc.id,
          });
          this.$store.dispatch("entry_transaction/store", {
            entry_id: entry.id,
            debtor: 0,
            ac_debtor: 0,
            creditor: Math.abs(diff),
            ac_creditor: Math.abs(diff) / exchange_rate,
            exchange_rate: exchange_rate,
            currency_id: acc.currency_id,
            account_id: 33, // ربحية عجز و زيادة
          });
        });
      }
      if (diff > 0) {
        this.$save(
          {
            status: 1,
            statement: "ترصيد زيادة ",
            document_sub_type: 3,
            date: this.$getDateTime(),
          },
          "entry"
        ).then((entry) => {
          this.$store.dispatch("entry_transaction/store", {
            entry_id: entry.id,
            debtor: diff,
            ac_debtor: diff / exchange_rate,
            creditor: 0,
            ac_creditor: 0,
            exchange_rate: exchange_rate,
            currency_id: acc.currency_id,
            account_id: 33,
          });
          this.$store.dispatch("entry_transaction/store", {
            entry_id: entry.id,
            debtor: 0,
            ac_debtor: 0,
            creditor: diff,
            ac_creditor: diff / exchange_rate,
            exchange_rate: exchange_rate,
            currency_id: acc.currency_id,
            account_id: acc.id,
          });
        });
      }
    },
    // closeFromInputs(index, acc) {
    //   if (acc.balance < 0) {
    //     let amount = acc.balance * -1;
    //     let exchange_rate = this.stocks.find(
    //       (v) => v.currency_id == acc.currency_id
    //     ).mid;
    //     this.$save(
    //       {
    //         status: 1,
    //         statement: "جبر عجز من مقبوضات",
    //         document_sub_type: 3,
    //         date: this.$getDateTime(),
    //       },
    //       "entry"
    //     ).then((res_entry) => {
    //       if (res_entry && res_entry.id) {
    //         this.$store.dispatch("entry_transaction/store", {
    //           entry_id: res_entry.id,
    //           debtor: amount,
    //           ac_debtor: amount / exchange_rate,
    //           creditor: 0,
    //           ac_creditor: 0,
    //           exchange_rate: exchange_rate,
    //           currency_id: acc.currency_id,
    //           account_id: acc.id,
    //         });
    //         this.$store
    //           .dispatch("entry_transaction/store", {
    //             entry_id: res_entry.id,
    //             debtor: 0,
    //             ac_debtor: 0,
    //             creditor: amount,
    //             ac_creditor: amount / exchange_rate,
    //             exchange_rate: exchange_rate,
    //             currency_id: acc.currency_id,
    //             account_id: acc.input_acc_id,
    //           })
    //           .then(() => {
    //             this.$auth.fetchUser();
    //           });
    //       }
    //     });
    //   }
    // },
    closeInventory(index, acc) {
      let total = this.trans[index].reduce((c, n) => {
        return c + parseFloat(n);
      }, 0);
      if (!total > 0) return;
      let main_box = this.main_boxes.find(
        (v) => v.currency_id == acc.currency_id && v.type_id == 4
      );
      let diff = acc.balance - total;
      if (!this.trans[index]) return;

      let exchange_rate = this.stocks.find(
        (v) => v.currency_id == acc.currency_id
      ).mid;
      if (total == 0) return;

      this.$save(this.entry, "entry").then((res_entry) => {
        if (res_entry && res_entry.id) {
          this.$store.dispatch("entry_transaction/store", {
            entry_id: res_entry.id,
            debtor: total,
            ac_debtor: total / exchange_rate,
            creditor: 0,
            ac_creditor: 0,
            exchange_rate: exchange_rate,
            currency_id: acc.currency_id,
            account_id: main_box.id,
          });
          this.$store.dispatch("entry_transaction/store", {
            entry_id: res_entry.id,
            debtor: 0,
            ac_debtor: 0,
            creditor: total,
            ac_creditor: total / exchange_rate,
            exchange_rate: exchange_rate,
            currency_id: acc.currency_id,
            account_id: acc.id,
          });
        }
        // this.$auth.fetchUser();
      });
    },
    addTrans(val, index) {
      if (val.length == 0 || parseFloat(val) == 0) return;
      this.trans[index].push(parseFloat(val));
      this.cards[index].amount = null;
      this.cards[index].inventory_balance -= parseFloat(val);
    },
    clearTrans() {
      for (let arr of this.trans) {
        while (arr.length > 0) arr.pop();
      }
      this.cards.forEach((e, index) => {
        e.inventory_balance = this.active_accounts[index].inventory_balance;
      });
    },
    removeRow(val, index, i) {
      this.trans[index].splice(i, 1);
      this.cards[index].inventory_balance += parseFloat(val);
    },
    reset(val) {
      if (val.length > 0) {
        val.forEach((e) => {
          this.trans.push([]);
        });
        if (this.active_accounts[0] && !this.cards[0]) {
          this.active_accounts.forEach((e) => {
            let inventory_balance = e.net_balance * 1 + e.inputs_balance * 1;
            this.cards.push({ ...e, inventory_balance });
          });
        }
      }
    },
    transferToShekeleBox(acc) {
      if (acc.inventory_balance == 0) return;
      let shakel_box = this.main_active_accounts.find(
        (el) => el.currency_id == 2
      );
      const negative = acc.inventory_balance < 0 ? true : false;
      const amount = Math.abs(acc.inventory_balance);
      let usd_to_nis_exchange_rate = this.stocks.find(
        (v) => v.currency_id == 2
      ).mid;
      let usd_to_acc_crr_exchange_rate = this.stocks.find(
        (v) => v.currency_id == acc.currency_id
      ).mid;
      const acc_to_nis_exchange_rate = parseFloat(
        (this.$newCalcBuyPrice({ id: acc.currency_id }, { id: 2 }) * 1 +
          this.$newCalcSalePrice({ id: acc.currency_id }, { id: 2 }) * 1) /
          2
      );
      this.$save(
        {
          status: 1,
          statement: "عجز وارباح للشيكل",
          document_sub_type: 6,
          date: this.$getDateTime(),
        },
        "entry"
      ).then((res_entry) => {
        if (res_entry && res_entry.id) {
          this.$store
            .dispatch("entry_transaction/store", {
              entry_id: res_entry.id,
              transaction_type: !negative ? 1 : 0,
              account_id: shakel_box.id,
              debtor: !negative ? amount * acc_to_nis_exchange_rate : 0,
              ac_debtor: !negative
                ? amount *
                  acc_to_nis_exchange_rate *
                  (1 / usd_to_nis_exchange_rate)
                : 0,
              creditor: negative ? amount * acc_to_nis_exchange_rate : 0,
              ac_creditor: negative
                ? amount *
                  acc_to_nis_exchange_rate *
                  (1 / usd_to_nis_exchange_rate)
                : 0,
              exchange_rate: 1 / usd_to_nis_exchange_rate,
              currency_id: 2,
            })
            .then(() => {
              this.$store
                .dispatch("entry_transaction/store", {
                  entry_id: res_entry.id,
                  account_id: acc.id,
                  transaction_type: negative ? 1 : 0,
                  debtor: negative ? amount : 0,
                  ac_debtor: negative
                    ? amount * (1 / usd_to_acc_crr_exchange_rate)
                    : 0,
                  creditor: !negative ? amount : 0,
                  ac_creditor: !negative
                    ? amount * (1 / usd_to_acc_crr_exchange_rate)
                    : 0,
                  exchange_rate: 1 / usd_to_acc_crr_exchange_rate,
                  currency_id: acc.currency_id,
                })
                .then(() => {
                  this.$auth.fetchUser();
                });
            });
        }
      });
    },
  },
  computed: {
    ...mapState({
      active_accounts: (state) =>
        JSON.parse(JSON.stringify(state.auth.user.active_accounts)),
      stocks: (state) => state.stock.all,
      main_boxes: (state) => state.account.all,
      main_active_accounts: (state) => state.auth.user.main_active_accounts,

      // report: (state) => state.report.all,
    }),
  },
  mounted() {
    // this.$auth.fetchUser();
  },
  created() {
    // this.$store.dispatch("currency/index");
    // this.$auth.fetchUser();
    this.$store.dispatch("account/index", { is_transaction: true });
  },
  filters: {
    money(value) {
      if (value == 0) return 0.0;
      if (value) {
        value = value * 1;
        return value.toFixed(2);
        // return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
      }
    },
  },
  watch: {
    main_boxes(val) {
      this.inputs_accounts = val.filter((f) => f.type_id == 7);
    },
    inputs_accounts(val) {
      if (val[0]) {
        this.active_accounts.forEach((el) => {
          let acc =
            this.inputs_accounts.find((i) => i.currency_id == el.currency_id) ||
            {};
          el.inputs_balance = acc.inputs_balance;
          el.input_acc_id = acc.id;
        });
      }
    },
    active_accounts: {
      handler(val) {
        this.reset(val);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
.border {
  border: 2px solid #d6d6d6;
  border-radius: 6px;
}
.black-font {
  font-size: large;
  /* font-weight: bold !important; */
  color: #000 !important;
}

@media (min-width: 1264px) {
  .lg5-custome-row > div {
    width: 20% !important;
    max-width: 20% !important;
    flex-basis: 20% !important;
  }
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>