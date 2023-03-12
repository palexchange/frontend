<template>
  <div :class="dashed ? 'dashing' : ''">
    <label
      v-if="!no_lable"
      style="color: rgba(0, 0, 0); font-size: 16px"
      :class="required ? 'required form-label' : 'form-label'"
      >{{ $t(text) }}</label
    >
    <v-autocomplete
      color="#FF7171"
      style="border-radius: 0px !important"
      :items="all"
      dense
      :disabled="dashed"
      :required="this.required ? true : false"
      outlined
      v-bind="$attrs"
      v-on="$listeners"
      :rules="required ? rulesss.requiredRules : []"
      :placeholder="$t(holder)"
      item-text="name"
      item-value="id"
      class="ma-0"
    >
      <template v-slot:prepend-item>
        <div>
          <v-btn
            color="#E0E0FF"
            v-if="select_all"
            depressed
            block
            @click="$emit('select_all', all)"
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
    select_all: {
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
  },
  data() {
    return {
      rulesss: ruless(this),
    };
  },
  created() {
    // if (!this.all[0]) {
    //   console.log("CurrencyAutoComplete");
    //   this.$store.dispatch("currency/index", { per_page: -1 });
    // }
  },
  computed: {
    ...mapState({
      all: (state) => state.currency.all,
    }),
  },
};
</script>

<style lang="css">
.dashing .v-text-field fieldset {
  border: rgb(143, 135, 135) dashed 2px !important;
}
</style>