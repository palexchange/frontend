<template>
  <v-card>
    <v-card-title class="mb-10">
      <CrudHeader
        name="items"
        to="items/form"
        @filterClick="filter = !filter"
      />
    </v-card-title>
    <v-card-text>
      <v-row v-if="filter">
        <v-col cols="12">
          <component :is="'filtersItemFilter'" module_name="item" />
        </v-col>
      </v-row>
      <DataTable module="item">
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
        name: "dashboard-items-form-id",
        params: {
          id: item.id,
        },
      });
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
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
};
</script>

<style>
</style>