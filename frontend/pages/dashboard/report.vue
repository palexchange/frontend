<template>
  <v-card>
    <v-card-title class="mb-10">
      <CrudHeader
        name="report"
        :to="'/items/form'"
        @filterClick="filter = !filter"
      />
    </v-card-title>
    <v-card-text>
      <v-row v-if="filter">
        <v-col cols="12">
          <component
            :is="'filtersReportFilter'"
            module_name="report"
            :params="params"
          />
        </v-col>
      </v-row>
      <v-data-table
        :items="items"
        :headers="$translateHeaders(headers)"
        class="elevation-2"
        mobile-breakpoint="0"
        :no-data-text="$t('search from the filter')"
        :items-per-page="-1"
        disable-pagination
        hide-default-footer
        id="report"
        ref="export"
      >
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      filter: false,
      params: {
        type: "accounting",
        sub_type: "account_statement_report",
      },
    };
  },
  async fetch() {
    await this.$store.dispatch("report/index", this.params);
  },
  computed: {
    ...mapState({
      items: (state) => state.report.all,
      headers: (state) => state.report.headers,
    }),
  },
};
</script>

<style>
</style>