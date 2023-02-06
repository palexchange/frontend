<template>
  <div :class="dashed ? 'dashing' : ''">
    <label
      v-if="!no_lable"
      style="color: rgba(0, 0, 0); font-size: 16px"
      :class="required ? 'required form-label' : 'form-label'"
      >{{ $t(text) }}</label
    >
 
    <v-autocomplete
      cache-items
      color="#FF7171"
      style="border-radius: 0px !important"
      :items="filter ? all.filter(filter) : all"
      dense
      :disabled="dashed"
      :required="this.required ? true : false"
      :outlined="outlined"
      v-bind="$attrs"
      v-on="$listeners"
      :rules="required ? rulesss.requiredRules : []"
      :placeholder="$t(holder)"
      item-text="name"
      :item-value="item_value ? item_value : 'id'"
    >
      <template v-slot:prepend-item>
        <div>
          <v-btn
            color="#E0E0FF"
            depressed
            block
            @click="$store.dispatch('setDialog', { name: 'AddAccount' })"
          >
            {{ $t("add account") }}
          </v-btn>
          <v-btn
            color="#E0E0FF"
            v-if="select_all"
            depressed
            block
            @click="$emit('select_all', filter ? all.filter(filter) : all)"
          >
            {{ $t("select all") }}
          </v-btn>
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import ruless from "~/helpers/rules";
import { mapState } from "vuex";
export default {
  props: {
    holder: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    dashed: {
      type: Boolean,
      default: false,
    },
    no_lable: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
    },
    no_fetch: {
      type: Boolean,
      default: false,
    },
    item_value: {
      type: String,
      default: "id",
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    select_all: {
      type: Boolean,
      default: false,
    },
    force_fetch: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Function,
    },
    params: {
      type: Object,
      default: () => {
        return { per_page: -1 };
      },
    },
  },
  data() {
    return {
      rulesss: ruless(this),
    };
  },
  created() {
    if (this.no_fetch) return;
    if (!this.all[0] || this.force_fetch) {
    this.$store.dispatch("account/index", this.params);
    }
    // this.$store.dispatch("account/index", this.params);
  },

  computed: {
    ...mapState({
      all: (state) => JSON.parse(JSON.stringify(state.account.all)),
    }),
  },
  watch: {
    filter(val) {
      console.log("filter");
      console.log(val);
    },
  },
};
</script>

<style lang="css">
.dashing .v-text-field fieldset {
  border: rgb(143, 135, 135) dashed 2px !important;
}
</style>