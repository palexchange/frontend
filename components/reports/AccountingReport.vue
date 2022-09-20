<template>
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
      <v-form v-model="validated">
        <v-row>
          <v-col cols="12" md="3" sm="12">
            <AccountAutocomplete
              v-model="report_data.account"
              required
              holder="account"
              text="account"
            />
          </v-col>
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
        </v-row>
      </v-form>
    </v-col>

    <v-col cols="12" md="2" sm="12">
      <v-btn
        :loading="loading"
        @click="getDate()"
        class="primary"
        type="submit"
        >{{ $t("report create") }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      validated: true,
      report_data: {
        has_headers: true,
        type: "Accounting",
        sub_type: "accountStatementReport",
      },
      //   types: [
      //     { id: "public", name: this.$t("public") },
      //     { id: "detaild", name: this.$t("detaild") },
      //   ],
    };
  },
  methods: {
    getDate() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("report/index", { ...this.report_data });
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style>
</style>