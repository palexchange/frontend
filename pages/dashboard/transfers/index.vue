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
    <Card> test </Card>
    <Card class="pa-5">
      <v-row>
        <v-col><InputField required text="رقم الهوية" holder="ahmad" /></v-col>
        <v-col
          ><InputField dashed required text="رقم الهوية" holder="ahmad"
        /></v-col>
        <v-col><AutoComplete text="رقم الهوية" holder="ahmad" /></v-col>

        <v-col>
          <AutoComplete dashed required text="رقم الهوية" holder="ahmad" />
        </v-col>
        <v-col
          ><DatePicker required text="تاريخ الانتاج" holder="ahmad"
        /></v-col>
      </v-row>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      filter: false,
      params: {},
      item: {},
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