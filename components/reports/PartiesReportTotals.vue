<template>
  <div class="ReportsPartiesReportTotals">
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
                holder="from"
                text="from"
              />
            </v-col>
            <v-col>
              <DatePicker v-model="report_data.to_date" holder="to" text="to" />
            </v-col>
            <v-col>
              <v-checkbox
                true-value="1"
                false-value="2"
                v-model="report_data.show_zeros"
                label="عرض الارصدة الصفرية"
              >
              </v-checkbox>
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
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["create_one"],
  data() {
    return {
      loading: false,
      validated: true,
      report_data: {
        show_zeros: 2,
        has_headers: true,
        type: "Parties",
        sub_type: "partiesTotalInEveryCurr",
      },
      //   types: [
      //     { id: "public", name: this.$t("public") },
      //     { id: "detaild", name: this.$t("detaild") },
      //   ],
    };
  },
  methods: {
    getDate() {
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
    }),
  },
};
</script>

<style>
.ReportsPartiesReportTotals table {
  border-collapse: collapse;
}
.ReportsPartiesReportTotals table td,
.ReportsPartiesReportTotals table th {
  border: solid 1px black !important;
}
</style>
