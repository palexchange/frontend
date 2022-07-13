<template>
  <Card>
    <v-card-title>
      <h3 class="box-title-sec card-title align-items-start flex-column">
        <span class="title-sec card-label fw-bolder fs-3 mb-5">
          {{ $t("add to your portfolio") }}
        </span>
      </h3></v-card-title
    >
    <v-card-text> asdas</v-card-text>
  </Card>
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