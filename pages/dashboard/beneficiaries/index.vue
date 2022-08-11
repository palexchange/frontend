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
            <v-dialog transition="dialog-top-transition" max-width="800">
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
                        <InputField holder="beneficiary name"></InputField>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <InputField holder="mobile"></InputField>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <InputField holder="id number"></InputField>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <InputField holder="address"></InputField>
                      </v-col>
                      <v-col cols="12" sm="4" xs="12">
                        <InputField holder="default currency"></InputField>
                      </v-col>
                    </v-row>
                    <v-row class="button-responsive">
                      <v-col class="text-center">
                        <v-btn color="primary" height="45">
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

    <v-data-table
      :headers="headers"
      items-per-page="5"
      hide-default-footer
      :items="desserts"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="my-table"
    />
    <v-pagination
 
      style="width: fit-content; margin: auto; background-color: #f5f5f5"
 
      :next-icon="$t('nextt')"
      :prev-icon="$t('prevv')"
      color="transparent"
    ></v-pagination>
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
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6,
          carbs: 24,
          protein: 4,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16,
          carbs: 23,
          protein: 6,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0,
          carbs: 94,
          protein: 0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
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

.my-table thead th {
  border-bottom: 16px solid #EEEEEE !important;
}
.my-table tbody td {
  border-bottom: 16px solid #EEEEEE !important;
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

