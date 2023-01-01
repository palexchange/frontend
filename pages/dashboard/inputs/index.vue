<template>
  <div>
    <Card>
      <v-card-title>
        <Title title="add receipts" />
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn @click="$router.push('inputs/form')" color="primary">
              {{ $t("add receipts") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </Card>
    <DataTable module="receipt" :params="{ type: 1 }" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        type: "0",
        main_currency_id: 1,
      },
    };
  },
  computed: {
    ...mapState({
      all_currencies: (state) => state.currency.all,
      action: (state) => state.context.action,
      item: (state) => state.context.item,
    }),
  },
  mounted() {
    this.$store.dispatch("currency/index");
  },
  methods: {
    cancel(item) {
      this.$remove(item, "receipt");
    },
  },
  watch: {
    action(val) {
      console.log(this.item);
      console.log("this.item");
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
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