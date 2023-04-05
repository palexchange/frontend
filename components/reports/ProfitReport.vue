<template>
  <div>
    <v-row>
      <!-- <v-col cols="12" md="2" sm="12">
      <Autocomplete
        v-model="report_data.report_data.sub_type"
        :report_datas="types"
        holder="report type"
        text="report type"
      />
    </v-col> -->
      <v-col cols="12" md="10" sm="12">
        <v-form>
          <v-row>
            <v-col cols="12" md="3" sm="12">
              <DatePicker
                v-model="report_data.from"
                required
                holder="from"
                text="from"
              />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <DatePicker
                required
                v-model="report_data.to"
                holder="to"
                text="to"
              />
            </v-col>
            <v-col cols="12" md="3" sm="12">
              <v-checkbox
                false-value="0"
                true-value="1"
                :label="$t('show daily profit')"
                v-model="report_data.show_daily_profit"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col class="align-self-center" cols="12" md="2" sm="12">
        <v-btn :loading="loading" @click="search()" class="primary">{{
          $t("report create")
        }}</v-btn>
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
      report_data: {
        show_daily_profit: 0,
        has_headers: true,
        type: "Profit",
        sub_type: "profit",
      },
    };
  },
  methods: {
    getData() {},
    search() {
      this.loading = true;
      this.$store.dispatch("report/index", { ...this.report_data }).then(() => {
        this.loading = false;
      });

      // this.$store.dispatch("inventory_log/index", {
      //   from: this.from,
      //   to: this.to,
      // });
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