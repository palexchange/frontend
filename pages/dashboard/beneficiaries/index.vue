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
              @click="$store.dispatch('setDialog', { name: 'AddBeneficiary' })"
              color="primary"
              v-bind="attrs"
              v-on="on"
              >{{ $t("add beneficiary") }}</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </Card>

    <DataTable module="party">
      <template v-slot:item.image="{ item }">
        <img :src="item.image ? item.image.url : ''" alt="" />
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import AutoComplete from "~/transfers/components/AutoComplete.vue";
export default {
  data() {
    return {
      form: {
        type: 0,
      },
    };
  },

  methods: {
    edit(item) {
      this.$store.dispatch("setDialog", {
        name: "AddBeneficiary",
        item,
      });
    },
    delete(item) {
      this.$store.dispatch("setModule", "party");
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
  computed: {
    ...mapState({
      action: (state) => state.context.action,
      item: (state) => state.context.item,
    }),
  },
  watch: {
    action(val) {
      if (val) {
        this[val](this.item);
      }
    },
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

