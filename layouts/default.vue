<template>
  <v-app>
    <side-menu
      @change_dawer="() => (drawer = !drawer)"
      :forgin_drawer="drawer"
    />
    <v-app-bar
      style="
        justify-content: end !important;
        background-color: #eeeeee;
        max-height: 70px !important;
      "
      flat
      :clipped-left="!$vuetify.rtl"
      :clipped-right="$vuetify.rtl"
    >
      <div
        :style="drawer ? `width:90% !important` : ``"
        class="test_meow"
        style="
          width: 85%;
          align-self: self-end;
          display: flex;
          transition: width 0.3s;
        "
      >
        <div style="width: 100%" class="d-flex align-center">
          <v-btn
            @click="drawer = !drawer"
            class="px-7"
            icon
            rounded
            color="grey darken-2"
            small
          >
            <v-icon> fas fa-bars </v-icon>
          </v-btn>
          <h2 style="width: 100%" class="mt-1">{{ name }}</h2>
        </div>
        <v-container class="py-0 fill-height">
          <!-- <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn> -->

          <v-spacer></v-spacer>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark color="primary" v-bind="attrs" v-on="on">
                <img src="~/assets/img/vertical_menu.png" alt="" />
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="locale in locales"
                :key="locale.code"
                link
                @click="changeLocale(locale)"
              >
                <v-list-item-title>
                  {{ $t(locale.name) }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-container>
      </div>
    </v-app-bar>
    <v-main :class="`grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3  `">
      <v-container>
        <v-breadcrumbs :items="routeLinks" large>
          <template v-slot:divider>
            <v-icon>{{
              $vuetify.rtl ? "mdi-chevron-left" : "mdi-chevron-right"
            }}</v-icon>
            <!-- <v-icon>mdi-chevron-{{ $vuetify.rtl ? "left" : "right" }}</v-icon> -->
          </template>
        </v-breadcrumbs>
        <div style="min-height: 75vh">
          <Nuxt />
        </div>

        <!-- <v-overlay :value="overlay">
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay> -->
      </v-container>
      <div class="text-center">
        {{ new Date().getFullYear() }}
        @
        <strong>ALTARIQ Systems & Projects </strong>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DefaultLayout",
  // middleware: "auth",
  data() {
    return {
      name: "",
      // clipped: false,
      // drawer: true,
      // fixed: false,
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      links: [],
      drawer: false,
      title: "Vuetify.js",
      fav: true,
      menu: false,
      message: false,
      hints: true,
    };
  },
  computed: {
    routeLinks() {
      let route = this.$route.path;
      let arr = route.split("/");
      arr.shift();
      let links = arr.map((link, i, arr) => {
        return {
          text: this.$t(link),
          disabled: i == arr.length - 1,
          href: arr.slice(0, i - 1).join("/") || "/",
        };
      });
      return links;
    },
    ...mapState({
      delete_data: (state) => state.deletingData,
      action: (state) => state.context.action,
      item: (state) => state.context.item,
      module_name: (state) => state.module_name,
      locales: (state) => state.locales,
      user: (state) => state.auth.user,
      overlay: (state) => state.overlay,
    }),
  },
  watch: {
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
  methods: {
    delete(item) {
      console.log(this.module_name);
      if (this.module_name) {
        this.$swal({
          title: this.$t("confirm"),
          text: this.$t("are_you_sure"),
          icon: "error",
          confirmButtonText: this.$t("delete"),
        }).then((v) => {
          if (v.value) {
            this.$store.dispatch(`${this.module_name}/delete`, item);
          }
        });
      }
    },
    changeLocale(locale) {
      console.log(locale);
      this.$i18n.setLocale(locale.code);
      this.$i18n.setLocaleCookie(locale.code);
      this.$i18n.finalizePendingLocaleChange();
      this.$vuetify.rtl = locale == "ar" || locale == "he" ? true : false;
    },
  },
  beforeCreate() {
    this.$vuetify.rtl = this.$i18n.locale == "ar" || this.$i18n.locale == "he";
  },
  mounted() {
    this.name = this.$route.name.replace("-", "_");
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@500&display=swap");

* {
  font-family: Tajawal;
}
.logo-btn::before {
  display: none !important;
}
.v-toolbar__content {
  justify-content: end !important;
}
.v-navigation-drawer__border {
  display: none !important;
}
</style>
