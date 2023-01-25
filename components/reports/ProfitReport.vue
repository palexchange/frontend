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
        <v-form>
          <v-row>
            <v-col cols="12" md="3" sm="12">
              <DatePicker v-model="from" required holder="from" text="from" />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <DatePicker required v-model="to" holder="to" text="to" />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-checkbox
                :label="$t('show exchange rates')"
                v-model="show_exchange_rate"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col class="align-self-center" cols="12" md="2" sm="12">
        <v-btn @click="search()" class="primary">{{
          $t("report create")
        }}</v-btn>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th :key="i" v-for="(head, i) in headers">{{ head }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in all">
            <td>{{ i + 1 }}</td>
            <td>{{ item.created_at }}</td>
            <td v-for="tt in item.value">
              {{ tt.balance | money }}
              <div
                v-if="tt.open_exchange_rate >= 0 && show_exchange_rate"
                class="d-flex"
              >
                فتح:{{ tt.open_exchange_rate }} إغلاق:{{
                  tt.close_exchange_rate
                }}
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["create_one"],
  data() {
    return {
      item: {},
      from: {},
      to: {},
      show_exchange_rate: false,
    };
  },
  methods: {
    search() {
      this.$store.dispatch("inventory_log/index", {
        from: this.from,
        to: this.to,
      });
    },
    // getDate() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.$store.dispatch("report/index", { ...this.report_data });
    //     this.loading = false;
    //   }, 500);
    // },
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
      // report: (state) => state.report.all || [],
      all: (state) => JSON.parse(JSON.stringify(state.inventory_log.all)) || [],
    }),
    headers() {
      let headers = [];
      if (this.all && this.all[0]) {
        this.all[0].headers.unshift("تاريخالحركة");
        this.all[0].headers.unshift("#");
        headers = this.all[0].headers;
      }
      return headers;
    },
  },

  filters: {
    money(value) {
      if (value) {
        return parseFloat(value).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        });
      } else {
        return 0;
      }
    },
  },
};
</script>

<style>
.inner-table {
  border-collapse: collapse;
}
.inner-table td {
  border: 1px solid black;
  padding: 5px;
  text-align: center;
}
</style>