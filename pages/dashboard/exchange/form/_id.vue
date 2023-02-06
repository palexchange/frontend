<template>
  <div>
    <!-- <Card> -->

    <v-data-table
      single-expand
      hide-default-footer
      show-expand
      :expanded.sync="expanded_item"
      :headers="headers"
      :items="[one]"
    >
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length" class="pa-0">
          <v-card color="primary" flat class="px-8">
            <v-data-table
              :headers="detial_headers"
              hide-default-footer
              :items="detail_items"
            >
              <template v-slot:item.type="{ item }">
                {{ [$t("from"), $t("to")][item.type - 1] }};
              </template>
            </v-data-table>
            <!-- <DataTable
              hide_pagination
              no_class
              module="exchange_detail"
              :params="params2"
              :noActions="true"
            /> -->
          </v-card>
        </td>
      </template>
    </v-data-table>
    <!-- </Card> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      headers: [
        { align: "center", text: `${this.$t("id")}`, value: "id" },

        {
          align: "center",
          text: `${this.$t("user_name")}`,
          value: "user.name",
        },
        { align: "center", text: `${this.$t("profit")}`, value: "profit" },
        {
          align: "center",
          text: `${this.$t("party_name")}`,
          value: "party_name",
        },
        {
          align: "center",
          text: `${this.$t("status")}`,
          value: "status",
        },
        {
          align: "center",
          text: `${this.$t("date")}`,
          value: "date",
        },
      ],
      detial_headers: [
        { align: "center", text: `${this.$t("id")}`, value: "id" },
        {
          align: "center",
          text: `${this.$t("exchange_id")}`,
          value: "exchange_id",
        },
        {
          align: "center",
          text: `${this.$t("type")}`,
          value: "type",
        },
        { align: "center", text: `${this.$t("amount")}`, value: "amount" },
        {
          align: "center",
          text: `${this.$t("currency_name")}`,
          value: "currency_name",
        },
        {
          align: "center",
          text: `${this.$t("exchange_rate")}`,
          value: "exchange_rate",
        },
      ],
      show_filter: false,
      expanded_item: [],
      params2: {},
      params: {},
      detail_items: [],
      filters: {
        from: new Date().toISOString().slice(0, 10),
        to: new Date().toISOString().slice(0, 10),
      },
      va: 0,
      transfers_statuses: [
        { id: 0, name: "مسودة" },
        { id: 1, name: "معتمدة" },
        { id: 255, name: "ملغاة" },
      ],
    };
  },
  computed: {
    ...mapState({
      one: (state) => state.exchange.one,
    }),
  },
  watch: {
    one(val1) {
      console.log("val1");
      console.log(val1);
    },
    expanded_item(val) {
      if (val[0]) {
        this.detail_items = val[0].details;
        // this.params2 = {
        //   exchange_id: val[0].id ? val[0].id : "",
        //   per_page: -1,
        // };
      }
    },
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
  },

  methods: {
    search() {
      this.params = { ...this.filters };
    },
    cancel(item) {
      this.$remove(item, "exchange");
    },
  },
  mounted() {
    if (this.one && this.one.id) {
      this.expanded_item = [this.one];
      // setTimeout(() => {
      //   this.$store.dispatch("exchange/index", { exchange_id: this.one.id });
      // }, 500);
    } else {
      this.$router.push("/dashboard/exchange/form");
    }
  },
};
</script>

<style>
</style>
