<template>
  <div>
    <Card>
      <v-card-title>
      <Title title="add receipts" />
    </v-card-title>
      <v-card-text>
      <v-row>
        <v-col cols="12" class="text-left">
            <v-btn @click="$router.push('inputs/form')" color="primary">
              {{$t("add receipts")}}
            </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    </Card>
    <Card>
    <DataTable module="receipt" :params="{type:0}" />
  </Card>
  </div>
</template>

<script>
export default {

};
</script>
  
<style>
.rounding {
  border-radius: 4px !important;
}
@media (min-width: 1264px) {
  .lg5-custome-row > div {
    width: 20% !important;
    max-width: 20% !important;
    flex-basis: 20% !important;
  }
}
</style>