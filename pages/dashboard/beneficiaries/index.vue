<template>
  <div>
    <Card class="pa-5">
      <v-card-actions>
        <v-row>
          <v-col class="align-self-center">
            <span class="fs-20">{{ $t("show beneficiaries") }}</span>
          </v-col>
          <v-col v-if="show_filter" cols="6">
            <v-row>
              <v-col>
                <InputField
                  @input="search"
                  v-model="filters.name"
                  hide-details
                  holder="name"
                  text="name"
                  required
                />
              </v-col>
              <v-col>
                <InputField
                  @input="search"
                  v-model="filters.id_no"
                  hide-details
                  holder="رقم الهوية"
                  text="رقم الهوية"
                  required
                />
              </v-col>
              <v-col>
                <InputField
                  @input="search"
                  v-model="filters.mobile"
                  hide-details
                  holder="phone"
                  text="phone"
                  required
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col class="text-left align-self-center">
            <v-btn icon small @click="show_filter = !show_filter">
              <v-icon> fas fa-solid fa-search </v-icon>
            </v-btn>
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
      filters: {},
      show_filter: false,
      form: {
        type: 0,
      },
    };
  },

  methods: {
    search() {
      this.$store.dispatch("party/index", { ...this.filters });
    },
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
 

