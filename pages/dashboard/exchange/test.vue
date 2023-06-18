<template>
  <div>
    <Boxes :prop_expand="false" />
    <v-row dense>
      <v-col cols="12" xs="12" lg="7">
        <Card class="mb-5 pt-3 pl-3 pr-6">
          <v-row align="center" dense>
            <v-col>
              <BeneficiaryAutocomplete
                text="beneficiary"
                holder="beneficiary"
                required
                v-model="exchange.beneficiary_id"
              />
            </v-col>
            <v-col>
              <DatePicker v-model="exchange.date" required text="date" />
            </v-col>
            <v-col cols="2">
              <v-btn to="/dashboard/exchange/excel"> excel </v-btn>
            </v-col>
          </v-row>
        </Card>
      </v-col>
      <div ref="btn"></div>

      <v-col cols="12" xs="12" lg="5">
        <Card>
          <v-row no-gutters dense class="text-right text-h6 mt-5 mr-5">
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
          <v-row no-gutters dense class="text-right text-h6 mt-5 mr-5 mb-5">
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
        <v-row dense align="center">
          <v-col cols="12" xs="12" sm="4" md="3">
            <InputField
              autofocus
              type="number"
              text="amount ."
              holder="amount ."
              required
              v-model.number="exchange.amount"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="4" md="3" class="ml-40">
            <AutoComplete
              :items="stocks"
              v-model="item.currency"
              text="currency"
              return-object
              holder="currency"
              required
            />
          </v-col>
          <v-col cols="12" md="1">
            <v-btn
              @click="$router.push('/dashboard/exchange/multi')"
              small
              icon
            >
              <v-icon> fas fa-plus </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="2" class="column-text font-weight-black pa-2">
            <div>
              <span class="px-2">{{ $t("reminder") }} :</span>
              {{ item.reminder }}
            </div>
          </v-col>
          <v-col cols="12" md="3" class="text-h6 d-flex justify-end">
            <span>
              {{ $t("exchange profit") }}:
              <span class="text-h6">{{ exchange_profit }} $</span>
            </span>
          </v-col>
        </v-row>
      </v-card-text>
    </Card>
    <Card class="pr-3 pb-3">
      <form @submit.prevent="" ref="form">
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
              <tr :key="i" v-for="(item, i) in stocks" class="text-right">
                <td>
                  <v-btn
                    @click="setRow(i, item)"
                    depressed
                    width="50"
                    class="mt-2 fs-18"
                    >{{ $t(item.name) }}</v-btn
                  >
                </td>
                <td>
                  <v-text-field
                    type="number"
                    hide-details
                    :value="item.exchanged_amount"
                    @input="(e) => setRefAmount(e, item)"
                    class="text-input"
                    min="0"
                    color="#FF7171"
                    style="border-radius: 7px !important"
                    dense
                    outlined
                  />
                </td>
                <td>
                  <v-text-field
                    type="number"
                    :value="item.exchanged_factor"
                    hide-details
                    @input="
                      (e) => {
                        item.exchanged_factor = e;
                        setRow(i, item, false);
                      }
                    "
                    class="text-input"
                    min="0"
                    color="#FF7171"
                    style="border-radius: 7px !important"
                    dense
                    outlined
                  />
                </td>
                <td style="width: 150px">
                  <v-text-field
                    type="number"
                    :value="item.modified_factor"
                    hide-details
                    class="text-input"
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
                    @click="setRow(i, item, true)"
                    class="mt-4"
                    color="primary"
                    >{{ $t("edit") }}</v-btn
                  >
                </td>
                <td>
                  <v-btn class="mt-4" color="primary">{{
                    $t("amount rounding")
                  }}</v-btn>
                </td>
                <td>
                  <v-btn
                    @click="delete_factors(item, i, currency)"
                    class="mt-4"
                    color="primary"
                    >{{ $t("delete fraction") }}</v-btn
                  >
                </td>
                <td>
                  <v-btn
                    @click="complete_factor(item, i, currency)"
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
      </form>
    </Card>

    <v-row dense justify="center" class="mt-5 mb-5">
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
      items_copy: [{}, {}, {}, {}, {}, {}, {}],
      numberToReRender: 1,
      selected: {},
      last_item: {},
      number: 1,

      item: {
        currency: {},
        reminder: 0,
        factor_view: 0.0,
      },
      items: [],
      stocks: [],
      exchange: {},
      ignored_curr_obj: [],
      ignored_curr_names: ["دينار", "يورو"],
    };
  },
  computed: {
    total_refs() {
      return (
        this.stocks.reduce((a, c) => {
          return (c.ref_amount || 0) * 1 + a;
        }, 0) || 0
      );
    },
    ...mapState({
      pressed_key: (state) => state.last_key_listener_value,
      all_currencies: (state) => state.currency.all,
      all_stocks: function (state) {
        let val = state.stock.all;
        let ss = JSON.parse(JSON.stringify(val));
        this.stocks = ss.map((item) => {
          return {
            ...item,
            modified_factor: null,
            exchanged_factor: null,
            exchanged_amount: null,
            ref_amount: null,
          };
        });
      },
      user: (state) => state.auth.user || {},
    }),
    exchange_profit() {
      let reminder = (this.exchange.amount - this.total_refs).toFixed(5) || 0;
      this.item.reminder = reminder;
      if (this.item.currency.id == 4) {
        return (reminder * this.item.currency.close_mid).toFixed(3) || 0;
      } else {
        return (reminder / this.item.currency.close_mid).toFixed(3) || 0;
      }
    },
  },
  methods: {
    setRefAmount(e, item) {
      if (item.id == 4) {
        item.ref_amount = e * item.exchanged_factor;
      } else {
        item.ref_amount = e / item.exchanged_factor;
      }
    },
    resetForm() {
      const form = this.$refs.form; //to get the form
      form.reset(); // reset the form
    },
    setPressededKey(currency, currFrom, currTo, row1, row2) {
      if (currency.id == currFrom) {
        this.item.currency = this.find_curr(currTo);
        this.setRow(row1, this.find_curr(currFrom));
      } else {
        this.item.currency = this.find_curr(currFrom);
        this.setRow(row2, this.find_curr(currTo));
      }
    },
    find_curr(id) {
      return this.all_currencies.find((e) => e.id == id);
    },
    setDefaultParty() {
      this.exchange.beneficiary_id = this.app_setting["general_customer"]
        ? this.app_setting["general_customer"]["value"] * 1
        : 1;
    },
    prepare_exchange() {
      return new Promise((resolve, reject) => {
        this.exchange.date = this.$getDateTime();
        this.exchange.profit = this.exchange_profit;
        this.exchange.status = 1;
        // this.exchange.currency_id = this.item.currency.id;
        // this.exchange.reference_currency_id = this.item.currency.id;
        let factor =
          this.stocks[0].modified_factor || this.stocks[0].exchanged_factor;
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
        let trimed_and_modified_items = this.stocks.filter(
          (el) => el.exchanged_amount && el.exchanged_factor
        );
        const items_length = trimed_and_modified_items.length;
        trimed_and_modified_items = trimed_and_modified_items.map((e) => {
          let ex_factor =
            1000 /
            ((1000 / parseFloat(e.modified_factor || e.exchanged_vactor)) *
              this.exchange.exchange_rate);
          return {
            currency_id: e.currency_id,
            amount: e.exchanged_amount,
            // amount_after: e.exchanged_amount / ex_factor,
            exchange_rate:
              items_length > 1
                ? e.exchanged_factor
                : e.exchanged_amount / this.exchange.amount,
            usd_factor: e.close_mid,
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

    async setRow(index, item, reset = true) {
      if (reset && this.item.reminder == 0) {
        await this.resetForm();
      }
      let amount = 0;
      if (this.last_item === item) {
        amount = this.exchange.amount;
      } else {
        amount = parseFloat(this.item.reminder) || this.exchange.amount;
      }
      const from_curr = this.item.currency;
      if (!amount || !from_curr.id) return;
      let fac = 0;
      if (item.id == 4 || from_curr.id == 4) {
        fac = (from_curr.close_mid * item.close_mid).toFixed(5);
      } else {
        fac = (item.close_mid / from_curr.close_mid).toFixed(5);
      }
      if (item.id == from_curr.id) {
        fac = 1;
      }
      item.exchanged_factor = item.exchanged_factor || fac;
      if (item.id == 4) {
        item.exchanged_amount = amount / item.exchanged_factor;
        item.ref_amount = item.exchanged_amount * item.exchanged_factor;
      } else {
        item.exchanged_amount = item.exchanged_factor * amount;
        item.ref_amount = item.exchanged_amount / item.exchanged_factor;
      }
      this.last_item = item;
    },
    resetForm() {
      const form = this.$refs.form; //to get the form
      form.reset(); // reset the form
      this.stocks.forEach((item) => {
        item.modified_factor = null;
        item.exchanged_factor = null;
        item.exchanged_amount = null;
        item.ref_amount = null;
      });
    },
    changed_ex_amount(element, i, new_value) {
      element.exchanged_amount = new_value;
      let amount = this.exchange.amount || 0;
      let ex_amount = element.exchanged_amount || 0;
      let ex_vector = element.exchanged_vactor || 1;
      let sum = this.sum_fields();

      if (sum > amount) {
        this.item.reminder = 0;
        return false;
      }

      this.item.reminder = (amount - sum).toFixed(4);
    },
    changed_ex_factor(element, event, index, to_curr) {
      let new_value = parseFloat(event.target.value);
      let old_value = parseFloat(element.exchanged_vactor);
      // element.exchanged_vactor = new_value;

      let from = this.item.currency;
      let to = to_curr;

      if (to.weight * 1 > from.weight * 1) {
        new_value = (1 / new_value) * 1;
      }
      console.log(new_value, "|new_value");
      console.log(old_value, "old_value");
      if (new_value == old_value) return;
      let old_amount = element.exchanged_amount / parseFloat(old_value);
      if (this.items[index].currency_id == 4) {
        old_amount = element.exchanged_amount * parseFloat(old_value);
      }
      let new_ex_amount = old_amount * new_value;
      element.exchanged_vactor = new_value * 1;
      element.exchanged_amount = new_ex_amount.toFixed(2);
    },
    sum_fields() {
      if (!this.items[0]) return 0;

      let total = this.items.reduce((e, n) => {
        let factor =
          parseFloat(n.modified_factor || 0) > 0
            ? n.modified_factor
            : parseFloat(n.exchanged_vactor || 1);
        return e + parseFloat(n.exchanged_amount || 0) / factor;
      }, 0);
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
      element.modified_factor = new_factor;
      element.exchanged_amount = new_amount.toFixed(5);
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
      element.modified_factor = new_factor;
      element.exchanged_amount = new_amount.toFixed(5);
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
      element.modified_factor = new_factor;
      element.exchanged_amount = new_amount.toFixed(5);

      // element.modified_factor = 8;
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
        this.$store.dispatch("exchange/store", this.exchange).then(() => {
          this.resetForm();
          this.setDefaultParty();
          this.exchange = {};
          this.items = [...this.items_copy];

          this.exchange.started_at = this.$getDateTime();
          // this.$auth.fetchUser();
        });
      });
    },
  },
  mounted() {
    var element = this.$refs.btn;
    var top = element.offsetTop;
    setTimeout(() => {
      window.scrollTo(0, top - 250);
    }, 0);
    this.$store.dispatch("setLastListenerKey", null);
    this.setDefaultParty();
    if (!this.all_currencies[0]) {
      this.$store.dispatch("currency/index");
    }
    this.exchange.started_at = this.$getDateTime();
    if (this.all_currencies[0] && this.items.length == 0) {
      this.addItems();
    }

    // this.$store.dispatch("user/show", this.$auth.user.id);
  },
  created() {
    // if (!this.all_stocks[0]) {
    //   this.$store.dispatch("stock/index");
    // }
    let items = [];
    if (this.all_currencies[0] && this.items.length == 0) {
      items = this.all_currencies.map((item) => {
        return {
          currency_id: item.id,
          modified_factor: null,
          modified_factor_view: null,
          exchanged_vactor: null,
          exchanged_vactor_view: null,
          exchanged_amount: null,
        };
      });

      this.items_copy = items;
      this.items = structuredClone(this.items_copy);
    }
  },
  watch: {
    pressed_key(val, old_val) {
      if (val) {
        let currency = this.item.currency;
        switch (val) {
          case "F1": // doller , shkell , row1 , row2
            this.setPressededKey(currency, 1, 2, 0, 1);
            break;
          case "F2":
            this.setPressededKey(currency, 1, 3, 0, 2);
            break;
          case "F3":
            this.setPressededKey(currency, 1, 4, 0, 3);
            break;
          case "F4":
            this.setPressededKey(currency, 3, 2, 2, 1);
            break;
          case "F12":
            this.save();
            break;
        }
        this.$store.dispatch("setLastListenerKey", null);
      }
    },
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
    all_stocks(val) {},
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
