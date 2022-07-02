<template>
  <v-card>
    <v-card-title class="mb-10">
      <CrudHeader
        name="daily_meals"
        :to="'/daily_meals/form'"
        @filterClick="filter = !filter"
      />
    </v-card-title>
    <v-card-text>
      <v-row v-if="filter">
        <v-col cols="12">
          <component
            :is="'filtersInventoryFilter'"
            :params="params"
            module_name="daily_meal"
          />
        </v-col>
      </v-row>
      <DataTable module="daily_meal" :params="params" >
        <template v-slot:item.item.image_url="{ item }">
            <img width="64" height="64" :src="item.item.image_url" />
        </template>

      </DataTable>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      filter: false,
      params: {},
    };
  },
};
</script>

<style>
</style>