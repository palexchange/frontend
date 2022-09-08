<template>
  <div>
    <v-row justify="end">
      <v-col cols="12" xs="12" sm="4" md="3">
        <v-btn color="primary" block>
          {{ $t("empty") }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="lg5-custome-row" justify="center">
      <v-col
        v-for="(curr, index) in currencies"
        :key="curr.id"
        cols="12"
        sm="6"
        md="4"
        xs="12"
      >
        <v-card class="black-font">
          <v-row no-gutters class="black-font">
            <v-col
              style="color: #000 !important"
              cols="12"
              class="text-center justify-center d-flex pb-0 pt-2 black-font"
            >
              <div>
                <v-img width="30" height="30" src="/entriesBoxIcon.png" />
              </div>

              <div class="font-wigth-black">{{ "صندوق" }} {{ curr.name }}</div>

              <!-- <InputField class="pt-3 pl-3 pr-3"></InputField> -->
            </v-col>
            <v-col class="text-center pb-0 black-font" cols="12">
              <div class="black-font" style="color: rgba(139, 139, 139, 0.93)">
                $ 400
              </div>
            </v-col>
            <v-col class="text-center pb-0 black-font" cols="12">
              <div class="pa-3 black-font">
                <input type="number" class="border" />
              </div>
            </v-col>
          </v-row>
          <v-card-text class="pa-0 black-font">
            <v-row
              v-for="t in trans[index]"
              :key="t"
              justify="start"
              no-gutters
              class="black-font"
            >
              <!-- <v-divider></v-divider> -->
              <v-col
                class="pt-2 pb-1"
                style="border-top: solid grey 1px; width: 100%"
              >
                &nbsp; {{ t | money
                 }} 
              </v-col>
            </v-row>
          </v-card-text>

          <v-btn
            depressed
            style="background-color: #83b97b"
            class="white--text mt-1 black-font"
            block
            height="60"
          >
            {{ $t("balanced") }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "~/transfers/components/Card.vue";
export default {
  name: "test-killua",
  data() {
    return {
      item: {
        convertToUSD: null,
      },
      currenciess: [
        { id: 1, name: "dollar", values: { sale: 1, buy: 1 } },
        { id: 2, name: "denar", values: { sale: 0.708, buy: 0.706 } },
        { id: 3, name: "shekel", values: { sale: 3.32, buy: 3.3 } },
        { id: 4, name: "euro", values: { sale: 1.03, buy: 1.01 } },
        { id: 5, name: "pound", values: { sale: 16, buy: 15 } },
      ],
      trans: [
        [3000, 3000, 3000],
        [3000, 3000, 3000, 3000, 3000],
        [3000, 3000, 3000, 3000, 3000],
        [3000, 3000, 3000, 3000, 3000],
        [3000, 3000, 3000, 3000, 3000],
        [3000, 3000, 3000, 3000, 3000],
      ],
    };
  },
  methods: {
    signCurrency(vName, type, currencey) {
      console.log(vName);
      console.log(type);
      console.log(currencey);
      this.item[vName] = 1;
      this.item[vName] = currencey.values[type];
    },
  },
  computed: {
    ...mapState({
      currencies: (state) => state.currency.all,
    }),
  },
  created() {
    this.$store.dispatch("currency/index");
  },
  filters: {
    money(value) {
      if (value) {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
      }
    },
  },
};
</script>

<style>
.border {
  border: 2px solid #d6d6d6;
  border-radius: 6px;
}
.black-font {
  font-size: large;
  /* font-weight: bold !important; */
  color: #000 !important;
}

@media (min-width: 1264px) {
  .lg5-custome-row > div {
    width: 20% !important;
    max-width: 20% !important;
    flex-basis: 20% !important;
  }
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>