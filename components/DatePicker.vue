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
      <label
        for="test"
        style="color: rgba(0, 0, 0); font-size: 16px"
        :class="required ? 'required form-label' : 'form-label'"
        >{{ $t(text) }}</label
      >
      <v-text-field
        id="test"
        color="primary"
        :rules="required ? rules.requiredRules : []"
        :value="value || date"
        :outlined="param ? false : true"
        style="border-radius: 0px !important"
        dense
        prepend-inner-icon="mdi-calendar"
        readonly
        :hide-details="hide_details"
        :disabled="disabled"
        v-bind="{ attrs, param }"
        :label="$t(label)"
        v-on="on"
        :placeholder="$t(holder)"
        @change="(v) => $emit('input', v)"
      >
        <template v-slot:prepend-inner>
          <span
            style="
              font-family: Tajawal !important;
              font-size: 20px !important;
              white-space: nowrap;
            "
          >
          </span>
        </template>
        <template v-slot:append>
          <img src="../assets/img/icons/date.png" alt="date" />
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      @change="(v) => saveDate(v)"
      v-bind="$attrs"
      v-model="value"
      scrollable
      color="primary"
    >
      <!-- <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menuDate1 = false">
        {{ $t("cancel") }}
      </v-btn>
      <v-btn text color="primary" @click="saveDate">
        {{ $t("ok") }}
      </v-btn> -->
      <slot :model="value" />
    </v-date-picker>
  </v-menu>
</template>

<script>
var moment = require("moment");
import rules from "~/helpers/rules";
export default {
  props: {
    text: String,
    holder: String,
    value: String,
    label: String,
    param: Boolean,
    disabled: Boolean,
    required: Boolean,
    noInitDate: Boolean,
    perpend_label: String,
    hide_details: Boolean,
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
    } else {
      this.$emit("input", this.date);
    }
    // this.value = this.date;
  },
};
</script>

<style>
</style>