<template>
  <Card class="pa-5">
    <v-card-title class="justify-space-between">
      <Title title="exchange prices"> </Title>
      <div>
        <v-row>
          <v-col>
            <TimePicker v-model="time" hide_details disabled />
          </v-col>
          <v-col>
            <DatePicker hide_details disabled />
          </v-col>
        </v-row>
      </div>
    </v-card-title>

    <v-card-text>
      <v-dialog width="500" v-model="dialog">
        <v-card>
          <v-card-title>
            <Title title="add currency"> </Title>
          </v-card-title>
          <v-card-text>
            <InputField v-model="currency.name" text="name" holder="name" />
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              @click="
                $save(currency, 'currency');
                dialog = false;
              "
            >
              {{ $t("add currency") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <v-row>
        <v-col class="text-center">
          <h2>أسعار الصرف</h2>
        </v-col>
      </v-row> -->

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
                @keydown.enter="calcDollaySellBuyPrice($event, currency,'buy')"
                @focusout="calcDollaySellBuyPrice($event, currency,'buy')"
              ></v-text-field
            ></v-col>
            <v-col cols="3">
              <label for="">{{ $t("sale") }}</label>
              <v-text-field
                v-model.number="currency.start_selling_price"
                dense
                @keydown.enter="calcDollaySellBuyPrice($event, currency,'sell')"
                @focusout="calcDollaySellBuyPrice($event, currency,'sell')"
              ></v-text-field
            ></v-col>
          </v-row>
        </v-col>
        <!-- <v-col cols="3">
          <v-btn
            @click="
              stocks.push({
                ref_currency_id: 1,
                date: date,
                opened_at: date + ' ' + time,
              })
            "
            color="primary"
            >add stock</v-btn
          >
        </v-col> -->
        <!-- <v-col cols="12" class="align-self-center">
          <v-btn @click="dialog = true" block depressed>
            {{ $t("add currency") }}
          </v-btn>
        </v-col> -->
      </v-row>
    </v-card-text>
    <v-divider class="py-5"></v-divider>
    <v-card-actions class="justify-center">
      <v-row>
        <v-col>
          <v-btn class="primary" @click="save()">
            {{ $t("save") }}
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <v-btn class="primary" @click="dialog2 = true">
            {{ $t("commit for inventory") }}
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
              save(true);
            "
            >نعم</v-btn
          >
          <v-btn @click="dialog2 = false">لا</v-btn>
        </v-sheet>
      </v-dialog>
    </v-card-actions>
    <v-card-text>
      <v-simple-table class="my-test">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center fs-18">
                <div
                  style="
                    background-image: linear-gradient(
                      to top right,
                      papayawhip calc(50% - 1px),
                      black,
                      papayawhip calc(50% + 1px)
                    );
                  "
                ></div>
              </th>
              <th
                :key="index"
                v-for="(header, index) in all_currencies"
                class="text-center fs-18"
              >
                {{ $t(header.name) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              :key="from_index"
              v-for="(from, from_index) in all_currencies"
              class="text-center main-row"
            >
              <td class="fs-18">{{ $t(from.name) }}</td>
              <td
                :class="from == to ? 'bg-disabled' : ''"
                :key="to_index"
                v-for="(to, to_index) in all_currencies"
              >
                <v-row dense>
                  <v-col
                    >{{ $t("buy") }}
                    <br />
                    <span>
                      {{ $newCalcBuyPrice(from, to) }}
                    </span>
                  </v-col>
                  <v-col
                    >{{ $t("sale") }}
                    <br />
                    <span>
                      {{ $newCalcSalePrice(from, to) }}
                    </span>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
    this.$store.dispatch("currency/index");
    this.$store.dispatch("stock/index");
    // setInterval(() => {
    //   this.numebr++;
    // }, 10);
  },
   computed: {
    ...mapState({
      all_currencies: (state) => JSON.parse(JSON.stringify(state.currency.all)),
      all_stocks: function (state) {
        const all = JSON.parse(JSON.stringify(state.stock.all));
        this.stocks = all;
        return all;
      },
    }),
  },
  methods: {
    save(commit) {
      let dateTime = this.$getDateTime();
      let stocks = this.stocks;
      if (commit) {
        stocks = stocks.map((v) => {
          v.final_selling_price = v.start_selling_price;
          v.final_purchasing_price = v.start_purchasing_price;
          v.closed_at = dateTime;
          return v;
        });
      } else {
        stocks = stocks.map((v) => {
          v.closed_at = null;
          v.opened_at = dateTime;
          return v;
        });
      }

      this.$save(stocks, "stock");
    },
    calcDollaySellBuyPrice(event, stock, type) {
      console.log("Enterd My Func");
      let new_value = event.target.value;

      if([5,6].includes(stock.currency_id)) {
        console.log("Enterd  Dinar Rial Part");
        let Dinar_curr = this.all_stocks.find(x => x.id == 3)
        if(Dinar_curr == null || Dinar_curr == undefined) return;
        let dinar_avg_curr = parseFloat(Dinar_curr.mid).toFixed(7) * 1;
        let new_price = parseFloat(dinar_avg_curr / new_value).toFixed(4) * 1;
        console.table(new_value,Dinar_curr,dinar_avg_curr,new_price);
        if(type == 'buy') {
          stock.start_purchasing_price = new_price;
        }else {
          stock.start_selling_price = new_price;
        }
      }
      else if([7,].includes(stock.currency_id)) {
        console.log("Enterd EGP Part");
        let Shekle_curr = this.all_stocks.find(x => x.id == 2)
        if(Shekle_curr == null || Shekle_curr == undefined) return;
        let shekle_avg_curr = parseFloat(Shekle_curr.mid).toFixed(7) * 1;
        let new_price = parseFloat(shekle_avg_curr / new_value).toFixed(4) * 1;
        console.table(new_value,Shekle_curr,shekle_avg_curr,new_price);
        if(type == 'buy') {
          stock.start_purchasing_price = new_price;
        }else {
          stock.start_selling_price = new_price;
        }
      }
      else if([4,].includes(stock.currency_id)) {
        if(type == 'buy') stock.start_purchasing_price = parseFloat(1 / stock.start_purchasing_price).toFixed(4) * 1;
        else stock.start_selling_price = parseFloat(1 / stock.start_selling_price).toFixed(4) * 1;
      }
      else {
        console.log("Enterd else Part");
        return;
      }
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
    // all_stocks(val) {
    //   if (val) {
    //     this.stocks = val;
    //   }
    // },
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