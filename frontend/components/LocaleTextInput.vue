<template>
  <div>
    <v-text-field
      v-for="(item, ii) in translations"
      v-model="item.value"
      outlined
      :label="$t('name')"
      dense
      :suffix="`(${item.locale})`"
      :key="item.locale"
    >
      <template v-slot:append>
        <v-menu
          offset-y
          style="padding: 0 !important; min-width: 32px !important"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" text dark v-bind="attrs" v-on="on">
              <v-icon small> fas fa-globe </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link v-for="(locale, index) in locales" :key="index">
              <v-list-item-title @click="item.locale = locale.code">{{
                locale.name
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          @click="addTranslation"
          color="primary"
          text
          dark
          v-bind="attrs"
          v-on="on"
          style="padding: 0 !important; min-width: 32px !important"
        >
          <v-icon small> fas fa-plus </v-icon>
        </v-btn>
        <v-btn
          @click="translations.splice(ii, 1)"
          v-if="ii > 0"
          color="primary"
          text
          dark
          v-bind="attrs"
          v-on="on"
          style="padding: 0 !important; min-width: 32px !important"
        >
          <v-icon small> fas fa-times </v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    field: Object,
    value: Object,
    translations:{
      default:[],
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      locales: (state) => state.locales,
    }),
  },
  methods: {
    addTranslation() {
      this.translations.push({
        locale: null,
        field: this.field,
        value: "",
      });
    },
  },
  mounted(){
    if(this.translations.length==0){
      this.translations.push({
          locale: "ar",
          field: this.field,
          value: "",
        },
      )
    }
  },
  watch: {
    translations: {
      handler() {
        this.$emit("input", this.translations);
      },
      deep: true,
    },
    value:{
      handler(){
        this.translations=this.value;
      }
    }
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 32px !important;
  padding: 0;
}
</style>