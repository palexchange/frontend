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
              ></v-text-field
            ></v-col>
            <v-col cols="3">
              <label for="">{{ $t("sale") }}</label>
              <v-text-field
                v-model.number="currency.start_selling_price"
                dense
              ></v-text-field
            ></v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
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
        </v-col>
        <v-col cols="12" class="align-self-center">
          <v-btn @click="dialog = true" block depressed>
            {{ $t("add currency") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="py-5"></v-divider>

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
                      {{ $newCalcSalePrice(from, to) }}
                    </span>
                  </v-col>
                  <v-col
                    >{{ $t("sale") }}
                    <br />
                    <span>
                      {{ $newCalcBuyPrice(from, to) }}
                    </span>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$save(stocks, 'stock')"> save </v-btn>
    </v-card-actions>
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
      currency: {},
      stocks: [],
      currencies: [
        { id: 1, name: "dollar", values: { sale: 1, buy: 1 } },
        { id: 2, name: "denar", values: { sale: 0.708, buy: 0.706 } },
        { id: 3, name: "shekel", values: { sale: 3.32, buy: 3.3 } },
        { id: 4, name: "euro", values: { sale: 1.03, buy: 1.01 } },
        { id: 5, name: "pound", values: { sale: 16, buy: 15 } },
      ],

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
      all_stocks: (state) => JSON.parse(JSON.stringify(state.stock.all)),
    }),
  },
  methods: {
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