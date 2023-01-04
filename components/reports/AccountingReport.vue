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
          @click="getDate()"
          class="primary"
          type="submit"
          >{{ $t("report create") }}</v-btn
        >
      </v-col>
    </v-row>
    <data-table noActions nums="#" module="report" hide_pagination />
    <v-row dense class="pa-5">
      <v-col>
        <v-text-field receipt.amoiunt outlined dense label="الكمية">
        </v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="Amount(1)" class="pa-4" color="info">
          استلام دفعة ↓</v-btn
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
  data() {
    return {
      loading: false,
      validated: true,
      report_data: {
        has_headers: true,
        type: "Accounting",
        sub_type: "accountStatementReport",
      },
      //   types: [
      //     { id: "public", name: this.$t("public") },
      //     { id: "detaild", name: this.$t("detaild") },
      //   ],
    };
  },
  methods: {
    Amount(in_or_out) {
      if (in_or_out > 0) {
      } else {
      }
    },
    getDate() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("report/index", { ...this.report_data });
        this.loading = false;
      }, 500);
    },
  },
  watch: {
    report(val) {
      if (val[0]) {
        this.$emit("download_item", this.report_data);
      }
    },
  },
  computed: {
    ...mapState({
      report: (state) => state.report.all || [],
    }),
  },
};
</script>

<style>
</style>