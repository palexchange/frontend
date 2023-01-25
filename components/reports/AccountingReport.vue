<template>
  <div>
    <v-row>
      <v-col cols="12" md="10" sm="12">
        <v-form v-model="validated">
          <v-row>
            <v-col>
              <AccountAutocomplete
                v-model="report_data.account"
                required
                holder="account"
                text="account"
              />
            </v-col>
            <v-col>
              <DatePicker
                v-model="report_data.from"
                required
                holder="from"
                text="from"
              />
            </v-col>
            <v-col>
              <DatePicker
                required
                v-model="report_data.to"
                holder="to"
                text="to"
              />
            </v-col>
            <v-col>
              <UserAutocomplete
                clearable
                v-model="report_data.for_user_id"
                holder="user"
                text="user"
              />
            </v-col>
            <v-col>
              <CurrencyAutoComplete
                clearable
                multiple
                v-model="report_data.currency_id"
                holder="currency"
                text="currency"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col class="align-self-center" cols="12" md="2" sm="12">
        <v-btn
          :disabled="!validated"
          :loading="loading"
          @click="getData()"
          class="primary"
          type="submit"
          >{{ $t("report create") }}</v-btn
        >
      </v-col>
    </v-row>
    <slot />
    <v-row v-if="report_data.account" dense class="pa-5">
      <v-col>
        <v-text-field
          type="number"
          v-model.number="receipt.amount"
          outlined
          dense
          label="المبلغ"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <CurrencyAutoComplete
          v-model="receipt.currency_id"
          :label="$t('currency')"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model.number="receipt.statement"
          outlined
          dense
          :label="$t('statement')"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="Amount(1)" class="pa-4" color="info"
          >استلام دفعة ↓</v-btn
        >

        <v-btn @click="Amount(-1)" class="pa-4" color="error">
          صرف دفعة ↑</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["create_one"],
  data() {
    return {
      currency_signs: [],
      loading: false,
      receipt: {},
      validated: true,
      report_data: {
        has_headers: true,
        type: "Accounting",
        sub_type: "accountStatementReport",
      },
    };
  },
  methods: {
    Amount(in_or_out) {
      if (!(this.receipt.amount > 0)) return;
      if (!this.receipt.currency_id) return;
      const receipt = {};
      receipt.type = in_or_out > 0 ? 1 : 2;
      receipt.currency_id = this.receipt.currency_id || 1;
      receipt.status = 1;
      receipt.exchange_rate = this.stocks.find(
        (c) => c.currency_id == (this.receipt.currency_id || 1)
      ).mid;
      receipt.from_amount = this.receipt.amount;
      receipt.to_amount = this.receipt.amount / receipt.exchange_rate;
      receipt.to_account_id = this.user.active_accounts.find((e) => {
        return receipt.currency_id == e.currency_id;
      }).id;
      receipt.from_account_id = this.report_data.account;
      receipt.statement = this.receipt.statement;
      this.$save(receipt, "receipt").then(() => {
        this.getData();
        this.receipt = {};
      });
    },
    getData() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("report/index", { ...this.report_data });
        this.loading = false;
      }, 500);
    },
  },
  watch: {
    create_one: {
      handler(val) {
        if (val) this.$emit("download_item", this.report_data);
      },
    },
  },
  computed: {
    ...mapState({
      report: (state) => state.report.all || [],
      stocks: (state) => state.stock.all || [],
      user: (state) => state.auth.user || [],
    }),
  },
};
</script>

<style>
</style>