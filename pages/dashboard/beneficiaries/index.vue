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
 

