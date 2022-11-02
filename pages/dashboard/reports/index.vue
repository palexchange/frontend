<template>
  <div>
    <v-card :elevation="0" class="p-8 my-5">
      <v-btn @click="create_one"> تصدير </v-btn>
      <v-tabs v-model="seted_tab">
        <v-tab :key="i" v-for="(tab, i) in tabs"> {{ $t(tab.header) }}</v-tab>
        <v-tab-item :key="i" v-for="(tab, i) in tabs">
          <v-card flat>
            <v-card-text>
              <component
                @download_item="(v) => handle(v)"
                :is="tab.component_name"
              />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <data-table noActions module="report" hide_pagination />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "admin",
  data() {
    return {
      download_item: null,
      seted_tab: 0,
      tabs: [
        {
          header: "account_statement_report",
          component_name: "ReportsAccountingReport",
        },
        // { header: "currencies report", component_name: "Card" },
        // { header: "courier report", component_name: "Card" },
      ],
    };
  },
  methods: {
    handle(v) {
      this.download_item = v;
    },
    create_one() {
      if (this.download_item && this.report[0]) {
        this.$store
          .dispatch("report/index", {
            ...this.download_item,
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