<template>
  <div>
    <label :class="required ? 'required form-label' : 'form-label'">{{
      $t(text)
    }}</label>
    <v-text-field
      min="0"
      color="#FF7171"
      style="border-radius: 0px !important"
      dense
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

<style lang="css" scoped>
</style>