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
        <v-btn depressed block @click="dialog = true">
          {{ $t("add city") }}
        </v-btn>
      </template>
    </v-autocomplete>
    <v-dialog width="800" v-model="dialog">
      <component @close="close" :is="'AddCity'"></component>
    </v-dialog>
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
  },
  data() {
    return {
      dialog: false,
      rulesss: ruless(this),
    };
  },
  created() {
    if (!this.all[0]) {
      this.$store.dispatch("city/index", { per_page: -1 });
    }
  },
  computed: {
    ...mapState({
      all: (state) => state.city.all,
    }),
  },
  methods: {
    close(cityId) {
      this.$store.dispatch("city/index", { per_page: -1 });
      this.dialog = false;
      if (cityId) {
        this.$emit("close", cityId);
      }
    },
  },
};
</script>

<style lang="css">
.dashing .v-text-field fieldset {
  border: rgb(143, 135, 135) dashed 2px !important;
}
</style>