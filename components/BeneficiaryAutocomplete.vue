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
    >
      <template v-slot:prepend-item>
        <v-btn
          depressed
          block
          @click="$store.dispatch('setDialog', { name: 'AddBeneficiary' })"
        >
          {{ $t("add beneficiary") }}
        </v-btn>
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
  },
  data() {
    return {
      rulesss: ruless(this),
    };
  },
  created() {
    if (!this.all[0] && !this.no_fetch) {
      this.$store.dispatch("party/index", { per_page: 900 });
    }
  },
  computed: {
    ...mapState({
      all: (state) => state.party.all,
    }),
  },
};
</script>

<style lang="css">
.dashing .v-text-field fieldset {
  border: rgb(143, 135, 135) dashed 2px !important;
}
</style>