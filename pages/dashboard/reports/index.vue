<template>
  <div>
    <v-card :elevation="0" class="p-8 my-5">
      <v-row class="px-5">
        <v-col cols="3">
          <v-text-field
            label="الاسم للتصدير"
            outlined
            dense
            v-model="report_name"
          ></v-text-field
        ></v-col>
        <v-col cols="3"
          ><v-btn @click="create_one = true"> تصدير </v-btn></v-col
        >
      </v-row>

      <v-tabs v-model="seted_tab">
        <v-tab :key="i" v-for="(tab, i) in tabs"> {{ $t(tab.header) }}</v-tab>
        <v-tab-item :key="i" v-for="(tab, i) in tabs">
          <v-card flat>
            <v-card-text>
              <component
                :create_one="create_one"
                @download_item="(v) => download_item(v)"
                :is="tab.component_name"
              >
                <data-table
                  noActions
                  nums="#"
                  module="report"
                  hide_pagination
                />
              </component>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "admin",
  data() {
    return {
      seted_tab: 0,
      report_name: null,
      create_one: false,
      tabs: [
        {
          header: "account_statement_report",
          component_name: "ReportsAccountingReport",
        },
        {
          header: "profit_report",
          component_name: "ReportsProfitReport",
        },
        {
          header: "parties_report",
          component_name: "ReportsPartiesReportTotals",
        },
        {
          header: "parties_report",
          component_name: "ReportsPartiesReportOneCurrTotal",
        },
        // { header: "currencies report", component_name: "Card" },
        // { header: "courier report", component_name: "Card" },
      ],
    };
  },
  methods: {
    test() {
      this.$download_pdf();
    },
    download_item(report_date) {
      if (this.create_one) {
        this.create_one = false;
        this.$store
          .dispatch("report/index", {
            ...report_date,
            download: true,
            is_file: true,
          })
          .then((data) => {
            console.log(data);
            if (data) {
              if (data.type != "application/json") {
                let blob = new Blob([data], {
                  type: data.type,
                });
                saveAs(blob, this.report_name || "pal_report");
              }
            }
          });
      }
    },
  },
  computed: {
    ...mapState({
      report: (state) => state.report.all || [],
    }),
  },
  mounted() {
    this.$store.dispatch("account/index", { per_page: -1 });
  },
};
</script>

<style>
</style>