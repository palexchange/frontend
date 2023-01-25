<template>
  <div>
    <Card class="pa-5">
      <v-card-actions>
        <v-row>
          <v-col cols="2" class="align-self-center">
            <h1 class="fs-20">{{ $t("moneygram") }}</h1>
          </v-col>
          <v-col class="text-left align-self-center">
            <v-btn icon small @click="show_filter = !show_filter">
              <v-icon> fas fa-solid fa-search </v-icon>
            </v-btn>
            <span>&nbsp;&nbsp;</span>
            <v-btn color="primary" to="moneygram/outcoming">
              <span> {{ $t("add outcoming moneygram") }} </span>
            </v-btn>
            <v-btn color="primary" to="moneygram/incoming">
              <span> {{ $t("add incoming moneygram") }} </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </Card>
    <Card v-show="show_filter" class="pa-5">
      <v-row>
        <v-col>
          <InputField
            @change="search"
            type="number"
            v-model="filters.transfer_id"
            hide-details
            holder="transfer id"
            text="transfer id"
          />
        </v-col>
        <v-col>
          <AutoComplete
            @input="search"
            clearable
            :items="transfers_type"
            v-model="filters.type"
            hide-details
            holder="transfer type"
            text="transfer type"
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
          />
        </v-col>
        <v-col>
          <BeneficiaryAutocomplete
            @input="search"
            v-model="filters.party_id"
            hide-details
            holder="party_name"
            text="party_name"
          />
        </v-col>
        <v-col>
          <DatePicker
            @change="search"
            v-model="filters.from"
            text="from_date"
          />
        </v-col>
        <v-col>
          <DatePicker @change="search" v-model="filters.to" text="to_date" />
        </v-col>
      </v-row>
    </Card>
    <DataTable :params="params" module="transfer" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      show_filter: false,
      filter: false,
      filters: {
        from: new Date().toISOString().slice(0, 10),
        to: new Date().toISOString().slice(0, 10),
      },
      params: {},
      transfers_type: [
        { id: 0, name: "صادرة" },
        { id: 1, name: "واردة" },
      ],
      transfers_statuses: [
        { id: 0, name: "مسودة" },
        { id: 1, name: "معتمدة" },
        { id: 255, name: "ملغاة" },
      ],
    };
  },
  methods: {
    search() {
      this.params = { delivering_type: [2], ...this.filters };
    },
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
  mounted() {
    this.params = { delivering_type: [2] };
  },
};
</script>

<style>
</style>
