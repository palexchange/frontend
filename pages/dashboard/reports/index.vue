<template>
  <div>
    <v-card :elevation="0" class="p-8 my-5">
      <v-btn @click="test">ahmad </v-btn>
      <v-btn @click="create_one = true"> تصدير </v-btn>
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
                saveAs(blob, "pal_report");
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
};
</script>

<style>
</style>