<template>
  <div>
    <Card class="mb-5 pt-3 pl-3 pr-6">
      <v-row class="mb-1">
        <v-col cols="12" xs="12" sm="6" lg="3">
          <AutoAccount
            text="commission account"
            holder="commission account"
            required
            v-model="item.commission_account_id"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6" lg="3">
          <AutoAccount
            text="transfer commission account"
            holder="transfer commission account"
            required
            v-model="item.transfer_commission_account_id"
            no_fetch
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6" lg="3">
          <AutoAccount
            text="returned commission account"
            holder="returned commission account"
            required
            v-model="item.returned_commission_account_id"
            no_fetch
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6" lg="3">
          <AutoAccount
            text="transfer expense account"
            holder="transfer expense account"
            required
            v-model="item.transfer_expense_account_id"
            no_fetch
          />
        </v-col>
      </v-row>
      <v-row class="mb-1">
        <v-col cols="12" xs="12" sm="6" lg="3">
          <AutoAccount
            text="exchange difference account"
            holder="exchange difference account"
            required
            v-model="item.exchange_difference_account_id"            
          />
        </v-col>
        <v-col class="text-left" align-self="center">
          <v-btn @click="save" color="primary" width="100">
            {{ $t("save") }}
          </v-btn>
        </v-col>
      </v-row>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
    };
  },
  methods: {
    save() {

      
     let items = Object.keys(this.item).map((key)=>{
          return{ 'key': key,'value':this.item[key]}; 
      });
      this.$save(items,'setting');
      // this.item.length = 0;
    }
  },
};
</script>

<style>
@media (min-width: 1280px) {
  .responseveCols > div > button {
    min-width: 300px !important;
    max-width: 300px !important;
  }
  @media (max-width: 1280px) {
    .responseveCols > div > button {
      min-width: 200px !important;
      max-width: 200px !important;
    }
  }
}
</style>