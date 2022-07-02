<template>
  <v-card>
    <v-card-title class="mb-10">
      <CrudHeader
        name="report"
        :to="'/items/form'"
        @filterClick="filter = !filter"
        :report="true"
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
        :loading="loading"
      >
        <template v-slot:group="{ headers, items }">
          <tr class="grey lighten-3">
            <td>
              {{ items[0].number }}
            </td>
            <td>
              {{ parseFloat(items[0].total).toFixed(2) }}
            </td>
            <td>
              {{ parseFloat(items[0].total_discount).toFixed(2) }}
            </td>
            <td>
              {{ parseFloat(items[0].taxed_total).toFixed(2) }}
            </td>
            <td>
              {{ new Date(items[0].issued_at).toLocaleDateString("ar") }}
            </td>
          </tr>
          <tr>
            <th>{{ $t("item_name") }}</th>
            <th>{{ $t("item_quantity") }}</th>
            <th>{{ $t("item_price") }}</th>
            <th>{{ $t("item_discount") }}</th>
            <th>{{ $t("total") }}</th>
          </tr>
          <tr v-for="(item, i) in items" :key="item.id">
            <td>
              {{ item.item_name }}
            </td>
            <td>
              {{ item.item_quantity }}
            </td>
            <td>
              {{ (parseFloat(item.item_price) || 0).toFixed(2) }}
            </td>
            <td>
              {{ (parseFloat(item.item_dicsount) || 0).toFixed(2) }}
            </td>
            <td>
              {{ (parseFloat(item.item_total) || 0).toFixed(2) }}
            </td>
          </tr>
        </template>
        <template v-slot:body.append="{ headers, items }">
          <tr class="grey lighten-3">
            <td>{{ $t("total") }}</td>
            <td style="padding: 12px">
              {{
                items.reduce((c, n) => c + parseFloat(n.item_quantity), 0).toFixed(2)
              }}
            </td>
            <td style="padding: 12px">-</td>
            <td style="padding: 12px">
              {{
                items
                  .reduce((c, n) => c + parseFloat(n.item_dicsount || 0), 0)
                  .toFixed(2)
              }}
            </td>
            <td style="padding: 12px">
              {{
                items
                  .reduce(
                    (c, n) =>
                      c +
                      parseFloat(
                        n.item_price * n.item_quantity - (n.item_discount || 0)
                      ),
                    0
                  )
                  .toFixed(2)
              }}
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
      filter: true,
      params: {
        type: "accounting",
        sub_type: "detailed_account_statement_report",
      },
    };
  },
  async fetch() {
    await this.$store.dispatch(
      "report/index",
      JSON.parse(JSON.stringify(this.params))
    );
  },
  computed: {
    ...mapState({
      items: (state) => state.report.all,
      headers: (state) => state.report.headers,
      loading: (state) => state.loading,
    }),
  },
};
</script>

<style>
</style>