<template>
  <div>
    <v-row class="">
      <v-col v-for="(currency, i) in all_currencies">
        <v-card flat style="border: 1px solid lightgrey">
          <v-card-text class="text-center text-black">
            <v-row dense>
              <!-- <v-col cols="3"><img src="/calculator.png" alt="" /></v-col> -->
              <v-col style="font-size: 18px; color: black">
                {{ currency.name }}
              </v-col>
            </v-row>
            <div style="font-size: 20px; color: black">
              {{ getBalance(currency) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currencies: [
        "دولار $",
        "شيكل NIS",
        "JD دينار",
        "يورو",
        "ريال",
        "درهم",
        "جنيه",
      ],
      report_data: {
        has_headers: true,
        type: "Accounting",
        sub_type: "currencyCredit",
      },
    };
  },
  computed: {
    ...mapState({
      report: (state) => state.report.all,
      all_currencies: (state) => state.currency.all,
    }),
  },
  mounted() {
    this.$store.dispatch("report/index", {
      currencies: [1, 2, 3, 4, 5, 6, 7],
      ...this.report_data,
    });
  },
  methods: {
    getBalance(currency) {
      let report = this.report.find((v) => v.account_id == currency.account_id);
      return report ? parseFloat(report.balance).toFixed(3) : 0;
      // return "test";
    },
  },
};
</script>

<style>
</style>