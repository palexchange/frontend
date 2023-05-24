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
    <v-row :key="refresh_key" justify="center">
      <v-col
        v-for="(curr, index) in active_accounts"
        :key="curr.id"
        cols="12"
        sm="6"
        md="3"
        v-show="curr.inventory_balance > 0 || trans[index].length > 0"
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
                {{ curr.net_balance | money }}
              </div>
              <div
                class="black-font"
                style="color: rgba(0, 0, 0); font-size: 16px"
              >
                مسحوبات ومقبوضات:
                {{ curr.inputs_balance | money }}
              </div>
              <div
                class="black-font"
                style="color: rgba(0, 0, 0); font-size: 16px"
              >
                الرصيد للجرد :
                {{ (curr.inventory_balance * 1) | money }}
              </div>
            </v-col>
            <v-col class="text-center pb-0 black-font" cols="12">
              <div class="pa-3 black-font">
                <input
                  :disabled="!curr.balance > 0 && curr.length == 0"
                  @keydown.enter="(v) => addTrans(v.target.value, index)"
                  @keydown.space="
                    (v) => addTrans(parseFloat(curr.inventory_balance), index)
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
                curr.inventory_balance == 0 ? '#83b97b' : 'rgba(255,1,1 , 0.5)',
            }"
            class="white--text mt-1 black-font justify-center"
            block
            height="140"
          >
            <v-card-title
              v-if="curr.inventory_balance == 0"
              class="justify-center"
            >
              {{ $t("balanced") }}
            </v-card-title>
            <div v-else class="text-center pt-2">
              {{ $t("unbalanced") }}
              <br />
              <p style="font-size: small" v-if="curr.inventory_balance > 0">
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
                v-if="curr.currency_id != 2"
                :disabled="!curr.balance > 0 && trans[index].length == 0"
                @click="
                  dialog = true;
                  global_inventory_balance = curr.inventory_balance == 0;
                  global_inventory_index = index;
                  global_inventory_curr = curr;
                "
                height="25"
              >
                {{
                  curr.inventory_balance == 0
                    ? $t("إعتماد الجرد وإغلاق الصندوق")
                    : $t("ترحيل لصندوق الشيكل")
                }}
              </v-btn>
              <v-btn
                @click.once="
                  curr.inventory_balance == 0
                    ? closeInventory(index, curr)
                    : closeToProfitAndLose(curr)
                "
                v-else
                height="25"
              >
                {{
                  curr.inventory_balance == 0
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
    <v-dialog width="500" v-model="dialog">
      <v-sheet class="pa-5">
        <h4>هل انت متأكد من الحفظ ؟</h4>
        <v-btn
          class="primary"
          @click="
            dialog = false;
            global_inventory_balance
              ? closeInventory(global_inventory_index, global_inventory_curr)
              : transferToShekeleBox(active_accounts[global_inventory_index]);
          "
          >نعم</v-btn
        >
        <v-btn @click="dialog = false">لا</v-btn>
      </v-sheet>
    </v-dialog>
    <Excel :save_clicked="times_clicked" @new_item="handleExcel" />
    <v-btn
      :key="numberToReRender"
      @click.prevent.once="save"
      height="50"
      class="text-center"
      color="primary"
    >
      {{ $t("execute process") }}
      <v-icon dence>fas fa-solid fa-check</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test-killua",
  data() {
    return {
      trans: [],

      items: [],
      times_clicked: 0,
      numberToReRender: 0,
      exchange: {},

      refresh_key: 1,
      inputs_accounts: [],
      inventory_balance: null,
      global_inventory_balance: null,
      global_inventory_index: null,
      global_inventory_curr: null,
      dialog: false,
      item: {
        convertToUSD: null,
      },

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
    get_usd_amount(item) {
      let mid = this.all_stocks.find((w) => w.currency_id == item.id).close_mid;
      return item.id != 4 ? item.amount / mid : item.amount * mid;
    },
    handleExcel(row_items) {
      console.log(row_items);
      let items = [];
      let last_items = [];
      row_items.forEach((item) => {
        let holder = [];
        let in_ = false;
        for (const key of Object.keys(item)) {
          if (item[key].amount != 0) {
            in_ = true;
            const amount = item[key].amount;
            if (amount < 0) {
              holder.push({ ...item[key], to: true, amount: Math.abs(amount) });
            } else {
              holder.push({ ...item[key], from: true });
            }
          }
        }
        if (in_) items.push(holder);
      });

      if (items.length > 0) {
        items.forEach((item) => {
          let to_item = item.find((e) => e.to) || {};
          let from_item = item.find((e) => e.from) || {};
          let to_exchange_rate = to_item.amount / from_item.amount || 0;
          let one_row_items = item.map((i) => {
            let mid = this.all_stocks.find(
              (w) => w.currency_id == i.id
            ).close_mid;
            return {
              ...i,
              exchange_rate: to_exchange_rate,
              usd_factor: mid,
              usd_amount: this.get_usd_amount(i),
              mid_usd_amount: i.amount / mid,
            };
          });
          last_items.push(one_row_items);
        });
      }
      console.log("last_items");
      console.log("last_items");
      console.log(last_items);
      this.items = last_items.flat();
      console.log("this.items");
      console.log(this.items);
    },
    addnumberToReRender() {
      setTimeout(() => {
        this.numberToReRender += 1;
      }, 5000);
    },
    async save() {
      this.addnumberToReRender();
      if (this.exchange_profit < 0) {
        this.$swal
          .fire({
            title: this.$t("warning"),
            text: this.$t("cant create exchnage in minus"),
            icon: "warning",
            confirmButtonText: this.$t("continue"),
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: this.$t("back"),
            confirmButtonColor: "#41b882",
          })
          .then((data) => {
            if (data.isConfirmed) {
              this.submit_save();
            }
          });
      } else {
        this.submit_save();
      }
    },
    submit_save() {
      this.prepare_exchange().then(() => {
        this.times_clicked++;
        this.$store.dispatch("exchange/store", this.exchange).then(() => {
          this.items = [];
          this.exchange = {};
          this.keyNum = this.keyNum + 1;
          this.exchange.started_at = this.$getDateTime();
          this.$auth.fetchUser();
        });
      });
    },
    prepare_exchange() {
      return new Promise((resolve, reject) => {
        this.exchange.date = this.$getDateTime();
        this.exchange.profit = this.exchange_profit;
        this.exchange.status = 1;
        let trimed_and_modified_items = this.items
          .filter((el) => el.exchange_rate >= 0 && el.amount)
          .map((e) => {
            return {
              currency_id: e.id,
              amount: e.amount,
              exchange_rate: e.exchange_rate,
              usd_factor: e.usd_factor,
              type: e.from ? 1 : 2,
            };
          });
        this.exchange.items = trimed_and_modified_items;
        console.log(this.exchange);
        resolve("SUCCESS");
      });
    },
    closeToProfitAndLose(acc) {
      const diff = acc.inventory_balance;
      if (diff == 0) return;
      const exchange_rate = this.stocks.find(
        (v) => v.currency_id == acc.currency_id
      ).close_mid;
      if (diff < 0) {
        this.$save(
          {
            silent: true,
            no_reload: true,
            status: 1,
            statement: "ترصيد عجز ",
            document_sub_type: 6,
            date: this.$getDateTime(),
          },
          "entry"
        ).then((entry) => {
          this.$store.dispatch("entry_transaction/store", {
            entry_id: entry.id,
            transaction_type: 14,
            silent: true,
            debtor: Math.abs(diff),
            ac_debtor: Math.abs(diff) / exchange_rate,
            creditor: 0,
            ac_creditor: 0,
            exchange_rate: exchange_rate,
            currency_id: acc.currency_id,
            account_id: acc.id,
          });
          this.$store
            .dispatch("entry_transaction/store", {
              entry_id: entry.id,
              transaction_type: 0,
              debtor: 0,
              ac_debtor: 0,
              creditor: Math.abs(diff),
              ac_creditor: Math.abs(diff) / exchange_rate,
              exchange_rate: exchange_rate,
              currency_id: acc.currency_id,
              account_id: 33, // ربحية عجز و زيادة
            })
            .then(() => {
              this.clearTrans();
              this.$auth.fetchUser().then(() => {
                this.refresh_key++;
              });
            });
        });
      } else if (diff > 0) {
        this.$save(
          {
            no_reload: true,
            silent: true,
            status: 1,
            statement: "ترصيد زيادة ",
            document_sub_type: 6,
            date: this.$getDateTime(),
          },
          "entry"
        ).then((entry) => {
          this.$store.dispatch("entry_transaction/store", {
            entry_id: entry.id,
            silent: true,
            debtor: diff,
            ac_debtor: diff / exchange_rate,
            creditor: 0,
            ac_creditor: 0,
            exchange_rate: exchange_rate,
            currency_id: acc.currency_id,
            account_id: 33,
          });
          this.$store
            .dispatch("entry_transaction/store", {
              entry_id: entry.id,
              debtor: 0,
              ac_debtor: 0,
              creditor: diff,
              ac_creditor: diff / exchange_rate,
              exchange_rate: exchange_rate,
              currency_id: acc.currency_id,
              account_id: acc.id,
            })
            .then(() => {
              this.clearTrans();
              this.$auth.fetchUser().then(() => {
                this.refresh_key++;
              });
            });
        });
      }
    },
    closeInventory(index, acc) {
      let total = this.trans[index].reduce((c, n) => {
        return c + parseFloat(n);
      }, 0);
      if (!total > 0) return;
      let main_box = this.main_boxes.find(
        (v) =>
          v.currency_id == acc.currency_id &&
          v.type_id == 4 &&
          v.is_transaction == true
      );
      let diff = acc.balance - total;
      if (!this.trans[index]) return;

      let exchange_rate = this.stocks.find(
        (v) => v.currency_id == acc.currency_id
      ).close_mid;
      if (total == 0) return;

      this.$save(
        { ...this.entry, silent: true, no_reload: true },
        "entry"
      ).then((res_entry) => {
        if (res_entry && res_entry.id) {
          console.log("start");
          this.$store.dispatch("entry_transaction/store", {
            account_id: main_box.id,
            transaction_type: 1,
            entry_id: res_entry.id,
            silent: true,
            debtor: total,
            ac_debtor: total / exchange_rate,
            creditor: 0,
            ac_creditor: 0,
            exchange_rate: exchange_rate,
            currency_id: acc.currency_id,
          });
          console.log("mid");
          this.$store
            .dispatch("entry_transaction/store", {
              account_id: acc.id,
              transaction_type: 14,
              entry_id: res_entry.id,
              debtor: 0,
              ac_debtor: 0,
              creditor: total,
              ac_creditor: total / exchange_rate,
              exchange_rate: exchange_rate,
              currency_id: acc.currency_id,
            })

            .then(() => {
              console.log("last");
              this.clearTrans();

              this.$auth.fetchUser().then(() => {
                this.refresh_key++;
              });
            });
          console.log("last");
        }
      });
    },
    addTrans(val, index) {
      if (val.length == 0 || parseFloat(val) == 0) return;
      this.trans[index].push(parseFloat(val));
      this.active_accounts[index].amount = null;
      this.active_accounts[index].inventory_balance -= parseFloat(val);
    },
    clearTrans() {
      for (let arr of this.trans) {
        while (arr.length > 0) arr.pop();
      }
      this.active_accounts.forEach((e, index) => {
        e.inventory_balance = this.active_accounts[index].inventory_balance;
      });
    },
    removeRow(val, index, i) {
      this.trans[index].splice(i, 1);
      this.active_accounts[index].inventory_balance += parseFloat(val);
    },
    reset(val) {
      if (val.length > 0) {
        val.forEach((e) => {
          this.trans.push([]);
        });
        if (this.active_accounts[0] && !this.active_accounts[0]) {
          this.active_accounts.forEach((e) => {
            // let inventory_balance = e.net_balance * 1 + e.inputs_balance * 1;
            this.active_accounts.push({ ...e });
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
      ).close_mid;
      let usd_to_acc_crr_exchange_rate = this.stocks.find(
        (v) => v.currency_id == acc.currency_id
      ).close_mid;
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
          silent: true,
          no_reload: true,
          date: this.$getDateTime(),
        },
        "entry"
      )
        .then((res_entry) => {
          if (res_entry && res_entry.id) {
            this.$store.dispatch("entry_transaction/store", {
              entry_id: res_entry.id,
              silent: true,
              transaction_type: 13,
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
            });
            this.$store.dispatch("entry_transaction/store", {
              entry_id: res_entry.id,
              account_id: acc.id,
              transaction_type: 12,
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
            });
          }
        })
        .then(() => {
          this.clearTrans();

          this.$auth.fetchUser().then(() => {
            this.$nextTick(() => {
              this.reset(this.active_accounts);
              this.refresh_key++;
            });
            this.refresh_key++;
          });
        });
    },
  },
  computed: {
    exchange_profit() {
      let items = this.items;
      let all_to = items
        .filter((item) => item.to)
        .map((i) => i.usd_amount)
        .reduce((a, b) => a * 1 + b * 1, 0);
      let all_froms = items
        .filter((item) => item.from)
        .map((i) => i.usd_amount)
        .reduce((a, b) => a * 1 + b * 1, 0);

      return (all_froms - all_to || 0).toFixed(3);
      let to = items.find((item) => item.to) || {};
      let from = items.find((item) => item.from) || {};
      return (from.usd_amount - to.usd_amount || 0).toFixed(3);
    },
    ...mapState({
      active_accounts: (state) =>
        JSON.parse(JSON.stringify(state.auth.user.active_accounts)),
      user: (state) => state.auth.user.active_accounts,
      stocks: (state) => state.stock.all,
      main_boxes: (state) => state.account.all,
      main_active_accounts: (state) => state.auth.user.main_active_accounts,

      pressed_key: (state) => state.last_key_listener_value,
      all_currencies: (state) => state.currency.all,
      all_stocks: (state) => state.stock.all,
      user: (state) => state.auth.user || {},

      // report: (state) => state.report.all,
    }),
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
        let amount = value * 1;
        return parseFloat(amount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        });
        // return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
      }
    },
  },
  watch: {
    main_boxes(val) {
      this.inputs_accounts = val.filter((f) => f.type_id == 7);
    },
    // inputs_accounts(val) {
    //   if (val[0]) {
    //     this.active_accounts.forEach((el) => {
    //       let acc =
    //         this.inputs_accounts.find((i) => i.currency_id == el.currency_id) ||
    //         {};
    //       el.inputs_balance = acc.inputs_balance;
    //       el.input_acc_id = acc.id;
    //     });
    //   }
    // },
    active_accounts: {
      handler(val) {
        this.reset(val);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.exchange.started_at = this.$getDateTime();
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
