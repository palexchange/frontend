<template>
  <div>
    <!-- <Card> -->
    <DataTable module="exchange" show-expand :expanded="expanded_item">
      <template v-slot:expanded-item="{ headers, item }">
        {{rr()}}
        <td :colspan="headers.length">
          <DataTable
            module="exchange_detail"
            :params="params2"
          />
          
        </td>
      </template>
    </DataTable>
  <!-- </Card> -->
  </div>
</template>

<script>
export default {
  date() {
    return {
      expanded_item: [],
      params2:{},
      va: 0,
    }
  },
  watch: {
    expanded_item(val) {
      console.log("\n#############\n",val,"\n%%%%%%%%%%%%%%%%%%%%%%%%%%\n");
      if (val[0]) {
        this.params2 = {
          id: val[0].exchange_id ? val[0].exchange_id : "",
          per_page: 999,
        };
      }
    },
  },
  methods: {
    rr() {
      this.va = Math.random()*100;
      console.log("VA ======>>>>>>>>>>> ",this.va);
    }
  }
};
</script>

<style>
</style>