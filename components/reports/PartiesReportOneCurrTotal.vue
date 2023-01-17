<template>
  <div>
    <v-row>
      <!-- <v-col cols="12" md="2" sm="12">
        <Autocomplete
          v-model="report_data.sub_type"
          :report_datas="types"
          holder="report type"
          text="report type"
        />
      </v-col> -->
      <v-col cols="12" md="10" sm="12">
        <v-form v-model="validated">
          <v-row>
            <v-col>
              <DatePicker
                v-model="report_data.from_date"
                required
                holder="from"
                text="from"
              />
            </v-col>
            <v-col>
              <DatePicker
                required
                v-model="report_data.to_date"
                holder="to"
                text="to"
              />
            </v-col>
            <v-col>
              <CurrencyAutoComplete
                clearabler
                required
                v-model="report_data.currency_id"
                text="currency"
                holder="currency"
              >
              </CurrencyAutoComplete>
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
        currency_id: 1,
        has_headers: true,
        type: "Parties",
        sub_type: "partiesTotalInOneCurr",
      },
      //   types: [
      //     { id: "public", name: this.$t("public") },
      //     { id: "detaild", name: this.$t("detaild") },
      //   ],
    };
  },
  methods: {
    getData() {
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