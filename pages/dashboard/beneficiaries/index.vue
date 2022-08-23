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
            <v-btn
              color="primary"
              @click="$store.dispatch('setDialog', 'AddBeneficiary')"
              >{{ $t("add beneficiary") }}</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </Card>
  <DataTable module="beneficiary" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortBy: "fat",
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
  
      form: {},
      item: {
        showDialgo: false,
      },
      dialog: false,
    };
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
      this.$save(this.form, "beneficiary");
      this.dialog = false;
      this.form = {};
    },
  },
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

