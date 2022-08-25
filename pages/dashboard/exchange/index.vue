<template>
  <div>
    <v-row>
      <v-col cols="12" xs="12" lg="7">
        <Card class="mb-5 pt-3 pl-3 pr-6">
          <v-row class="mb-1">
            <v-col cols="12" xs="12" sm="6" lg="8">
              <v-row class="text-h6 mb-4">
                <v-col>
                  <Title title="create an exchange process"></Title>
                </v-col>
              </v-row>
              <v-row class="mb-4">
                <v-col cols="12" xs="12" sm="6" lg="6">
                  <AutoComplete
                    text="beneficiary"
                    holder="beneficiary"
                    required
                    v-model="item.beneficairy"
                  />
                </v-col>
                <v-col cols="12" xs="12" sm="6" lg="6">
                  <DatePicker
                    v-model="item.date"
                    required
                    text="transfer date"
                    holder="test"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              lg="4"
              class="text-h5 mt-5 text-left"
              justify="left"
            >
              {{ $t("process id") }}:<span class="show-text mr-4"
                >{{ item.processNo }}#</span
              >
            </v-col>
          </v-row>
        </Card>
      </v-col>
      <v-col cols="12" xs="12" lg="5">
        <Card>
          <v-row class="text-right text-h6 mt-5 mr-5">
            <v-col cols="1">
              <v-icon class="mr-4 ml-3">fas fa-solid fa-user</v-icon>
            </v-col>
            <v-col cols="6" class="mr-5">
              {{ $t("user") }}
            </v-col>
            <v-col cols="4">
              <span class="show-text">{{ item.user }}#</span>
            </v-col>
          </v-row>
          <v-row class="text-right text-h6 mt-5 mr-5">
            <v-col cols="1">
              <v-icon class="mr-4 ml-3">fas fa-solid fa-arrow-down</v-icon>
            </v-col>
            <v-col cols="6" class="mr-5">
              {{ $t("today transactions profit") }}
              <!--<span class="show-text">1616#</span> -->
            </v-col>
            <v-col cols="4">
              <span class="show-text">{{ item.today_profit }}#</span>
            </v-col>
          </v-row>
          <v-row class="text-right text-h6 mt-5 mr-5 mb-5">
            <v-col cols="1">
              <v-icon class="mr-4 ml-3">fas fa-solid fa-clock</v-icon>
            </v-col>
            <v-col cols="6" class="mr-5">
              {{ $t("today transactions count") }}
              <!--<span class="show-text">1616#</span> -->
            </v-col>
            <v-col cols="4">
              <span class="show-text">{{ item.number_of_process }}#</span>
            </v-col>
          </v-row>
          <!-- </v-row> -->
        </Card>
      </v-col>
    </v-row>

    <Card>
      <v-card-text>
        <v-row class="" align="center">
          <v-col cols="12" xs="12" sm="4" md="3">
            <InputField
              text="amount to exchange"
              holder="amount to exchange"
              required
              v-model.number="item.amount"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="4" md="3" class="ml-40">
            <AutoComplete
              :items="all_currencies"
              v-model="item.currency"
              text="currency"
              return-object
              holder="currency"
              required
            />
          </v-col>
          <v-col cols="1" md="2">
            <v-spacer></v-spacer>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="3"
            md="3"
            lg="1"
            class="text-center column-text font-weight-black py-2"
          >
            <span> {{ $t("reminder") }}:{{ item.reminder }} </span>
          </v-col>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="3"
            class="text-h6 d-flex justify-end"
          >
            <span>
              {{ $t("exchange profit") }}:
              <span class="text-h6">{{ item.exchange_profit }}</span
              >$
            </span>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>

    <Card class="pr-3 pb-3">
      <v-simple-table class="my_tabel mt-3 mb-3">
        <template v-slot:default>
          <thead>
            <tr class="text-right text-h6 font-weight-black">
              <td>
                <span
                  class="fs-18 font-weight-black text-right"
                  style="white-space: nowrap"
                  >{{ $t("exchange to") }}</span
                >
              </td>
              <td>
                <span class="column-text mr-3" style="white-space: nowrap">{{
                  $t("amount to exchange")
                }}</span>
              </td>
              <td>
                <span class="column-text mr-3" style="white-space: nowrap">{{
                  $t("conversion price")
                }}</span>
              </td>
              <td>
                <span class="column-text mr-2" style="white-space: nowrap">{{
                  $t("edited conversion price")
                }}</span>
              </td>
            </tr>
          </thead>
          <tbody :key="number">
            <tr
              :key="i"
              v-for="(currency, i) in all_currencies"
              class="text-right"
            >
              <td>
                <v-btn
                  @click="setRow(i, currency)"
                  depressed
                  width="50"
                  class="mt-2 fs-18"
                  >{{ $t(currency.name) }}</v-btn
                >
              </td>
              <td>
                <v-text-field
                  hide-details
                  v-model="items[i].exchanged_amount"
                  @input="
                    (v) => {
                      changed_ex_amount(items[i], i, v);
                    }
                  "
                  class="mt-4"
                  min="0"
                  color="#FF7171"
                  style="border-radius: 7px !important"
                  dense
                  outlined
                />
              </td>
              <td>
                <v-text-field
                  :value="items[i].exchanged_vactor"
                  hide-details
                  @blur="changed_ex_factor(items[i], $event)"
                  class="mt-4"
                  min="0"
                  color="#FF7171"
                  style="border-radius: 7px !important"
                  dense
                  outlined
                />
              </td>
              <td>
                <v-text-field
                  v-model="items[i].modified_factor"
                  hide-details
                  class="mt-4"
                  min="0"
                  style="border-radius: 7px !important"
                  dense
                  outlined
                  color="red"
                  readonly
                />
              </td>
              <td>
                <v-btn class="mt-4" color="primary">{{ $t("reminder") }}</v-btn>
              </td>
              <td>
                <v-btn
                  @click="round_amount(items[i], i)"
                  class="mt-4"
                  color="primary"
                  >{{ $t("amount rounding") }}</v-btn
                >
              </td>
              <td>
                <v-btn
                  @click="delete_factors(items[i], i)"
                  class="mt-4"
                  color="primary"
                  >{{ $t("delete fraction") }}</v-btn
                >
              </td>
              <td>
                <v-btn
                  @click="complete_factor(items[i], i)"
                  class="mt-4"
                  color="primary"
                  >{{ $t("complete fraction") }}</v-btn
                >
              </td>
            </tr>
            <!-- HI KILLUA  -->
          </tbody>
        </template>
      </v-simple-table>
    </Card>

    <v-row justify="center" class="mt-5 mb-5">
      <v-col class="d-flex justify-center">
        <v-btn height="50" class="text-center" color="primary">
          {{ $t("execute process") }}
          <v-icon dence>fas fa-solid fa-check</v-icon>
        </v-btn>
        <div style="width: 20px"></div>
        <v-btn height="50" class="text-center white--text" color="#6A3D9A">
          &nbsp;&nbsp;{{ $t("print receipt") }}
          <v-icon dence>fas fa-solid fa-print</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "extchange",
  data() {
    return {
      selected: {},
      number: 1,
      currensies: [
        {
          id: 1,
          name: "dollar",
          values: { sale: 1, buy: 1 },
        },
        {
          id: 2,
          name: "shekel",
          values: { sale: 0.29, buy: 0.3 },
        },
        {
          id: 3,
          name: "dinar",
          values: { sale: 0.7, buy: 0.69 },
        },
        {
          id: 4,
          name: "euro",
          values: { sale: 0.6, buy: 0.59 },
        },
        {
          id: 5,
          name: "pound",
          values: { sale: 15, buy: 14 },
        },
      ],
      item: {
        currency: {},
        reminder: null,
      },
      items: [{}, {}, {}, {}, {}, {}],
    };
  },
  computed: {
    ...mapState({
      all_currencies: (state) => state.currency.all,
    }),
  },
  methods: {
    setRow(index, item) {
      let amount = this.item.amount || 0;
      let reminder = parseFloat(this.item.reminder || 0);
      let item_ex_amount = parseFloat(this.items[index].exchanged_amount || 0);
      let item_ex_factor = parseFloat(this.items[index].exchanged_vactor || 1);
      if (reminder > 0) {
        amount = parseFloat(this.item.reminder);
        if (item_ex_amount >= 0) {
          amount += item_ex_amount / item_ex_factor;
        }
        this.item.reminder = 0;
      } else {
        this.items = this.all_currencies.map((item) => {
          return { modified_factor: null, exchanged_amount: null };
        });
      }

      console.log(index);
      console.log(this.$all_all_currencies);
      let from = this.item.currency;
      let to = item;

      let temp = this.$newCalcSalePrice(from, to);
      console.log(temp, from, to, amount);
      this.items[index] = {
        exchanged_vactor: temp,
        exchanged_amount: amount * temp,
      };
      this.number = this.number + 1;
    },
    calc(sale) {
      // let sale = this.selected.values.sale;
      return (100 / 0.29).toFixed(2);
    },
    changed_ex_amount(element, index, new_value) {
      element.exchanged_amount = new_value;
      console.log("0");
      let amount = this.item.amount || 0;
      console.log("1");
      let ex_amount = element.exchanged_amount || 0;
      console.log("2");
      let ex_vector = element.exchanged_vactor || 1;
      console.log("3");
      console.log(amount, ex_amount, ex_vector);
      let sum = this.sum_fields();
      console.log("4");
      if (sum > amount) {
        this.item.reminder = 0;
        return false;
      }

      this.item.reminder = amount - sum;
    },
    changed_ex_factor(element, event) {
      let new_value = event.target.value;
      let old_value = element.exchanged_vactor;
      // element.exchanged_vactor = new_value;
      let old_amount = element.exchanged_amount / element.exchanged_vactor;
      let new_ex_amount = old_amount * new_value;
      element.exchanged_vactor = new_value;
      element.exchanged_amount = new_ex_amount;
      console.log(element, old_amount, new_ex_amount);
    },
    sum_fields() {
      console.log("Enterd Sum: >>>");
      if (!this.items[0]) return 0;
      return this.items.reduce((e, n) => {
        let factor =
          parseFloat(n.modified_factor || 0) > 0
            ? n.modified_factor
            : parseFloat(n.exchanged_vactor || 1);
        return e + parseFloat(n.exchanged_amount || 0) / factor;
      }, 0);
    },
    round_amount(element, index) {
      let ex_amount = element.exchanged_amount || 0;
      let ex_factor = element.exchanged_vactor || 1;
      let new_amount = Math.round(parseFloat(ex_amount));
      let amount = ex_amount / ex_factor;
      let new_factor = new_amount / amount;
      element.modified_factor = new_factor;
      element.exchanged_amount = new_amount;
      console.log(element);
    },
    delete_factors(element, index) {
      let ex_amount = element.exchanged_amount || 0;
      let ex_factor = element.exchanged_vactor || 1;
      let new_amount = Math.floor(parseFloat(ex_amount));
      let amount = ex_amount / ex_factor;
      let new_factor = new_amount / amount;
      element.modified_factor = new_factor;
      element.exchanged_amount = new_amount;
      console.log(element);
    },
    complete_factor(element, index) {
      console.log("1");
      let ex_amount = element.exchanged_amount || 0;
      console.log("2");
      let ex_factor = element.exchanged_vactor || 1;
      console.log("3");
      let new_amount = Math.ceil(parseFloat(ex_amount));
      console.log("4");
      let amount = ex_amount / ex_factor;
      console.log("5");
      let new_factor = new_amount / amount;
      console.log("6");
      element.modified_factor = new_factor;
      console.log("7");
      element.exchanged_amount = new_amount;
      console.log("8");
      console.log(element);
    },
  },
  created() {
    this.$store.dispatch("currency/index");
    this.$store.dispatch("stock/index");

    for (let e of this.items) {
      e.modified_factor = null;
      e.exchanged_amount = null;
      e.exchanged_vactor = null;
    }
  },
  watch: {
    all_currencies(val) {
      if (val[0])
        this.items = val.map((item) => {
          return {
            modified_factor: null,
            exchanged_amount: null,
          };
        });
    },
  },
};
</script>

