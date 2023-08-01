<template>
  <div>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="addEntry()">
          {{ $t("add entry") }}</v-btn
        >
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col cols="11" v-if="show_filter">
          <v-row>
            <v-col>
              <AutoComplete
                @change="search"
                :items="entries_statuses"
                v-model="filters.status"
                hide-details
                holder="حالة القيد"
                text="حالة القيد"
              />
            </v-col>
            <v-col>
              <InputField
                @change="search"
                v-model="filters.id"
                hide-details
                holder="رقم القيد"
                text="رقم القيد"
                type="text"
              />
            </v-col>
            <v-col>
              <InputField
                @input="search"
                v-model="filters.like_statement"
                hide-details
                holder="البيان"
                text="البيان"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col class="text-left align-self-center">
          <v-btn icon small @click="show_filter = !show_filter">
            <v-icon> fas fa-solid fa-search </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <!-- <Card> -->
      <DataTable
        single-expand
        module="entry"
        show-expand
        :expanded.sync="expanded_item"
      >
        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length" class="pa-0">
            <v-card color="primary" flat class="px-8">
              <DataTable
                hide_pagination
                no_class
                module="entry_transaction"
                :params="params2"
                :noActions="true"
              />
            </v-card>
          </td>
        </template>
      </DataTable>
      <!-- </Card> -->
    </div>
    <v-dialog width="1200" v-model="dialog">
      <SettingsEntryCreate @closeDialog="() => (dialog = false)" />
    </v-dialog>
  </div>
</template>

 <script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      filters: {},
      show_filter: false,
      expanded_item: [],
      params2: {},
      entries_statuses: [
        { id: 0, name: "مسودة" },
        { id: 1, name: "معتمد" },
        { id: 255, name: "ملغى" },
      ],
      dialog: false,
    };
  },
  methods: {
    search() {
      this.$store.dispatch("entry/index", { ...this.filters });
    },
    addEntry() {
      this.dialog = true;
    },
    cancel(item) {
      this.$remove(item, "entry");
    },
  },
  watch: {
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
    expanded_item(val) {
      if (val[0]) {
        this.params2 = {
          entry_id: val[0].id ? val[0].id : "",
          per_page: -1,
        };
      }
    },
  },

  computed: {
    ...mapState({
      action: (state) => state.context.action,
      item: (state) => state.context.item,
    }),
  },
};
</script>
<style>
</style>