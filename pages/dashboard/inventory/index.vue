<template>
  <div>
    <v-row justify="end">
      <v-col cols="12" xs="12" sm="4" md="3">
        <v-btn @click="clearTrans" color="primary" block>
          {{ $t("empty") }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- class="lg5-custome-row" -->
    <v-row justify="center">
      <v-col
        v-for="(curr, index) in active_accounts"
        :key="curr.id"
        cols="12"
        sm="6"
        md="3"
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

              <div class="font-wigth-black">{{ curr.name }}</div>

              <!-- <InputField class="pt-3 pl-3 pr-3"></InputField> -->
            </v-col>
            <v-col class="text-center pb-0 black-font" cols="12">
              <div class="black-font" style="color: rgba(139, 139, 139, 0.93)">
                {{ parseFloat(cards[index].balance || 0) | money }}
              </div>
            </v-col>
            <v-col class="text-center pb-0 black-font" cols="12">
              <div class="pa-3 black-font">
                <input
                  @keydown.enter="(v) => addTrans(v.target.value, index)"
                  type="number"
                  class="border"
                  :value="vall"
                />
              </div>
            </v-col>
          </v-row>
          <v-card-text class="pa-0 black-font">
            <v-row
              v-for="(t, i) in trans[index]"
              :key="i"
              justify="start"
              no-gutters
              class="black-font"
            >
              <!-- <v-divider></v-divider> -->
              <v-col
                class="pt-2 pb-1"
                style="border-top: solid grey 1px; width: 100%"
              >
                &nbsp; {{ t | money }}
              </v-col>
              <v-col
                class="text-left pt-2 pb-1 pl-2"
                style="border-top: solid grey 1px; width: 100%"
              >
                <v-btn icon @click="removeRow(t, index, i)">
                  <v-icon> fas fa-times </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card
            depressed
            :style="{
              'background-color':
                cards[index].balance == 0 ? '#83b97b' : 'rgba(255,1,1 , 0.5)',
            }"
            class="white--text mt-1 black-font justify-center"
            block
            height="60"
          >
            <v-card-title
              v-if="cards[index].balance == 0"
              class="justify-center"
            >
              {{ $t("balanced") }}
            </v-card-title>
            <div v-else class="text-center pt-2">
              {{ $t("unbalanced") }}
              <br />
              <p style="font-size: small" v-if="cards[index].balance > 0">
                ({{ $t("shortage in real balance") }})
              </p>
              <p style="font-size: small" v-else>
                ({{ $t("excess in real balance") }})
              </p>
            </div>
          </v-card>
          <!-- <v-card
            v-else
            depressed
            style="background-color: #ff7e7e"
            class="white--text mt-1 black-font justify-center"
            block
            height="60"
            
          >
          <v-card-title class="justify-center">
           {{ $t("unbalanced") }}
          
            <div style="font-size: small" v-if="cards[index].balance > 0">({{ $t("excess in box") }})</div>
            <div style="font-size: small" v-else>({{ $t("shortage in box") }})</div>
          </v-card-title>
          </v-card> -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test-killua",
  data() {
    return {
      item: {
        convertToUSD: null,
      },
      trans: [],
      cards: [],
      vall: null,
      report_data: {
        has_headers: true,
        type: "Accounting",
        sub_type: "currencyCredit",
      },
    };
  },
  methods: {
    addTrans(val, index) {
      if (val.length == 0 || parseFloat(val) == 0) return;
      this.trans[index].push(parseFloat(val));
      this.cards[index].amount = null;
      this.cards[index].balance -= parseFloat(val);
    },
    clearTrans() {
      for (let arr of this.trans) {
        while (arr.length > 0) arr.pop();
      }
      this.cards.forEach((e, index) => {
        e.balance = this.active_accounts[index].balance;
      });
    },
    removeRow(val, index, i) {
      this.trans[index].splice(i, 1);
      this.cards[index].balance += parseFloat(val);
    },
    reset(val) {
      if (val.length > 0) {
        val.forEach((e) => {
          this.trans.push([]);
        });
        if (this.active_accounts[0] && !this.cards[0]) {
          this.active_accounts.forEach((e) => {
            this.cards.push({ amount: null, balance: e.balance });
          });
        }
      }
    },
  },
  computed: {
    ...mapState({
      active_accounts: (state) => state.auth.user.active_accounts,
      // report: (state) => state.report.all,
    }),
  },
  // mounted() {
  //   this.$store.dispatch("report/index", {
  //     accounts_ids: this.active_accounts.map(v => v.id),
  //     ...this.report_data,
  //   });

  // },
  // created() {
  //   // this.$store.dispatch("currency/index");

  //   if (this.active_accounts[0] && !this.cards[0]) {
  //     this.active_accounts.forEach((e) => {
  //       this.cards.push({ amount: null, balance: e.balance });
  //     });
  //   }
  // },
  filters: {
    money(value) {
      if (value) {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
      }
    },
  },
  watch: {
    active_accounts: {
      handler(val) {
        this.reset(val);
      },
      deep: true,
      immediate: true,
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
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>