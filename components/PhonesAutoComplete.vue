<template>
  <div :class="dashed ? 'dashing' : ''">
    <label
      v-if="!no_lable"
      style="color: rgba(139, 139, 139, 0.93)"
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
      item-text="phone"
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
    if (this.no_fetch) return;
    if (!this.all[0]) {
      this.$store.dispatch("party/index_all", { per_page: -1 });
    }
  },
  computed: {
    ...mapState({
      all: (state) => state.party.all_records,
    }),
  },
};
</script>
  
  <style lang="css">
.dashing .v-text-field fieldset {
  border: rgb(143, 135, 135) dashed 2px !important;
}
</style>