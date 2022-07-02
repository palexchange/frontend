<template>
  <v-card>
    <v-card-title class="mb-10">
      <CrudHeader
        name="customers"
        :to="'customers/form'"
        @filterClick="filter = !filter"
      />
    </v-card-title>
    <v-card-text>
      <v-row v-if="filter">
        <v-col cols="12">
          <component :is="'filtersCustomerFilter'" module_name="user" />
        </v-col>
      </v-row>
      <DataTable module="user" :params="params">
        <template v-slot:item.status="{ item }">
          <span
            class="font-weight-bold"
            :style="`color:${colors[item.status]}`"
          >
            {{ $t(status[item.status]) }}
          </span>
        </template>
      </DataTable>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      filter: false,
      params: {
        type: 2,
      },
      status: ["pending", "active", "cancelled","stopped"],
      colors: ["yellow", "green", "red","red"],
    };
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
  methods: {
    edit(item) {
      this.$router.push({
        name: "dashboard-customers-form-id",
        params: {
          id: item.id,
        },
      });
    },
    activate(item) {
      this.$save({ status: 1, id: item.id }, "user");
    },
    cancel(item) {
      this.$save({ status: 3, id: item.id }, "user");
    },
    stop(item) {
      this.$save({ status: 3, id: item.id }, "user");
    },
  },
};
</script>

<style>
</style>