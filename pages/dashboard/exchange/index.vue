<template>
  <div>
    <Boxes :key="keyNum" />
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
                  <DatePicker v-model="exchange.date" required text="date" />
                </v-col>
              </v-row>
            </v-col>
            <!-- <v-col
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
            </v-col> -->
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
              <span class="show-text"
                >{{
                  (parseFloat(user.daily_exchange_profit) || 0).toFixed(2)
                }}
                &nbsp; $</span
              >
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
              <span class="show-text"
                >{{ user.daily_exchange_transactions || 0 }} &nbsp;#</span
              >
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
            <v-btn @click="$router.push('exchange/multi')" small icon>
              <v-icon> fas fa-plus </v-icon>
            </v-btn>
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
                  class="mt-4 text-input"
                  min="0"
                  color="#FF7171"
                  style="border-radius: 7px !important"
                  dense
                  outlined
                />
              </td>
              <td>
                <v-text-field
                  :value="items[i].exchanged_vactor_view"
                  hide-details
                  @keydown.enter="
                    changed_ex_factor(items[i], $event, i, currency)
                  "
                  @blur="changed_ex_factor(items[i], $event, i, currency)"
                  class="mt-4 text-input"
                  min="0"
                  color="#FF7171"
                  style="border-radius: 7px !important"
                  dense
                  outlined
                />
              </td>
              <td style="width: 150px">
                <v-text-field
                  :value="items[i].modified_factor_view"
                  hide-details
                  class="mt-4 text-input"
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
                  @click="setRow(i, currency, true)"
                  class="mt-4"
                  color="primary"
                  :key="variable_key"
                  :outlined="buttons_colors[i][0]"
                  >{{ $t("edit") }}</v-btn
                >
              </td>
              <td>
                <v-btn
                  @click="round_amount(items[i], i, currency)"
                  class="mt-4"
                  color="primary"
                  :key="variable_key"
                  :outlined="buttons_colors[i][1]"
                  >{{ $t("amount rounding") }}</v-btn
                >
              </td>
              <td>
                <v-btn
                  @click="delete_factors(items[i], i, currency)"
                  class="mt-4"
                  color="primary"
                  :key="variable_key"
                  :outlined="buttons_colors[i][2]"
                  >{{ $t("delete fraction") }}</v-btn
                >
              </td>
              <td>
                <v-btn
                  @click="complete_factor(items[i], i, currency)"
                  class="mt-4"
                  :outlined="buttons_colors[i][3]"
                  color="primary"
                  :key="variable_key"
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
import global from "../../../helpers/global";
export default {
  mixins: [global],
  name: "extchange",
  data() {
    return {
      numberToReRender: 1,
      keyNum: 1,
      selected: {},
      number: 1,
      buttons_colors: new Array(9).fill(0).map(() => new Array(4).fill(false)),
      item: {
        beneficairy: this.defaultBeneficiry,
        currency: {},
        reminder: null,
        factor_view: 0.0,
      },
      items: [],
      stocks: [],
      exchange: {},
      variable_key: 0,
      ignored_curr_obj: [],
      ignored_curr_names: ["دينار", "يورو"],
    };
  },
  computed: {
    defaultBeneficiry() {
      return this.app_setting["general_customer"]
        ? { id: this.app_setting["general_customer"]["value"] * 1 }
        : { id: 1 };
    },
    ...mapState({
      all_currencies: (state) => state.currency.all,
      all_stocks: (state) => state.stock.all,
      user: (state) => state.auth.user || {},
    }),
    exchange_profit() {
      let main_amount = parseFloat(this.exchange.amount || 0);
      let final_profit = 0;
      let total_extra_amount = 0;

      if (main_amount == 0) return 0;
      this.items.forEach((e, index) => {
        let obj = {};
        obj.exchanged_amount = parseFloat(e.exchanged_amount || 0);
        if (obj.exchanged_amount == 0) return;

        obj.used_factor = parseFloat(
          e.modified_factor || e.exchanged_vactor || 0
        );
        console.log("Used Factor: ", obj.used_factor);
        if (obj.sale_factor == 0) return;

        obj.sale_factor = parseFloat(
          this.$newCalcSalePrice(this.item.currency, this.all_currencies[index])
        );
        obj.buy_factor = parseFloat(
          this.$newCalcBuyPrice(this.item.currency, this.all_currencies[index])
        );
        obj.calc_profit_factor = (obj.buy_factor + obj.sale_factor) / 2;

        obj.amount = parseFloat(obj.exchanged_amount / obj.used_factor).toFixed(
          2
        ); // -2.824858757062147
        e.amount_in_main_curr = obj.amount;
        total_extra_amount += obj.amount * 1;

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

      // this.stocks;
      // console.log(total_extra_amount - main_amount);
      // let mid = 1;
      // if (this.item.currency && this.item.currency.id) {
      //   mid = this.all_stocks.find(
      //     (v) => v.currency_id == this.item.currency.id
      //   ).mid;
      // }

      let saling = parseFloat(
        this.$newCalcSalePrice(this.item.currency, { id: 1 })
      );
      let buying = parseFloat(
        this.$newCalcBuyPrice(this.item.currency, { id: 1 })
      );
      let mid = (buying + saling) / 2;

      total_extra_amount = total_extra_amount.toFixed(5) * 1;
      main_amount = main_amount.toFixed(5) * 1;
      final_profit = final_profit - (total_extra_amount - main_amount) * mid;
      this.exchange.profit = parseFloat(final_profit).toFixed(5);
      return parseFloat(final_profit).toFixed(5);
    },
  },
  methods: {
    prepare_exchange() {
      return new Promise((resolve, reject) => {
        this.exchange.date = this.$getDateTime();
        this.exchange.beneficiary_id = this.item.beneficairy;
        this.exchange.profit = this.exchange_profit;
        this.exchange.status = 1;
        // this.exchange.currency_id = this.item.currency.id;
        // this.exchange.reference_currency_id = this.item.currency.id;
        let factor =
          this.items[0].modified_factor || this.items[0].exchanged_vactor;
        this.exchange.exchange_rate = factor
          ? factor
          : this.$newCalcBuyPrice(
              this.item.currency,
              this.all_currencies.find((e) => e.id == 1),
              11
            );
        // this.exchange.amount_after =
        //   this.exchange.amount * this.exchange.exchange_rate; // IN DOLLAR
        // // items
        const trimed_and_modified_items = this.items
          .filter((el) => el.exchanged_amount && el.exchanged_vactor)
          .map((e) => {
            let ex_factor =
              1000 /
              ((1000 / parseFloat(e.modified_factor || e.exchanged_vactor)) *
                this.exchange.exchange_rate);
            return {
              currency_id: e.currency_id,
              amount: e.exchanged_amount,
              // amount_after: e.exchanged_amount / ex_factor,
              exchange_rate: e.modified_factor || e.exchanged_vactor,
              usd_factor: ex_factor,
              type: 2,
            };
          });
        let saling = parseFloat(
          this.$newCalcSalePrice({ id: 1 }, this.item.currency)
        );
        let buying = parseFloat(
          this.$newCalcBuyPrice({ id: 1 }, this.item.currency)
        );
        let mid = (buying + saling) / 2;
        trimed_and_modified_items.push({
          currency_id: this.item.currency.id,
          amount: this.exchange.amount,
          usd_factor: mid,
          type: 1,
        });
        this.exchange.items = trimed_and_modified_items;
        resolve("SUCCESS");
      });
    },
    addnumberToReRender() {
      setTimeout(() => {
        this.numberToReRender += 1;
      }, 5000);
    },
    addItems() {
      this.all_currencies.map((item) => {
        this.items.push({
          currency_id: item.id,
          modified_factor: null,
          modified_factor_view: null,
          exchanged_vactor: null,
          exchanged_amount: null,
          exchanged_vactor_view: null,
        });
      });
    },
    setSenderCurrecny(partyObj) {
      this.item.currency = this.all_currencies.find(
        (e) => e.id == partyObj.currency_id
      );
    },

    setRow(index, item, is_reminder = false) {
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
          this.items[index].exchanged_vactor_view = null;
          this.items[index].modified_factor = null;
          this.items[index].modified_factor_view = null;
        });
      }

      let from = this.item.currency;
      let to = item;
      if (!to || !from) return;
      let sale = this.$newCalcSalePrice(from, to);
      let buy = this.$newCalcBuyPrice(from, to);
      let temp = Math.min(buy, sale);

      let factor_to_view =
        to.weight * 1 > from.weight * 1
          ? Math.max(
              this.$newCalcSalePrice(to, from),
              this.$newCalcSalePrice(to, from)
            )
          : temp;

      this.items[index].exchanged_vactor = temp.toFixed(5) * 1;
      this.items[index].exchanged_vactor_view = factor_to_view.toFixed(5);

      this.items[index].exchanged_amount = (amount * temp).toFixed(2);
      this.items[index].modified_factor = null;
      this.items[index].modified_factor_view = null;
      this.number = this.number + 1;

      if (is_reminder) {
        let holder = this.buttons_colors[index][0];
        this.buttons_colors[index] = this.buttons_colors[index].map(() => {
          new Array(4).fill(false);
        });
        this.buttons_colors[index][0] = !holder;
      }
      this.variable_key++;
    },

    changed_ex_amount(element, i, new_value) {
      element.exchanged_amount = new_value;
      let amount = this.exchange.amount || 0;
      let ex_amount = element.exchanged_amount || 0;
      let ex_vector = element.exchanged_vactor || 1;
      let sum = this.sum_fields();
      // element.exchanged_vactor = parseFloat(
      //   parseFloat(new_value) / parseFloat(amount)
      // ).toFixed(5);

      if (sum > amount) {
        this.item.reminder = 0;
        return false;
      }

      this.item.reminder = (amount - sum).toFixed(5);
    },
    changed_ex_factor(element, event, index, to_curr) {
      let new_value = parseFloat(event.target.value);
      let old_value = parseFloat(element.exchanged_vactor);
      // element.exchanged_vactor = new_value;

      let from = this.item.currency;
      let to = to_curr;

      if (to.weight * 1 > from.weight * 1) {
        new_value = (1 / new_value).toFixed(5);
      }
      console.log("new_value: ", new_value);
      console.log("old_value: ", old_value);
      if (new_value == old_value) return;
      let old_amount = element.exchanged_amount / parseFloat(old_value);
      let new_ex_amount = old_amount * new_value;
      element.exchanged_vactor = (new_value * 1).toFixed(5);
      element.exchanged_amount = new_ex_amount.toFixed(2);
      console.log(element, old_value, new_value);
      console.log(new_value, new_ex_amount);
    },
    sum_fields() {
      console.log("Enterd Sum: >>>");
      if (!this.items[0]) return 0;
      console.log(this.items);
      let total = this.items
        .reduce((e, n) => {
          let factor =
            parseFloat(n.modified_factor || 0) > 0
              ? n.modified_factor
              : parseFloat(n.exchanged_vactor || 1);
          return e + parseFloat(n.exchanged_amount || 0) / factor;
        }, 0)
        .toFixed(5);
      return total;
    },
    round_amount(element, index, to_curr) {
      let from = this.item.currency;
      let to = to_curr;

      let ex_amount = element.exchanged_amount || 0;
      let ex_factor = element.exchanged_vactor || 1;
      let new_amount = Math.round(parseFloat(ex_amount));
      let amount = ex_amount / ex_factor;
      let new_factor = new_amount / amount;
      if (to.weight * 1 > from.weight * 1) {
        element.modified_factor_view = (1 / new_factor).toFixed(5);
      } else {
        element.modified_factor_view = new_factor.toFixed(5);
      }
      element.modified_factor = new_factor.toFixed(5);
      element.exchanged_amount = new_amount.toFixed(5);
      let holder = this.buttons_colors[index][1];
      this.buttons_colors[index] = this.buttons_colors[index].map(() => {
        new Array(4).fill(false);
      });
      this.buttons_colors[index][1] = !holder;
      this.variable_key++;
    },
    delete_factors(element, index, to_curr) {
      let from = this.item.currency;
      let to = to_curr;

      let ex_amount = element.exchanged_amount || 0;
      let ex_factor = element.exchanged_vactor || 1;
      let new_amount = Math.floor(parseFloat(ex_amount));
      let amount = ex_amount / ex_factor;
      let new_factor = new_amount / amount;
      if (to.weight * 1 > from.weight * 1) {
        element.modified_factor_view = (1 / new_factor).toFixed(5);
      } else {
        element.modified_factor_view = new_factor.toFixed(5);
      }
      element.modified_factor = new_factor.toFixed(5);
      element.exchanged_amount = new_amount.toFixed(5);
      let holder = this.buttons_colors[index][2];
      this.buttons_colors[index] = this.buttons_colors[index].map(() => {
        new Array(4).fill(false);
      });
      this.buttons_colors[index][2] = !holder;
      this.variable_key++;
    },
    complete_factor(element, index, to_curr) {
      let from = this.item.currency;
      let to = to_curr;

      let ex_amount = element.exchanged_amount || 0;
      let ex_factor = element.exchanged_vactor || 1;
      let new_amount = Math.ceil(parseFloat(ex_amount));
      let amount = ex_amount / ex_factor;
      let new_factor = new_amount / amount;
      if (to.weight * 1 > from.weight * 1) {
        element.modified_factor_view = (1 / new_factor).toFixed(5);
      } else {
        element.modified_factor_view = new_factor.toFixed(5);
      }
      element.modified_factor = new_factor.toFixed(5);
      element.exchanged_amount = new_amount.toFixed(5);
      let holder = this.buttons_colors[index][3];
      this.buttons_colors[index] = this.buttons_colors[index].map(() => {
        new Array(4).fill(false);
      });
      this.buttons_colors[index][3] = !holder;
      this.variable_key++;
      // element.modified_factor = 8;
    },
    async save() {
      this.buttons_colors = new Array(9)
        .fill(0)
        .map(() => new Array(4).fill(false));
      this.addnumberToReRender();
      if (this.exchange_profit < 0) {
        this.$swal.fire({
          title: this.$t("Error Happend"),
          text: this.$t("cant create exchnage in minus"),
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#41b882",
        });
      }
      this.prepare_exchange().then(() => {
        this.$store.dispatch("exchange/store", this.exchange).then(() => {
          this.items = [];
          this.keyNum = this.keyNum + 1;
          this.addItems();
          // this.$auth.fetchUser();
        });
      });
    },
  },
  mounted() {
    this.$store.dispatch("currency/index");
    if (this.all_currencies[0] && this.items.length == 0) {
      this.addItems();
    }

    // this.$store.dispatch("user/show", this.$auth.user.id);
  },
  created() {
    this.$store.dispatch("stock/index");
    if (this.all_currencies[0] && this.items.length == 0) {
      this.all_currencies.map((item) => {
        this.items.push({
          currency_id: item.id,
          modified_factor: null,
          modified_factor_view: null,
          exchanged_vactor: null,
          exchanged_vactor_view: null,
          exchanged_amount: null,
        });
      });
    }
    // this.item.beneficairy = this.app_setting["general_customer"]
    //   ? { id: this.app_setting["general_customer"]["value"] * 1 }
    //   : null;
  },
  watch: {
    all_currencies(val) {
      if (!this.items[0]) {
        val.map((item) => {
          this.items.push({
            currency_id: item.id,
            modified_factor: null,
            modified_factor_view: null,
            exchanged_vactor: null,
            exchanged_amount: null,
            exchanged_vactor_view: null,
          });
        });
      }
    },
    all_stocks(val) {
      this.stocks = val;
    },
    app_setting(val) {
      this.item.beneficairy = val["general_customer"]
        ? parseFloat(val["general_customer"]["value"])
        : null;
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
.text-input input {
  font: 1.2em sans-serif;
  font-weight: 700;
}
td {
  text-align: center;
}
</style>
