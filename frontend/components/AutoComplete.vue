<template>
  <v-autocomplete
    :items="all"
    item-text="name"
    item-value="id"
    v-bind="$attrs"
    v-on="$listeners"
    dense
  ></v-autocomplete>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    module: {
      type: String,
      default: null,
    },
    hide_pagination: Boolean,
    hidden_headers: Array,
    params:Object
  },
  data() {
    return {
      loading: false,
      options: {
        sortBy: [],
        sortDesc: [],
        itemKey: "item.",
      },
      loaded: false,
      sortingData: { sortBy: [], sortDesc: [] },
      menu_name: null,
      item: null,
    };
  },
  async fetch() {
    if (this.module) {
      await this.$store.dispatch(`${this.module}/index`, {
        ...this.options,
        ...this.params,
        itemsPerPage:-1
      });
      let val = this.meta;
      if (val) {
        this.options.page = val.current_page;
      }
      this.loaded = true;
    }
  },
  computed: {
    ...mapState({
      all: function (state) {
        if (this.module) {
          return state[this.module].all;
        }
        return [];
      },
      meta: function (state) {
        if (this.module) {
          return state[this.module].meta;
        }
      },
      headers: function (state) {
        if (this.module) {
          return state[this.module].headers.filter(
            (i) => !(this.hidden_headers || []).some((h) => h == i)
          );
        }
      },
      functions: function (state) {
        if (this.module) {
          return state[this.module].functions;
        }
      },
      formatted_numbers: function (state) {
        if (this.module) {
          return state[this.module].formatted_numbers || [];
        }
      },
    }),
  },
};
</script>

<style>
</style>