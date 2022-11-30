<template>
  <div>
    <CrudHeader name="moneygram">
      <v-btn icon color="black">
        <v-icon> fas fa-search </v-icon>
      </v-btn>
      <v-btn color="primary" to="moneygram/outcoming">
        <span> {{ $t("add outcoming moneygram") }} </span>
      </v-btn>
      <v-btn color="primary" to="moneygram/incoming">
        <span> {{ $t("add incoming moneygram") }} </span>
      </v-btn>
    </CrudHeader>
    <DataTable :params="{ delivering_type: [2] }" module="transfer" />
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
        name: `dashboard-moneygram-${item.type == 0 ? "out" : "in"}coming-id`,
        params: {
          id: item.id,
        },
      });
    },
    show(item) {
      this.$router.push(
        `/dashboard/moneygram/${item.type == 0 ? "out" : "in"}coming/${
          item.id
        }?show=true`
      );
    },
    cancel(item) {
      this.$remove(item, "transfer");
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