<style>
.show-text {
  background-color: #e6e6e6;
  border-radius: 4px;
  padding: 5px 8px;
  width: 50px !important;
  margin: 20px 18px;
}

.theme--light.v-input--is-disabled input {
  color: rgb(0, 0, 0, 1) !important;
  opacity: 1 !important;
  font-size: 20px !important;
}

.column-text {
  background-color: #e6e6e6;
  font-size: 13px;
  border-radius: 4px;
  padding: 5px 8px;
}

/* .theme--light.v-input input::placeholder, 
.theme--light.v-input textarea::placeholder{
   color: rgb(0, 0, 0 , 1) !important;
  opacity: 1 !important;

} */
.my_tabel table tr td {
  border: none !important;
  border-radius: 50px !important;
}

.my_tabel table tr:hover {
  background-color: initial !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  border-bottom: none !important;
}

@media (max-width: 600px) {
  .responseveCols > div > button {
    min-width: 100px !important;
    max-width: 100px !important;
  }
}
@media (max-width: 1280px) {
  .responseveCols > div > button {
    min-width: 200px !important;
    max-width: 200px !important;
  }
}
@media (min-width: 1280px) {
  .responseveCols > div > button {
    min-width: 300px !important;
    max-width: 300px !important;
  }
}
</style>
