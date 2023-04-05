<template>
  <div>
    <Boxes />
    <v-row class="mt-4" dense>
      <v-col>
        <Card>
          <v-row class="text-right text-h6 pa-3">
            <v-col>
              <v-row>
                <v-col cols="4">
                  {{ $t("user") }}
                </v-col>
                <v-col cols="5">
                  <span style="white-space: nowrap" class="show-text"
                    >{{ $auth.user.name + "  " }}#</span
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col>
                  {{ $t("today transactions profit") }}
                  <!--<span class="show-text">1616#</span> -->
                </v-col>
                <v-col>
                  <span class="show-text"
                    >{{
                      (parseFloat(user.daily_exchange_profit) || 0).toFixed(2)
                    }}
                    &nbsp; $</span
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col cols="6">
                  {{ $t("today transactions count") }}
                  <!--<span class="show-text">1616#</span> -->
                </v-col>
                <v-col cols="4">
                  <span class="show-text"
                    >{{ user.daily_exchange_transactions || 0 }} &nbsp;#</span
                  >
                  {{ exchange_profit }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- </v-row> -->
        </Card>
      </v-col>
    </v-row>

    <Card>
      <Excel @new_item="handleExcel" />
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
        <!-- <div style="width: 20px"></div> -->
        <!-- <v-btn height="50" class="text-center white--text" color="#6A3D9A">
          &nbsp;&nbsp;{{ $t("print receipt") }}
          <v-icon dence>fas fa-solid fa-print</v-icon>
        </v-btn> -->
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

        <div ref="btn"></div>
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
      items: [],
      exchange: {},
      numberToReRender: 0,
    };
  },
  computed: {
    ...mapState({
      pressed_key: (state) => state.last_key_listener_value,
      all_currencies: (state) => state.currency.all,
      all_stocks: (state) => state.stock.all,
      user: (state) => state.auth.user || {},
    }),

    exchange_profit() {
      let items = this.items;
      let to = items.find((item) => item.to) || {};
      let from = items.find((item) => item.from) || {};
      return (to.usd_amount - from.usd_amount || 0).toFixed(3);
    },
  },
  methods: {
    handleExcel(item) {
      let items = [];
      for (const key of Object.keys(item)) {
        if (item[key].amount != 0) {
          const amount = item[key].amount;
          if (amount < 0) {
            items.push({
              ...item[key],
              from: true,
              amount: Math.abs(amount),
            });
          } else {
            items.push({ ...item[key], to: true });
          }
        }
      }

      if (items.length > 0) {
        let to_item = items.find((e) => e.to) || {};
        let from_item = items.find((e) => e.from) || {};
        let to_exchange_rate = to_item.amount / from_item.amount || 0;
        this.items = items.map((i) => {
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
      }
    },
    get_usd_amount(item) {
      let mid = this.all_stocks.find((w) => w.currency_id == item.id).close_mid;
      return item.id != 4 ? item.amount / mid : item.amount * mid;
    },
    prepare_exchange() {
      return new Promise((resolve, reject) => {
        this.exchange.date = this.$getDateTime();
        this.exchange.profit = this.exchange_profit;
        this.exchange.status = 1;
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
        let trimed_and_modified_items = this.items.filter(
          (el) => el.exchanged_amount && el.exchanged_vactor
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
                ? e.exchanged_vactor
                : e.exchanged_amount / this.exchange.amount,
            usd_factor: ex_factor,
            type: 2,
          };
        });
        console.log("trimed_and_modified_items");
        console.log(trimed_and_modified_items);
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
          this.items = [];
          this.exchange = {};
          this.setDefaultParty();
          this.keyNum = this.keyNum + 1;
          this.addItems();
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
      window.scrollTo(0, top);
    }, 0);
  },
  created() {},
  watch: {},
};
</script>

 
