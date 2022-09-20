<template>
  <div>
    <v-card :elevation="0" class="p-8 my-5">
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
    <data-table module="report" hide_pagination />
  </div>
</template>

<script>
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
  },
};
</script>

<style>
</style>