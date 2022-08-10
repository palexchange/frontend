<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>{{
          $vuetify.rtl ? "mdi-chevron-left" : "mdi-chevron-right"
        }}</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          
          :to="item.href"
          class=" text-subtitle-2 crumb-item"
          :disabled="item.disabled"
          exact
        >
          {{ item.text == "admin" ? $t("dashboard") : $t(item.text) }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  computed: {
    items() {
      let names = this.$route.path.split("/");
      names.shift();
      let items = [];
      if (names.length > 3) {
        names.splice(2, 2, names[2] + "-" + names[1]);
      }

      names.map((v, i, { length }) => {
        items.push({
          text: v,
          disabled: length - 1 == i ? true : false,
          href: i == 0 ? `/${v}` : `/${names[0]}/${v}`,
        });
      });
      return items || [];
    },
    crumbs() {
      const crumbs = [];
      this.$route.matched.forEach((item, i, { length }) => {
        const crumb = {};
        crumb.href = item.path;
        crumb.text = this.$t(item.name);

        // // is last item?
        // if (i === length - 1) {
        //   // is param route? .../.../:id
        //   if (item.regex.keys.length > 0) {
        //     crumbs.push({
        //       href: item.path.replace(/\/:[^/:]*$/, ""),
        //       text: this.$i18n.t(item.name.replace(/-[^-]*$/, "")),
        //     });
        //     crumb.href = this.$route.path;
        //     crumb.text = this.$i18n.t(this.$route.name, [
        //       crumb.href.match(/[^/]*$/)[0],
        //     ]);
        //   }
        // }

        crumbs.push(crumb);
      });

      return crumbs;
    },
  },
  //   mounted(){
  //       console.log(this.$route.matched);
  //   }
};
</script>
<style  >
.v-breadcrumbs__item {
  color: #8c8c8c !important;
  font-size: 13px !important;
  font-weight: 500 !important;
}
</style>