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
      expanded_item: [],
      params2: {},
      dialog: false,
    };
  },
  methods: {
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