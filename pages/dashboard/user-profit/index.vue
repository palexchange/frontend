<template>
  <Card>
    <v-card-text>
      <v-row
        
        class="pt-5"
        dense
      >
        <v-col class="text-center"> <h3>رصيد اول اليوم</h3> </v-col>
      </v-row>
      <v-row  dense>
          <!-- v-show="acc.start_net_balance * 1 + acc.start_price * 1 != 0" -->
        <v-col
          :key="i"
          v-for="(acc, i) in start_active_accounts"
        >
          <v-row dense class="flex-column">
            <v-col>
              <v-card class="text-center">
                <v-card-title style="font-size: 14px" class="justify-center">
                  {{ acc.name }}
                </v-card-title>
                <v-card-subtitle>
                  {{ $t("balance") + ": " }}
                  {{
                    (acc.start_net_balance * 1 + acc.start_price * 1) | money
                  }}
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="py-5 text-center">
                <v-badge class="mx-2" dot></v-badge>
                {{
                  $t("opening") + ": " + getMorningExchangeRate(acc.currency_id)
                }}
              </v-card>
            </v-col>
            <v-col>
              <v-card class="py-5 text-center">
                <v-badge class="mx-2" dot></v-badge>
                {{ $t("in USD") + ": " }}

                {{ totals[i] | money }}
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="pt-5" dense>
        <v-col align-self="center" class="text-center">
          <h3>رصيد اخر اليوم</h3></v-col
        >
      </v-row>
      <v-row dense>
          <!-- v-show="acc.net_balance * 1 + acc.price * 1 != 0" -->
        <v-col
          :key="i"
          v-for="(acc, i) in active_accounts"
        >
          <v-row dense class="flex-column">
            <v-col>
              <v-card class="text-center">
                <v-card-title style="font-size: 14px" class="justify-center">
                  {{ acc.name }}
                </v-card-title>
                <v-card-subtitle>
                  {{ $t("balance") + ": " }}
                  {{ (acc.net_balance * 1 + acc.price * 1) | money }}
                </v-card-subtitle>
              </v-card>
            </v-col>

            <v-col>
              <v-card class="py-5 text-center">
                <v-badge color="blue" class="mx-2" dot></v-badge>
                {{
                  $t("closing") + ": " + getNightExchangeRate(acc.currency_id)
                }}
              </v-card>
            </v-col>
            <v-col>
              <v-card class="py-5 text-center">
                <v-badge color="blue" class="mx-2" dot></v-badge>
                {{ $t("in USD") + ": " }}
                {{ totals2[i] | money }}
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-row class="shadowing">
            <v-col>
              <h3>
                {{ $t("مجموع الصناديق بمعامل التحويل الافتتاحي") }}
              </h3>
            </v-col>
            <v-col>
              <h2>
                {{ (funds_total || funds_total2) | money }}
              </h2>
            </v-col>
          </v-row>
          <v-row class="shadowing">
            <v-col
              ><h3>
                {{ $t("مجموع الصناديق بمعامل التحويل المسائي") }}
              </h3></v-col
            >
            <v-col>
              <h2>
                {{ funds_total2 | money }}
              </h2></v-col
            >
          </v-row>

          <!-- <v-row class="shadowing">
            <v-col
              ><h3>
                {{ $t("exchange rate profit") }}
              </h3></v-col
            >
             <v-col>
              <h2>
                {{ (funds_total2 - funds_total) | money }}
              </h2></v-col
            > 
          </v-row> -->
          <!-- <v-row class="shadowing">
            <v-col
              ><h3>
                {{ exchange_profit_acc.name }}
              </h3></v-col
            >
            <v-col>
              <h2>
                {{ exchange_profit_acc.balance }}
              </h2></v-col
            >
          </v-row> -->
          <!-- <v-row class="shadowing">
            <v-col
              ><h3>
                {{ transfer_profit_acc.name }}
              </h3></v-col
            >
            <v-col>
              <h2>
                {{ transfer_profit_acc.balance }}
              </h2></v-col
            >
          </v-row> -->
          <!-- <v-row class="shadowing">
            <v-col
              ><h3>
                {{ profit_and_losse_acc.name }}
              </h3></v-col
            >
            <v-col>
              <h2>
                {{ profit_and_losse_acc.balance }}
              </h2></v-col
            >
          </v-row> -->
          <v-row class="shadowing">
            <v-col
              ><h3>
                {{ $t("profit total") }}
              </h3></v-col
            >
            <v-col>
              <h2>
                {{
                  (this.funds_total2 - (this.funds_total || this.funds_total2)).toFixed(2)
                }}
                <!-- +
                    (funds_total2 - funds_total) -->
              </h2></v-col
            >
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center">
              <v-btn class="primary" @click="save"> {{ $t("save") }} </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </Card>
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      validated: true,
      totals: [],
      totals2: [],
      accounts: [],
      old_transactions: [],
      new_transactions: [],
      report_data: {
        has_headers: true,
        type: "Accounting",
        sub_type: "accountStatementReport",
      },
      //   types: [
      //     { id: "public", name: this.$t("public") },
      //     { id: "detaild", name: this.$t("detaild") },
      //   ],
    };
  },
  mounted() {
    // this.$auth.fetchUser();
    this.$store.dispatch("account/index", { is_transaction: true });
    // this.$store.dispatch("stock_transaction/index", {
    //   per_page: 14,
    // });
  },
  methods: {
    save() {
      let item = {};
      item.value = this.accounts.map((v) => {
        return {
          name: v.name,
          balance: v.net_balance,
          open_exchange_rate: this.getMorningExchangeRate(v.currency_id),
          close_exchange_rate: this.getNightExchangeRate(v.currency_id),
        };
      });

      let extra_headers = [
        {
          name: "مجموع الخزائن بمعامل التحويل الافتتاحي",
          balance: this.funds_total,
        },
        {
          name: "مجموع الخزائن بمعامل التحويل المسائي",
          balance: this.funds_total2,
        },
        {
          name: " ربحية فرق العملة",
          balance: this.funds_total2 - this.funds_total,
        },
        { name: "ربحية الصرافة", balance: this.exchange_profit_acc.balance },
        { name: "ربحية الحوالات", balance: this.transfer_profit_acc.balance },
        {
          name: "الربحية",
          balance: (
            parseFloat(this.transfer_profit_acc.balance) +
            parseFloat(this.exchange_profit_acc.balance) +
            (this.funds_total2 - this.funds_total || funds_total2)
          ).toFixed(2),
        },
      ];
      item.value = [...item.value, ...extra_headers];
      // let items = []
      item.headers = item.value.map((obj) => obj.name);
      this.$save(item, "inventory_log");
      console.log(item);
    },
    getMorningExchangeRate(currency_id) {
      let stock = this.stocks.find((v) => v.currency_id == currency_id);
      if (stock) {
        console.log();
        return (stock.mid * 1).toFixed(4);
      }
    },
    getNightExchangeRate(currency_id) {
      let stock = this.stocks.find((v) => v.currency_id == currency_id);
      if (stock) {
        return (stock.close_mid * 1).toFixed(4);
      }
    },
    getDate() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("account/index");
        this.loading = false;
      }, 500);
    },
  },
  computed: {
    // active_accounts() {
    //   return this.main_active_accounts.map((acc) => {
    //     let main = this.my_active_accounts.find((ac) => ac.id == acc.id);
    //     return { ...acc, price: main.price };
    //   });
    // },
    ...mapState({
      active_accounts: (state) =>
        JSON.parse(JSON.stringify(state.auth.user.main_active_accounts)),
      start_active_accounts: (state) =>
        JSON.parse(JSON.stringify(state.auth.user.start_main_active_accounts)),
      // stock_transaction: (state) =>
      //   JSON.parse(JSON.stringify(state.stock_transaction.all)),
      all_accounts: (state) =>
        JSON.parse(JSON.stringify(state.account.all)) || [],
      stocks: (state) => state.stock.all || [],
    }),
    transfer_profit_acc() {
      let acc = {};
      acc.balance = (this.$auth.user.daily_transfer_profit * 1).toFixed(2);
      acc.name = "ربحية الحوالات";
      return acc;
    },
    profit_and_losse_acc() {
      let acc = this.all_accounts.find((v) => v.id == 33) || {};
      // if (acc.balance < 0) {
      //   acc.balance = parseFloat(acc.balance).toFixed(3) * -1 + " " + "د";
      // }
      return acc;
    },
    exchange_profit_acc() {
      let acc = {};
      acc.balance = (this.$auth.user.daily_exchange_profit * 1).toFixed(3);
      acc.name = "ربحية الصرافة";
      return acc;
    },
    funds_total() {
      this.totals = this.start_active_accounts.map((account) => {
        let net_balance =
          account.start_net_balance * 1 + account.start_price * 1;
        let total = 0;
        if (account.currency_id == 4) {
          total =
            net_balance * this.getMorningExchangeRate(account.currency_id);
        } else {
          total =
            net_balance / this.getMorningExchangeRate(account.currency_id);
        }
        return total.toFixed(3);
      });
      return this.totals.reduce((c, n) => (parseFloat(n) || 0) + c, 0);
    },
    funds_total2() {
      this.totals2 = this.active_accounts.map((account) => {
        let net_balance = account.net_balance * 1 + account.price * 1;
        let total = 0;
        if (account.currency_id == 4) {
          total = net_balance * this.getNightExchangeRate(account.currency_id);
        } else {
          total = net_balance / this.getNightExchangeRate(account.currency_id);
        }
        return total.toFixed(3);
      });
      return this.totals2.reduce((c, n) => (parseFloat(n) || 0) + c, 0);
    },
  },
  watch: {
    // stock_transaction(val) {
    //   val.sort((a, b) => b.id - a.id);
    //   val.forEach((element) => {
    //     console.log(element.id);
    //   });
    //   this.old_transactions = val.slice(0, 7);
    //   this.new_transactions = val.slice(7, 14);
    // },
    all_accounts(val) {
      if (val[0]) {
        this.accounts = val.filter((v) => v.type_id == 4);
      }
    },
  },

  filters: {
    money(value) {
      value = parseFloat(value);
      if (typeof value == "number") {
        return parseFloat(value).toLocaleString(undefined, {
          minimumFractionDigits: 3,
        });
      }
    },
  },
};
</script>
 
 <style >
.shadowing {
  margin: 10px;
  box-shadow: 0px 2px 10px 1px rgba(72, 72, 72, 0.3);
}
</style>