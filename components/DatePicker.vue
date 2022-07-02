<template>
  <v-menu
    ref="menuDate1"
    v-model="menuDate1"
    :close-on-content-click="false"
    :return-value.sync="value"
    transition="scale-transition"
    offset-y
    min-width="auto"
    :disabled="disabled"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        color="primary"
        :rules="required ? rules.requiredRules : []"
        :value="value"
        :outlined="param ? false : true"
        :rounded="param ? true : false"
        dense
        prepend-inner-icon="mdi-calendar"
        readonly
        :disabled="disabled"
        v-bind="{ attrs, param }"
        :label="$t(label)"
        v-on="on"
        clearable
        @change="(v) => $emit('input', v)"
      >
        <!-- <template v-slot:prepend>
          <span
          
            style="font-family: Tajawal !important; font-size: 20px !important;white-space: nowrap;"
          >
            {{ $t(`${perpend_label}`) }}
          </span>
        </template> -->
      </v-text-field>
    </template>
    <v-date-picker v-bind="$attrs" v-model="value" scrollable color="primary">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menuDate1 = false">
        {{ $t("cancel") }}
      </v-btn>
      <v-btn text color="primary" @click="saveDate">
        {{ $t("ok") }}
      </v-btn>
      <slot :model="value" />
    </v-date-picker>
  </v-menu>
</template>

<script>
var moment = require("moment");
import rules from "~/helpers/rules";
export default {
  props: {
    value: String,
    label: String,
    param: Boolean,
    disabled: Boolean,
    required: Boolean,
    noInitDate: Boolean,
    perpend_label: String,
  },
  // ["value", "label", "param", "disabled", "required"],
  data() {
    return {
      rules: rules(this),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menuDate1: false,
    };
  },
  methods: {
    saveDate() {
      this.$refs.menuDate1.save(this.value);
      this.$emit("input", this.value);
    },
  },
  mounted() {
    if (!this.noInitDate) {
      this.$emit("input", this.date);
    }else{
      this.$emit('input',this.date);
    }
    this.value = this.date;
  },
};
</script>

<style>

</style>