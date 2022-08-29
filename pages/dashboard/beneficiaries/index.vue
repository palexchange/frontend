<template>
  <div>
    <Card class="pa-5">
      <v-card-actions>
        <v-row>
          <v-col cols="12" sm="6" xs="12">
            <span class="fs-20">{{ $t("show beneficiaries") }}</span>
          </v-col>
          <v-col cols="12" sm="6" xs="12" class="text-left">
            <v-icon> fas fa-solid fa-search </v-icon>
            <span>&nbsp;&nbsp;</span>
            <v-dialog
              transition="dialog-top-transition"
              max-width="800"
              v-model="dialog"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">{{
                  $t("add beneficiary")
                }}</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="primary" dark
                    ><v-spacer></v-spacer> {{ $t("add beneficiary") }}
                    <v-spacer></v-spacer
                  ></v-toolbar>
                  <v-card-text class="pa-6">
                    <v-row>
                      <v-col cols="12" sm="4" xs="12">
                        <InputField
                          v-model="form.name"
                          holder="beneficiary name"
                        ></InputField>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <InputField
                          v-model="form.phone"
                          holder="phone"
                        ></InputField>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <InputField
                          v-model="form.id_no"
                          holder="id number"
                        ></InputField>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <InputField
                          v-model="form.address"
                          holder="address"
                        ></InputField>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <AutoComplete
                          :items="all_countries"
                          v-model="form.country_id"
                          holder="country"
                        >
                        </AutoComplete>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <CityAutocomplete v-model="form.city_id">
                        </CityAutocomplete>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <AutoComplete
                          :items="all_currencies"
                          v-model="form.currency_id"
                          holder="default currency"
                        >
                        </AutoComplete>
                      </v-col>
                    </v-row>
                    <v-row class="button-responsive">
                      <v-col class="text-center">
                        <v-btn @click="save" color="primary" height="45">
                          {{ $t("save") }}</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn color="primary" @click="dialog.value = false">{{
                      $t("close")
                    }}</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card-actions>
    </Card>

    <DataTable module="party"></DataTable>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import AutoComplete from "~/transfers/components/AutoComplete.vue";
export default {
  data() {
    return {
      sortDesc: false,
      headers: [
        {
          text: "beneficiary",
          align: "start",
          value: "name",
        },
        { text: "mobile", value: "calories" },
        { text: "address", value: "fat" },
        { text: "identity", value: "carbs" },
        { text: "actions", value: "protein" },
      ],
      form: {
        type: 0,
      },
      item: {
        showDialgo: false,
      },
      dialog: false,
    };
  },
  computed: {
    ...mapState({
      all_currencies: (state) => state.currency.all,
      all_countries: (state) => state.country.all,
      all_cities: (state) => state.city.all,
    }),
  },
  methods: {
    toggleOrder() {
      this.sortDesc = !this.sortDesc;
    },
    nextSort() {
      let index = this.headers.findIndex((h) => h.value === this.sortBy);
      index = (index + 1) % this.headers.length;
      this.sortBy = this.headers[index].value;
    },
    save() {
      this.$save(this.form, "party");
      this.dialog = false;
      this.form = {};
    },
    getBeneficiaries() {
      this.$store.dispatch[("party", index)];
    },
  },
  created() {
    this.$store.dispatch("currency/index");
    this.$store.dispatch("country/index");
  },
  // components: { AutoComplete },
};
</script>

<style>
/* .main-body .row-3 .table {
  margin-bottom: 0;
} */

.my-table th {
  padding: 20px 0px !important;
  font-weight: normal;
  color: #000 !important;
  font-size: 14px !important;
  text-align: center !important;
}

.my-table th::after {
  content: " | ";
  display: inline-block;
  /* padding-left: 10px; */
  padding: 0px 20px;
  color: rgba(67, 46, 140, 0.5);
}

.my-table th:last-child::after {
  content: "";
}
.my-table tr {
  border-radius: 20px !important;
}
.my-table thead th {
  border-bottom: 16px solid #eeeeee !important;
}
.my-table tbody td {
  border-bottom: 16px solid #eeeeee !important;
}
.my-table thead > tr > th,
.my-table tbody > td {
  padding: 20px 0px !important;
  text-align: center !important;
}
.my-table tbody > tr:hover {
  background-color: transparent !important;
}

.my-table tbody,
.my-table td {
  padding: 20px 0px !important;
  text-align: center !important;
  font-weight: normal;
  color: #000 !important;
  font-size: 13px !important;
}
.v-pagination__item {
  box-shadow: none !important;
  font-size: 1.075rem !important;
}
.v-pagination__item:hover {
  color: #ff7171 !important ;
}
.v-pagination__navigation {
  box-shadow: none !important;
  padding: 0px 30px;
  font-size: 12px !important;
}
.v-pagination__navigation > * {
  font-size: 15px !important;
  font-weight: 700 !important;
}

.v-pagination__item--active {
  color: #ff7171 !important ;
}
</style>

