<template>
  <div>
    <Card>
      <v-card-title>
        <Title title="withdrawals" />
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn @click="$router.push('outputs/form')" color="primary">
              {{ $t("add withdrawals") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </Card>

    <DataTable module="receipt" :params="params" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      params: {},
      form: {
        type: "1",
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
    this.params = { type: 2 };
    // this.$store.dispatch("currency/index");
  },
  methods: {
    cancel(item) {
      this.$remove(item, "receipt", this.params);
    },
    show(item) {
      this.$router.push(`/dashboard/outputs/form/${item.id}?show=true`);
    },
    edit(item) {
      this.$router.push(`/dashboard/outputs/form/${item.id}`);
    },
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