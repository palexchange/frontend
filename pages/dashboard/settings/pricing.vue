<template>
  <Card class="pa-5">
    <v-card-title class="justify-space-between">
      <Title title="أسعار صرف نهاية اليوم"> </Title>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col
          :key="currency.id"
          v-for="currency in stocks"
          cols="12"
          md="6"
          sm="12"
        >
          <v-row>
            <v-col class="align-self-center" cols="3">
              <AutoComplete
                required
                no_lable
                v-model="currency.ref_currency_id"
                :label="$t('from')"
                hide-details
                readonly
                :items="all_currencies"
              />
            </v-col>
            <v-col class="align-self-center" cols="3">
              <AutoComplete
                required
                no_lable
                :label="$t('to')"
                hide-details
                v-model="currency.currency_id"
                :items="all_currencies"
              />
            </v-col>

            <v-col cols="3">
              <label for="">{{ $t("buy") }}</label>
              <v-text-field
                v-model.number="currency.final_purchasing_price"
                dense
                @keydown.enter="calcDollaySellBuyPrice($event, currency, 'buy')"
                @focusout="calcDollaySellBuyPrice($event, currency, 'buy')"
              ></v-text-field
            ></v-col>
            <v-col cols="3">
              <label for="">{{ $t("sale") }}</label>
              <v-text-field
                v-model.number="currency.final_selling_price"
                dense
                @keydown.enter="
                  calcDollaySellBuyPrice($event, currency, 'sell')
                "
                @focusout="calcDollaySellBuyPrice($event, currency, 'sell')"
              ></v-text-field
            ></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-row>
        <v-col>
          <v-btn class="primary" @click="dialog2 = true">
            إعتماد اغلاق الجرد
          </v-btn>
        </v-col>
      </v-row>
      <v-dialog width="500" v-model="dialog2">
        <v-sheet class="pa-5">
          <h4>هل انت متأكد لحفظ الاسعار للجرد ؟</h4>
          <v-btn
            class="primary"
            @click="
              dialog2 = false;
              save(2);
            "
            >نعم</v-btn
          >
          <v-btn @click="dialog2 = false">لا</v-btn>
        </v-sheet>
      </v-dialog>
    </v-card-actions>

    <v-card-text>
      <v-divider class="py-5"></v-divider>
      <v-card-title class="justify-space-between">
        <Title title="أسعار صرف بداية اليوم"> </Title>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            :key="currency.id"
            v-for="currency in stocks"
            cols="12"
            md="6"
            sm="12"
          >
            <v-row>
              <v-col class="align-self-center" cols="3">
                <AutoComplete
                  required
                  no_lable
                  v-model="currency.ref_currency_id"
                  :label="$t('from')"
                  hide-details
                  readonly
                  :items="all_currencies"
                />
              </v-col>
              <v-col class="align-self-center" cols="3">
                <AutoComplete
                  required
                  no_lable
                  :label="$t('to')"
                  hide-details
                  v-model="currency.currency_id"
                  :items="all_currencies"
                />
              </v-col>

              <v-col cols="3">
                <label for="">{{ $t("buy") }}</label>
                <v-text-field
                  v-model.number="currency.start_purchasing_price"
                  dense
                  @keydown.enter="
                    calcDollaySellBuyPrice($event, currency, 'buy')
                  "
                  @focusout="calcDollaySellBuyPrice($event, currency, 'buy')"
                ></v-text-field
              ></v-col>
              <v-col cols="3">
                <label for="">{{ $t("sale") }}</label>
                <v-text-field
                  v-model.number="currency.start_selling_price"
                  dense
                  @keydown.enter="
                    calcDollaySellBuyPrice($event, currency, 'sell')
                  "
                  @focusout="calcDollaySellBuyPrice($event, currency, 'sell')"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-row>
          <v-col>
            <v-btn class="primary" @click="dialog2 = true">
              اعتماد فتح الجرد
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog width="500" v-model="dialog2">
          <v-sheet class="pa-5">
            <h4>هل انت متأكد لحفظ الاسعار للجرد ؟</h4>
            <v-btn
              class="primary"
              @click="
                dialog2 = false;
                save(1);
              "
              >نعم</v-btn
            >
            <v-btn @click="dialog2 = false">لا</v-btn>
          </v-sheet>
        </v-dialog>
      </v-card-actions>
    </v-card-text>
  </Card>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "pricing",
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dialog: false,
      dialog2: false,
      currency: {},
      stocks: [],

      numebr: 0,
      headers: ["dollar", "denar", "shekel", "euro", "pound"],
    };
  },
  created() {
    if (!this.all_currencies[0]) {
      this.$store.dispatch("currency/index");
    }
    this.$store.dispatch("stock/index");
    // setInterval(() => {
    //   this.numebr++;
    // }, 10);
  },
  computed: {
    ...mapState({
      all_currencies: (state) => JSON.parse(JSON.stringify(state.currency.all)),
      all_stocks: (state) => JSON.parse(JSON.stringify(state.stock.all)),
    }),
  },
  methods: {
    save(type) {
      let dateTime = this.$getDateTime();
      let stocks = this.stocks;
      if (type == 1) {
        stocks.map((v) => {
          v.opened_at = dateTime;
        });
      } else {
        stocks.map((v) => {
          v.closed_at = dateTime;
        });
      }
      this.$save(stocks, "stock");
    },
    calcDollaySellBuyPrice(event, stock, type) {
      let new_value = event.target.value;

      if ([5, 6].includes(stock.currency_id)) {
        console.log("Enterd  Dinar Rial Part");
        let Dinar_curr = this.all_stocks.find((x) => x.id == 3);
        if (Dinar_curr == null || Dinar_curr == undefined) return;
        let dinar_avg_curr = parseFloat(Dinar_curr.mid).toFixed(7) * 1;
        let new_price = parseFloat(dinar_avg_curr / new_value).toFixed(4) * 1;
        console.table(new_value, Dinar_curr, dinar_avg_curr, new_price);
        if (type == "buy") {
          stock.start_purchasing_price = new_price;
        } else {
          stock.start_selling_price = new_price;
        }
      } else if ([7].includes(stock.currency_id)) {
        console.log("Enterd EGP Part");
        let Shekle_curr = this.all_stocks.find((x) => x.id == 2);
        if (Shekle_curr == null || Shekle_curr == undefined) return;
        let shekle_avg_curr = parseFloat(Shekle_curr.mid).toFixed(7) * 1;
        let new_price = parseFloat(shekle_avg_curr / new_value).toFixed(4) * 1;
        console.table(new_value, Shekle_curr, shekle_avg_curr, new_price);
        if (type == "buy") {
          stock.start_purchasing_price = new_price;
        } else {
          stock.start_selling_price = new_price;
        }
      }
      // else if ([4].includes(stock.currency_id)) {
      //   if (type == "buy")
      //     stock.start_purchasing_price =
      //       parseFloat(1 / stock.start_purchasing_price).toFixed(4) * 1;
      //   else
      //     stock.start_selling_price =
      //       parseFloat(1 / stock.start_selling_price).toFixed(4) * 1;
      // } else {
      //   console.log("Enterd else Part");
      //   return;
      // }
    },
    // generate_stocks(items) {
    //   return items.map((currency) => {
    //     return {
    //       currency_id: currency.id,
    //       ref_currency_id: 1,
    //       start_selling_price: 0,
    //       final_selling_price: 0,
    //       start_purchasing_price: 0,
    //       final_purchasing_price: 0,
    //       date: this.date,
    //       opened_at: this.date + " " + this.time,
    //     };
    //   });
    // },
  },
  watch: {
    // all_currencies(val) {
    //   if (val[0]) {
    //     if (!this.all_stocks[0]) {
    //       this.stocks = this.generate_stocks(val);
    //     }
    //   }
    // },
    all_stocks(val) {
      if (val) {
        this.stocks = val;
      }
    },
  },
};
</script>

<style>
.bg-disabled {
  background-color: rgb(75, 75, 75);
  color: rgb(75, 75, 75);
  /* opacity: 0; */
}
.my-test table td,
.my-test table th {
  border: solid 1px gray;
}
</style>