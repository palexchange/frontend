<template>
  <v-card class="pa-5">
    <v-row dense>
      <v-col>
        <v-card flat>
          <v-card-title> إضافة قيد </v-card-title>
          <!-- <v-card-subtitle>
            {{ $t("assign account to the user") }}
          </v-card-subtitle> -->

          <v-card-text>
            <v-form @submit.prevent="" v-model="validated">
              <v-row>
                <v-col cols="4">
                  <InputField
                    @change="() => refresh_number++"
                    required
                    text="statement"
                    holder="statement"
                    dense
                    v-model="entry.statement"
                  />
                </v-col>
                <!-- <v-col cols="4">
                  <CurrencyAutoComplete
                    required
                    text="العملة الأساسية"
                    holder="العملة الأساسية"
                    dense
                    v-model="entry.ref_currency_id"
                  />
                </v-col> -->
              </v-row>
            </v-form>
            <v-card flat>
              <table class="text-center entries-table">
                <tr>
                  <th style="width: 250px">{{ $t("account") }}</th>
                  <th style="width: 140px">{{ $t("debtor") }}</th>
                  <th style="width: 140px">{{ $t("creditor") }}</th>
                  <th style="width: 140px">{{ $t("currency") }}</th>
                  <th style="width: 140px">{{ $t("exchange_rate") }}</th>
                  <th style="width: 160px">{{ $t("debtor in usd") }}</th>
                  <th style="width: 160px">{{ $t("credetor in usd") }}</th>
                  <v-btn @click="addRow()" icon>
                    <v-icon color="green" size="12"> fas fa-plus </v-icon>
                  </v-btn>
                </tr>
                <tr
                  :key="index"
                  v-for="(transaction, index) in entry.transactions"
                >
                  <td>
                    <AccountAutocomplete
                      no_fetch
                      required
                      no_lable
                      :ref="`test${index}`"
                      append-icon=""
                      prepend-icon=""
                      filled
                      :outlined="false"
                      hide-details
                      rounded
                      return-object
                      @change="
                        (v) => {
                          transaction.currency_id = v.currency_id;
                          transaction.account_id = v.id;

                          transaction.exchange_rate = (
                            ($newCalcBuyPrice(
                              { id: 1 },
                              { id: v.currency_id }
                            ) *
                              1 +
                              $newCalcSalePrice(
                                { id: 1 },
                                { id: v.currency_id }
                              ) *
                                1) /
                            2
                          ).toFixed(4);

                          refresh_number++;
                        }
                      "
                    ></AccountAutocomplete>
                  </td>
                  <td>
                    <InputField
                      :key="refresh_number"
                      required
                      no_lable
                      @keydown.down="addRow()"
                      @change="
                        (v) => {
                          v > 0 ? (transaction.creditor = 0) : '';
                          refresh_number++;
                        }
                      "
                      filled
                      v-model.number="transaction.debtor"
                      rounded
                      :outlined="false"
                      hide-details
                      dense
                    />
                  </td>
                  <td>
                    <InputField
                      :key="refresh_number"
                      required
                      no_lable
                      @keydown.down="addRow()"
                      @change="
                        (v) => {
                          v > 0 ? (transaction.debtor = 0) : '';
                          refresh_number++;
                        }
                      "
                      dense
                      v-model.number="transaction.creditor"
                      filled
                      rounded
                      :outlined="false"
                      hide-details
                    />
                  </td>

                  <td>
                    <CurrencyAutoComplete
                      :key="refresh_number"
                      required
                      no_lable
                      append-icon=""
                      prepend-icon=""
                      @change="
                        (v) =>
                          (transaction.exchange_rate = (
                            ($newCalcBuyPrice({ id: 1 }, { id: v }) * 1 +
                              $newCalcSalePrice({ id: 1 }, { id: v }) * 1) /
                            2
                          ).toFixed(4))
                      "
                      dense
                      filled
                      v-model="transaction.currency_id"
                      rounded
                      :outlined="false"
                      hide-details
                    />
                  </td>
                  <td>
                    <InputField
                      :key="refresh_number"
                      @change="() => refresh_number++"
                      no_lable
                      dense
                      filled
                      v-model="transaction.exchange_rate"
                      rounded
                      :outlined="false"
                      hide-details
                    />
                  </td>
                  <td>
                    <InputField
                      @change="() => refresh_number++"
                      disabledd
                      dense
                      no_lable
                      filled
                      :value="calcDebitUs(transaction)"
                      rounded
                      :outlined="false"
                      hide-details
                    />
                  </td>
                  <td>
                    <InputField
                      @change="() => refresh_number++"
                      no_lable
                      disabledd
                      dense
                      filled
                      :value="calcCreditUs(transaction)"
                      rounded
                      :outlined="false"
                      hide-details
                    />
                  </td>

                  <v-btn @click="removeRow(index)" icon>
                    <v-icon color="red" size="12"> fas fa-times </v-icon>
                  </v-btn>
                </tr>
                <tr>
                  <td
                    colspan="5"
                    :style="{
                      color: balanced ? 'white' : 'black',
                      backgroundColor: balanced
                        ? '#59b259'
                        : 'rgb(240, 84, 84)',
                    }"
                  >
                    <v-col v-if="balanced">متزن</v-col>
                    <v-col class="white--text" v-else>غير متزن</v-col>
                  </td>
                  <td class="px-6" style="text-align: initial">
                    {{ parseFloat(totalDebit).toFixed(2) }}
                  </td>
                  <td class="px-6" style="text-align: initial">
                    {{ parseFloat(totalCredit).toFixed(2) }}
                  </td>
                </tr>
              </table>
            </v-card>
          </v-card-text>
          <v-card-text>
            <!-- <v-row>
              <v-col cols="3">{{ totalDebit }} إجمالي المدين</v-col>
              <v-col cols="3">{{ totalCredit }} إجمالي الدائن</v-col>
              <v-col cols="3">
                <h4 v-if="balanced">متزن</h4>
                <h4 v-else>غير متزن</h4>
              </v-col>
            </v-row> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog width="500" v-model="dialog">
      <v-sheet class="pa-5">
        <h4>هل انت متأكد من الحفظ ؟</h4>
        <v-btn
          class="primary"
          @click="
            dialog = false;
            confirm_save();
          "
          >نعم</v-btn
        >
        <v-btn @click="dialog = false">لا</v-btn>
      </v-sheet>
    </v-dialog>
    <v-row>
      <v-col class="text-center">
        <v-btn @click="save" :disabled="!disabled" color="primary" height="45">
          {{ $t("save") }}</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "create-entry",
  data() {
    return {
      expand: false,
      validated: false,
      dialog: false,
      refresh_number: 1,
      entry: {
        ref_currency_id: 1,
        date: this.$getDateTime(),
        status: 1,
        transactions: [{ exchange_rate: 1 }],
      },
    };
  },
  methods: {
    removeRow(index) {
      console.log(index);
      this.entry.transactions.splice(index, 1);
    },
    addRow() {
      // console.log(this.$refs[`test${index}`][0]);
      this.entry.transactions.push({ exchange_rate: 1 });
    },
    calcDebitUs(transaction) {
      let total = transaction.debtor / transaction.exchange_rate;
      return parseFloat(total || 0).toFixed(2);
    },
    calcCreditUs(transaction) {
      let total = transaction.creditor / transaction.exchange_rate;
      return parseFloat(total || 0).toFixed(2);
    },
    save() {
      this.dialog = true;
    },
    confirm_save() {
      this.$save(this.entry, "entry").then((data) => {
        if (data && data.id) {
          new Promise((resolve, reject) => {
            this.entry.transactions.forEach((element) => {
              element.ac_debtor = element.debtor / element.exchange_rate;
              element.ac_creditor = element.creditor / element.exchange_rate;
              console.log({ entry_id: data.id, ...element });
              this.$save(
                { entry_id: data.id, ...element },
                "entry_transaction"
              );
            });
            resolve();
          }).then(() => {
            this.validated = false;
            this.entry = {
              ref_currency_id: 1,
              date: this.$getDateTime(),
              status: 1,
              transactions: [],
            };
            this.$emit("closeDialog");
          });
        }
      });
    },
  },
  computed: {
    disabled() {
      return this.validated == true && this.balanced == true;
    },
    balanced() {
      if (this.totalCredit == 0 || this.totalDebit == 0) return false;
      return this.totalCredit == this.totalDebit;
    },
    totalDebit() {
      let total = this.entry.transactions.reduce((a, b) => {
        return a + parseFloat(this.calcDebitUs(b) || 0);
      }, 0);

      return (total * 1).toFixed(2);
    },
    totalCredit() {
      let total = this.entry.transactions.reduce((a, b) => {
        return a + parseFloat(this.calcCreditUs(b) || 0);
      }, 0);
      return (total * 1).toFixed(2);
    },
    ...mapState({
      dialog_item: (state) => state.state_dialog.item,
    }),
  },
  mounted() {},
  created() {
    this.$store.dispatch("account/index", this.params);
  },
  watch: {},
};
</script>

<style>
.entries-table .v-input__slot {
  justify-content: center;
}
.entries-table {
  width: 100%;
}
.entries-table {
  border-collapse: collapse;
}
.entries-table td,
.entries-table th {
  border: black solid 1px;
}
.entries-table th {
  padding: 5px;
  background: #e0e0ff;
}
</style>