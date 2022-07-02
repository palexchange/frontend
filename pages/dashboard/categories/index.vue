<template>
  <v-card>
    <v-card-title class="mb-10">
      <CrudHeader
        name="categories"
        to="categories/form"
        @filterClick="filter = !filter"
      />
    </v-card-title>
    <v-card-text>
      <v-row v-if="filter">
        <v-col cols="12">
          <component :is="'filtersCategoryFilter'" module_name="category" />
        </v-col>
      </v-row>
      <DataTable module="category">
        <template v-slot:item.image_url="{ item }">
          <img width="64" height="64" :src="item.image_url" />
        </template>
      </DataTable>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      filter: false,
      params: {},
    };
  },
  methods: {
    edit(item) {
      this.$router.push({
        name: "dashboard-categories-form-id",
        params: {
          id: item.id,
        },
      });
    },
    // delete(item) {
    //   this.$remove(item, "item");
    // },
  },
  computed: {
    ...mapState({
      action: (state) => state.context.action,
      item: (state) => state.context.item,
    }),
  },
  watch: {
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
};
</script>

<style>
</style>