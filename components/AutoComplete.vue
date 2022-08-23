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
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"
        ><slot :name="slot" v-bind="scope"
      /></template>
    </v-autocomplete>
  </div>
</template>

<script>
import ruless from "~/helpers/rules";
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
  },
  data() {
    return {
      rulesss: ruless(this),
    };
  },
};
</script>

<style lang="css">
.dashing .v-text-field fieldset {
  border: rgb(143, 135, 135) dashed 2px !important;
}
</style>