<template>
  <div v-if="html" v-html="html" dir="ltr" class="printable_div"></div>
</template>
<script>
import { mapState } from "vuex";
export default {
  layout: "home",
  mounted() {
    let id = this.$route.params.id;
    let type = this.$route.query.type;
    let template = this.$route.query.template;
    this.$store.dispatch("document_rendered_print/store", {
      document_id: id,
      document_type: type,
      template,
    });
  },
  computed: {
    ...mapState({
      html: (state) => state.document_rendered_print.html,
    }),
  },
  watch: {
    html(val) {
      if (val) {
        window.document.write(val);
        window.print();
      }
    },
  },
};
</script>
<style lang="css" scoped>
.printable_div {
  display: none;
  padding: 2mm;
}
@media print {
  .printable_div {
    display: block;
  }
}
</style>
