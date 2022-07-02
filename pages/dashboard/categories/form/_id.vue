<template>
  <v-card>
    <v-card-title> {{ $t("categories_form") }} </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="3">
            <LocaleTextInput field="name" v-model="item.translations" />
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
          <v-col cols="12">
            <FileUpload attachable_type="1" v-model="item.image_id" />
          </v-col>
        </v-row>
        <v-row>
          <v-btn :loading="$store.state.post_loading" block color="primary" @click="$save(item, 'category',$refs.form,'/dashboard/categories')">
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
      one: (state) => state.category.one,
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