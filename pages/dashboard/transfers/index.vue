<template>
  <div>
    <Card class="pa-5">
      <v-card-actions>
        <v-row>
          <v-col cols="2" class="align-self-center">
            <span class="fs-20">{{ $t("transfers") }}</span>
          </v-col>
          <v-col v-if="show_filter">
            <v-row>
              <v-col>
                <AutoComplete
                  @input="search"
                  :items="transfers_type"
                  v-model="filters.type"
                  hide-details
                  holder="transfer type"
                  text="transfer type"
                  required
                />
              </v-col>
              <v-col>
                <AutoComplete
                  @input="search"
                  :items="transfers_statuses"
                  v-model="filters.status"
                  hide-details
                  holder="transfer status"
                  text="transfer status"
                  required
                />
              </v-col>
              <v-col>
                <BeneficiaryAutocomplete
                  v-model="filters.party_id"
                  hide-details
                  holder="party_name"
                  text="party_name"
                  required
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col class="text-left align-self-center">
            <v-btn icon small @click="show_filter = !show_filter">
              <v-icon> fas fa-solid fa-search </v-icon>
            </v-btn>
            <span>&nbsp;&nbsp;</span>
            <v-btn color="primary" to="transfers/outcoming">
              <span> {{ $t("add outcoming transfer") }} </span>
            </v-btn>
            <v-btn color="primary" to="transfers/incoming">
              <span> {{ $t("add incoming transfer") }} </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </Card>
    <DataTable :params="{ delivering_type: [1, 3] }" module="transfer" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      show_filter: false,
      filters: {
        delivering_type: [1, 3],
      },
      filter: false,
      params: {},
      transfers_type: [
        { id: 0, name: "??????????" },
        { id: 1, name: "??????????" },
      ],
      transfers_statuses: [
        { id: 0, name: "??????????" },
        { id: 1, name: "????????????" },
        { id: 255, name: "??????????" },
      ],
    };
  },
  methods: {
    search() {},
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
    cancel(item) {
      this.$remove(item, "transfer");
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