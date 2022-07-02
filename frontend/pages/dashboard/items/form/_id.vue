<template>
  <v-card>
    <v-card-title> {{ $t("items_form") }} </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="3">
            <LocaleTextInput field="name" v-model="item.translations" />
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.price"
              outlined
              dense
              :label="$t('price')"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.description"
              outlined
              dense
              :label="$t('description')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="item.price1"
              outlined
              dense
              :label="$t('price1')"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.price2"
              outlined
              dense
              :label="$t('price2')"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.price3"
              outlined
              dense
              :label="$t('price3')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <FileUpload attachable_type="1" v-model="item.image_id" />
          </v-col>
        </v-row>
        <v-row>
          <v-btn block color="primary" @click="$save(item, 'item')">
            {{ $t("save") }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      item: {
        translations: [],
      },
    };
  },
  computed: {
    ...mapState({
      locales: (state) => state.locales,
      one: (state) => state.item.one,
    }),
  },
  mounted() {
    if (this.$route.params.id) {
      this.$store.dispatch("item/show", this.$route.params.id);
    }
  },
  watch: {
    one(val) {
      this.item = JSON.parse(JSON.stringify(val));
    },
  },
};
</script>

<style>
</style>