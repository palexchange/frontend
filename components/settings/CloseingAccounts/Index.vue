<template>
  <div>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="addReceipt()">
          {{ $t("add transaction") }}</v-btn
        >
      </v-col>
    </v-row>
    <div>
      <!-- <Card> -->
      <DataTable
        :params="params"
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
              />
            </v-card>
          </td>
        </template>
      </DataTable>
      <!-- </Card> -->
    </div>
    <v-dialog width="1100" v-model="dialog">
      <SettingsEntryCreate />
    </v-dialog>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      expanded_item: [],
      params2: {},
      params: {
        statement: "closing_fund",
      },
      dialog: false,
    };
  },
  methods: {
    addReceipt() {
      this.$store.dispatch("setDialog", {
        name: "SettingsCloseingAccountsCreate",
      });
    },
  },
  watch: {
    expanded_item(val) {
      if (val[0]) {
        this.params2 = {
          entry_id: val[0].id ? val[0].id : "",
          per_page: -1,
        };
      }
    },
  },
};
</script>
<style>
</style>