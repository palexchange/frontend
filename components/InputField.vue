<template>
  <div :class="dashed ? 'dashing' : ''">
    <label
      v-if="!no_lable"
      style="color: rgba(0, 0, 0); font-size: 16px"
      :class="required ? 'required form-label' : 'form-label'"
      >{{ $t(text) }}</label
    >
    <v-text-field
      min="0"
      :maxlength="maxlength || '70'"
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
      color="#FF7171"
      style="border-radius: 0px !important"
      dense
      :disabled="dashed || disabledd"
      :required="this.required ? true : false"
      :outlined="outlined"
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
      type: [Number, String],
    },
    disabledd: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    no_lable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rulesss: ruless(this),
    };
  },
  methods: {
    // focus() {
    //   // this.$refs.input.focus();
    // },
    isUnicodeFunc(string) {
      let isKhmer = true;
      for (let i = 0; i < string.length; i++) {
        let code = string.charCodeAt(i);
        if (
          code < 0x1780 ||
          (code > 0x17ff && code < 0x19e0) ||
          code > 0x19ff
        ) {
          isKhmer = false;
          break;
        }
      }
      return isKhmer;
    },
  },
};
</script>

<style lang="css">
.dashing .v-text-field fieldset {
  border: rgb(143, 135, 135) dashed 2px !important;
}
.v-text-field input {
  font-size: 20px;
}

.v-text-field input[type="number"] {
  direction: ltr;
  unicode-bidi: embed;
}
</style>