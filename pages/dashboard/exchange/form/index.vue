<template>
  <div>
    <!-- <Card> -->
    <DataTable
      single-expand
      module="exchange"
      show-expand
      :expanded.sync="expanded_item"
    >
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length" class="pa-0">
          <v-card color="primary" flat class="px-8">
            <DataTable
              hide_pagination
              no_class
              module="exchange_detail"
              :params="params2"
            />
          </v-card>
        </td>
      </template>
    </DataTable>
    <!-- </Card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded_item: [],
      params2: {},
      va: 0,
    };
  },
  watch: {
    expanded_item(val) {
      if (val[0]) {
        this.params2 = {
          exchange_id: val[0].id ? val[0].id : "",
          per_page: 999,
        };
      }
    },
  },
  methods: {
    rr() {
      this.va = Math.random() * 100;
      console.log("VA ======>>>>>>>>>>> ", this.va);
    },
  },
};
</script>

<style>
</style>