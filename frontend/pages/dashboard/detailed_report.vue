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
            :is="'filtersDetailedReportFilter'"
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
        group-by="order_number"
      >
        <template v-slot:group="{ headers, items }">
          <tr class="grey lighten-3">
            <td>
              {{ items[0].number }}
            </td>
            <td>
              {{ items[0].total }}
            </td>
            <td>
              {{ items[0].discount_total }}
            </td>
            <td>
              {{ items[0].taxed_total }}
            </td>
            <td>
              {{ items[0].issued_at }}
            </td>
          </tr>
          <tr>
            <th>{{$t('item_name')}}</th>
            <th>{{$t('item_quantity')}}</th>
            <th>{{$t('item_price')}}</th>
            <th>{{$t('item_discount')}}</th>
            <th>{{$t('total')}}</th>
          </tr>
          <tr v-for="(item,i) in items" :key="item.id">
            <td>
              {{item.item_name}}
            </td>
            <td>
              {{item.quantity}}
            </td>
            <td>
              {{(item.item_price||0).toFixed(2)}}
            </td>
            <td>
              {{(item.item_dicsount||0).toFixed(2)}}
            </td>
            <td>
              {{(item.total||0).toFixed(2)}}
            </td>
          </tr>
        </template>
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
        sub_type: "detailed_account_statement_report",
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