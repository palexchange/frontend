<template>
  <div>
    <!-- <Card> -->
    <Card class="pa-5">
      <v-card-actions>
        <v-row>
          <v-col cols="2" class="align-self-center">
            <h1 class="fs-20">{{ $t("exchange") }}</h1>
          </v-col>
          <!-- <v-col class="text-left align-self-center">
            <v-btn icon small @click="show_filter = !show_filter">
              <v-icon> fas fa-solid fa-search </v-icon>
            </v-btn>
            <span>&nbsp;&nbsp;</span>
          </v-col> -->
        </v-row>
      </v-card-actions>
    </Card>
    <Card v-show="show_filter" class="pa-5">
      <v-row dense align="center">
        <v-col>
          <CurrencyAutoComplete
            clearabler
            v-model="filters.from_currency_id"
            text="from currency"
            hide-details
            holder="from currency"
          ></CurrencyAutoComplete>
        </v-col>

        <v-col>
          <CurrencyAutoComplete
            clearabler
            hide-details
            v-model="filters.to_currency_id"
            text="to currency"
            holder="to currency"
          ></CurrencyAutoComplete>
        </v-col>
        <v-col>
          <BeneficiaryAutocomplete
            v-model="filters.party_id"
            hide-details
            holder="party_name"
            text="party_name"
          />
        </v-col>
        <v-col>
          <UserAutocomplete
            clearabler
            hide-details
            v-model="filters.user_action_id"
            text="user name"
            holder="user name"
          ></UserAutocomplete>
        </v-col>
        <v-col>
          <AutoComplete
            :items="transfers_statuses"
            v-model="filters.status"
            hide-details
            holder="exchange status"
            text="exchange status"
          />
        </v-col>
        <v-col
          ><DatePicker hide_details v-model="filters.from" text="from_date" />
        </v-col>
        <v-col>
          <DatePicker hide_details v-model="filters.to" text="to_date" />
        </v-col>
        <v-col cols="1" class="py-0 mt-4">
          <v-btn @click="search" color="primary"> بحث </v-btn>
        </v-col>
      </v-row>
    </Card>
    <DataTable
       
      module="exchange"
      show-expand
      :params="params"
      :expanded.sync="expanded_item"
    >
      <template v-slot:expanded-item="{ headers , item}">
        <td :colspan="headers.length" class="pa-0">
          <v-card color="primary" flat class="px-8">
            <v-data-table
              :headers="detial_headers"
              hide-default-footer
              :items="item.details"
            >
              <template v-slot:item.type="{ item }">
                <div >
                  {{ [$t("from"), $t("to")][item.type - 1] }};
                </div>
              </template>
              <template v-slot:item.amount="{ item }">
                <div class="text-h6 font-weight-bold" :style="item.type == 1 ? 'color:green' : 'color:red'">
                  {{ item.amount }}
                  {{  item.type == 1 ? '+':'-' }}
                </div>
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
    </DataTable>
    <!-- </Card> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
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
      show_filter: true,
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
      action: (state) => state.context.action,
      item: (state) => state.context.item,
      setting_time: (state) => state.setting.one,
    }),
  },
  watch: {
    expanded_item(val) {
      console.log(val);
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
  // created() {
  //   this.$store.dispatch("setting/show", "time_allowed_for_deletion");
  // },
  methods: {
    search() {
      this.params = {
        ...this.filters,
      };
    },
    cancel(item) {
      this.$remove(item, "exchange");
    },
    remove(item) {
      console.log(this.module_name);
      if (!this.checkTimeValidForDeletion(new Date(item.created_at))) {
        console.log("In No Enought time Block");
        this.$swal({
          title: this.$t("Error Happend"),
          text: this.$t(
            "You can't delete, more time than the allowed has passed"
          ),
          icon: "error",
          confirmButtonText: this.$t("Ok"),
        }).then((v) => {
          return;
        });
      } else {
        this.$swal({
          title: this.$t("confirm"),
          text: this.$t("are_you_sure"),
          icon: "error",
          confirmButtonText: this.$t("delete"),
        }).then((v) => {
          if (v.value) {
            this.$store.dispatch(`exchange/delete`, item);
          }
        });
      }
    },
    checkTimeValidForDeletion(date) {
      let tempDate = new Date(
        date.getTime() + 60 * 1000 * parseInt(this.setting_time.value)
      );
      // console.log("TempDate Constructor: ",tempDate.getTime());
      // console.log("date getMin: ",date.getMinutes());
      // tempDate.setMinutes(date.getMinutes() + parseInt(this.setting_time.value));
      // console.log("TempDate setMin: ",tempDate.getTime());
      // tempDate = new Date(tempDate);
      let now = new Date();
      let diff = tempDate.getTime() - now.getTime();
      console.log("TempDate: ", tempDate);
      console.log("Now: ", now);
      console.log("TempDate: ", diff);
      return diff > 0;
    },
  },
  mounted() {
    this.params = {
      ...this.filters,
      from: this.$getDateTime().slice(0, 10),
      to: this.$getDateTime().slice(0, 10),
    };
  },
};
</script>

<style>
</style>
