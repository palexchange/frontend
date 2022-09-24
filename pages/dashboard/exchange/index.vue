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
                  <BeneficiaryAutocomplete
                    text="beneficiary"
                    holder="beneficiary"
                    required
                    v-model="item.beneficairy"
                    return-object
                    @change="
                      (v) => {
                        setSenderCurrecny(v);
                      }
                    "
                  />
                  <!-- <AutoComplete
                    text="beneficiary"
                    holder="beneficiary"
                    :items="all_parties"
                    required
                    v-model="item.beneficairy"
                  /> -->
                </v-col>
                <v-col cols="12" xs="12" sm="6" lg="6">
                  <DatePicker
                    v-model="exchange.date"
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
                >{{ exchange.processNo }}#</span
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
            <v-col cols="4" class="mr-5">
              {{ $t("user") }}
            </v-col>
            <v-col cols="5">
              <span style="white-space: nowrap" class="show-text"
                >{{ $auth.user.name + "  " }}#</span
              >
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
        <v-row align="center">
          <v-col cols="12" xs="12" sm="4" md="3">
            <InputField
              text="amount to exchange"
              holder="amount to exchange"
              required
              v-model.number="exchange.amount"
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
              <span class="text-h6">{{ exchange_profit }} $</span>
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
                  @keydown.enter="
                    (v) => changed_ex_amount(items[i], i, v.target.value)
                  "
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
                  @keydown.enter="changed_ex_factor(items[i], $event)"
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
                  :value="items[i].modified_factor"
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
                <v-btn
                  @click="setRow(i, currency)"
                  class="mt-4"
                  color="primary"
                  >{{ $t("reminder") }}</v-btn
                >
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
      <v-col cols="8" class="d-flex justify-end">
        <v-btn @click="save" height="50" class="text-center" color="primary">
          {{ $t("execute process") }}
          <v-icon dence>fas fa-solid fa-check</v-icon>
        </v-btn>
        <div style="width: 20px"></div>
        <v-btn height="50" class="text-center white--text" color="#6A3D9A">
          &nbsp;&nbsp;{{ $t("print receipt") }}
          <v-icon dence>fas fa-solid fa-print</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4" class="text-left">
        <v-btn
          @click="$router.push('exchange/form')"
          height="50"
          class="text-center"
          color="primary"
        >
          {{ $t("show exchange processes") }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import BeneficiaryAutocomplete from "~/components/BeneficiaryAutocomplete.vue";
export default {
  name: "extchange",
  data() {
    return {
      selected: {},
      number: 1,

      item: {
        currency: {},
        reminder: null,
      },
      items: [],
      stocks: [],
      exchange: {},
    };
  },
  computed: {
    ...mapState({
      all_currencies: (state) => state.currency.all,
    }),
    exchange_profit() {
      let main_amount = parseFloat(this.exchange.amount || 0);
      let final_profit = 0;
      if (main_amount == 0) return 0;
      this.items.forEach((e, index) => {
        let obj = {};
        obj.exchanged_amount = parseFloat(e.exchanged_amount || 0);
        if (obj.exchanged_amount == 0) return;

        obj.used_factor = parseFloat(
          e.modified_factor || e.exchanged_vactor || 0
        );
        if (obj.sale_factor == 0) return;

        obj.sale_factor = parseFloat(
          this.$newCalcSalePrice(this.item.currency, this.all_currencies[index])
        );
        obj.buy_factor = parseFloat(
          this.$newCalcBuyPrice(this.item.currency, this.all_currencies[index])
        );
        obj.calc_profit_factor = Math.max(obj.buy_factor, obj.sale_factor);
        obj.amount = parseFloat(obj.exchanged_amount / obj.used_factor);
        obj.new_amount = parseFloat(obj.amount * obj.calc_profit_factor);
        obj.profit_in_to_currency = obj.new_amount - obj.exchanged_amount;
        obj.sale_factor_from_to_currency = parseFloat(
          this.$newCalcSalePrice(this.all_currencies[index], { id: 1 })
        );
        obj.buy_factor_from_to_currency = parseFloat(
          this.$newCalcBuyPrice(this.all_currencies[index], { id: 1 })
        );
        obj.calc_new_factor =
          (obj.sale_factor_from_to_currency + obj.buy_factor_from_to_currency) /
          2;
        obj.profit = obj.profit_in_to_currency * obj.calc_new_factor;
        final_profit += obj.profit;
      });

      return parseFloat(final_profit).toFixed(3);
    },
  },
  methods: {
    setSenderCurrecny(partyObj) {
      this.item.currency = this.all_currencies.find(
        (e) => e.id == partyObj.currency_id
      );
    },

    setRow(index, item) {
      let amount = this.exchange.amount || 0;
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
        this.all_currencies.forEach((item, index) => {
          this.items[index].exchanged_amount = null;
          this.items[index].exchanged_vactor = null;
          this.items[index].modified_factor = null;
        });
      }

      let from = this.item.currency;
      let to = item;
      let sale = this.$newCalcSalePrice(from, to);
      let buy = this.$newCalcBuyPrice(from, to);
      console.table({ sale, buy });
      let temp = Math.min(buy, sale);
      this.items[index].exchanged_vactor = temp.toFixed(7);
      this.items[index].exchanged_amount = (amount * temp).toFixed(7);
      this.items[index].modified_factor = null;
      this.number = this.number + 1;
    },

    changed_ex_amount(element, index, new_value) {
      element.exchanged_amount = new_value;
      let amount = this.exchange.amount || 0;
      let ex_amount = element.exchanged_amount || 0;
      let ex_vector = element.exchanged_vactor || 1;
      let sum = this.sum_fields();
      if (sum > amount) {
        this.item.reminder = 0;
        return false;
      }
      this.item.reminder = (amount - sum).toFixed(7);
    },
    changed_ex_factor(element, event) {
      let new_value = parseFloat(event.target.value);
      let old_value = parseFloat(element.exchanged_vactor);
      // element.exchanged_vactor = new_value;
      let old_amount = element.exchanged_amount / parseFloat(old_value);
      let new_ex_amount = old_amount * new_value;
      element.exchanged_vactor = new_value.toFixed(7);
      element.exchanged_amount = new_ex_amount.toFixed(7);
      console.log(element, old_value, new_value);
      console.log(new_value, new_ex_amount);
    },
    sum_fields() {
      console.log("Enterd Sum: >>>");
      if (!this.items[0]) return 0;
      return this.items
        .reduce((e, n) => {
          let factor =
            parseFloat(n.modified_factor || 0) > 0
              ? n.modified_factor
              : parseFloat(n.exchanged_vactor || 1);
          return e + parseFloat(n.exchanged_amount || 0) / factor;
        }, 0)
        .toFixed(7);
    },
    round_amount(element, index) {
      let ex_amount = element.exchanged_amount || 0;
      let ex_factor = element.exchanged_vactor || 1;
      let new_amount = Math.round(parseFloat(ex_amount));
      let amount = ex_amount / ex_factor;
      let new_factor = new_amount / amount;
      element.modified_factor = new_factor.toFixed(7);
      element.exchanged_amount = new_amount.toFixed(7);
      console.log(element);
    },
    delete_factors(element, index) {
      let ex_amount = element.exchanged_amount || 0;
      let ex_factor = element.exchanged_vactor || 1;
      let new_amount = Math.floor(parseFloat(ex_amount));
      let amount = ex_amount / ex_factor;
      let new_factor = new_amount / amount;
      element.modified_factor = new_factor.toFixed(7);
      element.exchanged_amount = new_amount.toFixed(7);
      console.log(element);
    },
    complete_factor(element, index) {
      let ex_amount = element.exchanged_amount || 0;
      let ex_factor = element.exchanged_vactor || 1;
      let new_amount = Math.ceil(parseFloat(ex_amount));
      let amount = ex_amount / ex_factor;
      let new_factor = new_amount / amount;
      element.modified_factor = new_factor.toFixed(7);
      element.exchanged_amount = new_amount.toFixed(7);
      // element.modified_factor = 8;
    },
    async save() {
      this.exchange.currency_id = this.item.currency.id;
      this.exchange.beneficiary_id = this.item.beneficairy.id;
      this.exchange.reference_currency_id = 1;
      this.exchange.status = 1;
      this.exchange.exchange_rate = parseFloat(
        this.$newCalcBuyPrice(
          this.item.currency,
          this.all_currencies.find((e) => e.id == 1)
        )
      );
      this.exchange.amount_after = parseFloat(
        this.exchange.amount * this.exchange.exchange_rate
      );

      // console.log("Curr: ",this.exchange.currency_id);
      // console.log("Ben: ",this.exchange.beneficiary_id);
      let response = await this.$store.dispatch(
        "exchange/store",
        this.exchange
      );
      console.log("Res: ", response);
      let details = {
        exchange_id: response.id,
      };
      console.log("rEEEE", details);
      for (let i = 0; i < this.items.length; i++) {
        let e = this.items[i];
        let c = this.all_currencies[i];
        if (e.modified_factor || e.exchanged_vactor)
          details.factor = parseFloat(e.modified_factor || e.exchanged_vactor);
        else continue;
        (details.currency_id = c.id),
          (details.amount_after = e.exchanged_amount);
        (details.amount = e.exchanged_amount / details.factor),
          this.$save(details, "exchange_detail");
      }
    },
  },
  mounted() {
    this.$store.dispatch("currency/index");
    if (this.all_currencies[0] && this.items.length == 0) {
      this.all_currencies.map((item) => {
        this.items.push({
          modified_factor: null,
          exchanged_vactor: null,
          exchanged_amount: null,
        });
      });
    }
  },
  created() {
    this.$store.dispatch("stock/index");
    if (this.all_currencies[0] && this.items.length == 0) {
      this.all_currencies.map((item) => {
        this.items.push({
          modified_factor: null,
          exchanged_vactor: null,
          exchanged_amount: null,
        });
      });
    }
  },
  watch: {
    all_currencies(val) {
      if (!this.items[0]) {
        val.map((item) => {
          this.items.push({
            modified_factor: null,
            exchanged_vactor: null,
            exchanged_amount: null,
          });
        });
      }
    },
    all_stocks(val) {
      this.stocks = val;
    },
  },
};
</script>

<style>
.show-text {
  font-size: 18px;
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
