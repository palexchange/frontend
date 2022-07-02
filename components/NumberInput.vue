<template>
  <div>
    <v-text-field
      :value="rounded"
      v-bind="$attrs"
      v-on="$listeners"
      @blur="(v) => log(v)"
      @keypress="key_press = true"
      :rules="
        escaped
          ? []
          : rules.requiredRules
              .concat(rules.moreThanRules)
              .concat(extended_rules || [])
      "
      @focus="key_press = true"
      hide-details
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"
        ><slot :name="slot" v-bind="scope"
      /></template>
    </v-text-field>
  </div>
</template>

<script>
import rules from "~/helpers/rules";
export default {
  props: {
    prepend_label: [Boolean, String],
    value: [String, Number],
    escaped: Boolean,
    extended_rules: Array,
  }, 
  data() {
    return {
      rules: rules(this),
      rounded: null,
      key_press: false,
    };
  },
  methods: {
    log(v) {
      this.key_press = false;
      if (v.target.value) {
        let number = v.target.value.split(",").join("");
        this.rounded = this.$inputNumberFormat(number);
      } else {
        this.rounded = 0;
      }
    },
  },
  watch: {
    value(newval) {
      let number =
        typeof newval == "string" ? newval.split(",").join("") : newval;
      if (!this.key_press) this.rounded = this.$inputNumberFormat(number || 0);
      this.$emit("input", number || 0);
    },
  },
  mounted() {
    if (this.value) {
      let number = this.value
        ? typeof this.value == "string"
          ? this.value.split(",").join("")
          : this.value
        : "";
      this.rounded = this.$inputNumberFormat(number || 0);
    } else {
      this.rounded = this.$inputNumberFormat(0);
    }
  },
};
</script>

<style>
</style>