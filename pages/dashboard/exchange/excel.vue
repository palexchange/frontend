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
      <Excel :save_clicked="times_clicked" @new_item="handleExcel" />
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
          @click="$router.push('/dashboard/exchange/form')"
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
import { forEach } from "country-codes-list/countriesData";
import { mapState, mapMutations } from "vuex";
import global from "../../../helpers/global";
export default {
  mixins: [global],
  name: "extchange-excel",
  data() {
    return {
      times_clicked: 0,
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
  },
  methods: {
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
    get_usd_amount(item) {
      let mid = this.all_stocks.find((w) => w.currency_id == item.id).close_mid;
      return item.id != 4 ? item.amount / mid : item.amount * mid;
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
  },
  mounted() {
    this.exchange.started_at = this.$getDateTime();
    this.exchange.page_name = this.$route.path;
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
