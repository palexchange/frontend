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
            <v-row>
              <v-col cols="4">
                <InputField
                  text="statement"
                  holder="statement"
                  dense
                  v-model="entry.statement"
                />
              </v-col>
              <v-col cols="4">
                <CurrencyAutoComplete
                  text="العملة الأساسية"
                  holder="العملة الأساسية"
                  dense
                  v-model="entry.ref_currency_id"
                />
              </v-col>
            </v-row>
            <v-card flat>
              <table class="text-center entries-table">
                <tr>
                  <th>{{ $t("account") }}</th>
                  <th>{{ $t("debtor") }}</th>
                  <th>{{ $t("creditor") }}</th>
                  <th>{{ $t("exchange_rate") }}</th>
                  <v-btn @click="entry.transactions.push({})" icon>
                    <v-icon color="green" size="12"> fas fa-plus </v-icon>
                  </v-btn>
                </tr>
                <tr
                  :key="index"
                  v-for="(transaction, index) in entry.transactions"
                >
                  <td>
                    <AccountAutocomplete
                      append-icon=""
                      prepend-icon=""
                      filled
                      :outlined="false"
                      hide-details
                      rounded
                      v-model="transaction.account_id"
                    ></AccountAutocomplete>
                  </td>
                  <td>
                    <InputField
                      filled
                      v-model.number="transaction.ac_debtor"
                      rounded
                      :outlined="false"
                      hide-details
                      dense
                    />
                  </td>
                  <td>
                    <InputField
                      dense
                      v-model.number="transaction.ac_creditor"
                      filled
                      rounded
                      :outlined="false"
                      hide-details
                    />
                  </td>
                  <td>
                    <InputField
                      dense
                      filled
                      v-model="transaction.exchange_rate"
                      rounded
                      :outlined="false"
                      hide-details
                    />
                  </td>

                  <v-btn
                    v-if="index + 1 != entry.transactions.length"
                    @click="entry.transactions.splice(index, 1)"
                    icon
                  >
                    <v-icon color="red" size="12"> fas fa-times </v-icon>
                  </v-btn>
                </tr>
                <tr>
                  <td style="border: none"></td>
                  <td>{{ totalDebit }}</td>
                  <td>{{ totalCredit }}</td>
                  <td
                    :style="{
                      backgroundColor: balanced ? 'white' : 'rgb(240, 84, 84)',
                    }"
                  >
                    <v-col v-if="balanced">متزن</v-col>
                    <v-col class="white--text" v-else>غير متزن</v-col>
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
    <v-row>
      <v-col class="text-center">
        <v-btn @click="save" color="primary" height="45">
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
      entry: { date: this.$getDateTime(), status: 1, transactions: [{}] },
    };
  },
  methods: {
    save() {
      this.$save(this.entry, "entry").then((data) => {
        console.log(data);
        if (data && data.id) {
          this.entry.transactions.forEach((element) => {
            element.debtor = element.exchange_rate * element.ac_debtor;
            element.creditor = element.exchange_rate * element.ac_creditor;
            this.$save({ entry_id: data.id, ...element }, "entry_transaction");
          });
        }
      });
    },
  },
  computed: {
    balanced() {
      return this.totalCredit == this.totalDebit;
    },
    totalDebit() {
      return this.entry.transactions.reduce((a, b) => {
        return a + parseFloat(b.ac_debtor || 0);
      }, 0);
    },
    totalCredit() {
      return this.entry.transactions.reduce((a, b) => {
        return a + parseFloat(b.ac_creditor || 0);
      }, 0);
    },
    ...mapState({
      dialog_item: (state) => state.state_dialog.item,
    }),
  },
  mounted() {},
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
}
</style>