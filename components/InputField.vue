<template>
  <div :class="dashed ? 'dashing' : ''">
    <label
      style="color: rgba(139, 139, 139, 0.93)"
       
      :class="required ? 'required form-label' : 'form-label'"
      >{{ $t(text) }}</label
    >
    <v-text-field
       
      min="0"
      color="#FF7171"
      style="border-radius: 0px !important"
      dense
      :disabled="dashed || disabledd"
      :required="this.required ? true : false"
      outlined
      v-bind="$attrs"
      v-on="$listeners"
      :rules="required ? rulesss.requiredRules : []"
      :placeholder="$t(holder)"
    />
    <!-- :maxlength="maxlength || '20'"
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" -->
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
    maxlength: {
      type: Number,
    },
    disabledd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rulesss: ruless(this),
      id: null,
    };
  },
  mounted() {
    this.id = this._uid;
  },
};
</script>

<style lang="css">
.dashing .v-text-field fieldset {
  border: rgb(143, 135, 135) dashed 2px !important;
}
</style>