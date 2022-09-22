<template>
  <div>
    <CrudHeader name="transfers">
      <v-btn icon color="black">
        <v-icon> fas fa-search </v-icon>
      </v-btn>
      <v-btn color="primary" to="transfers/outcoming">
        <span> {{ $t("add outcoming transfer") }} </span>
      </v-btn>
      <v-btn color="primary" to="transfers/incoming">
        <span> {{ $t("add incoming transfer") }} </span>
      </v-btn>
    </CrudHeader>

    <DataTable module="transfer" />
  </div>
</template>

<script>
import { mapState } from "vuex";
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
        name: `dashboard-transfers-${item.type == 0 ? "out" : "in"}coming-id`,
        params: {
          id: item.id,
        },
      });
    },
    show(item) {
      this.$router.push(
        `/dashboard/transfers/${item.type == 0 ? "out" : "in"}coming/${
          item.id
        }?show=true`
      );
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