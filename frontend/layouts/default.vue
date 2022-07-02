<template>
  <v-app id="inspire">
    <side-menu />
    <v-app-bar
      app
      flat
      :clipped-left="!$vuetify.rtl"
      :clipped-right="$vuetify.rtl"
    >
      <v-btn text class="logo-btn px-0">
        <v-img src="/logo.png" height="48" width="48"> </v-img>
        <span> مطبخ أون لاين </span>
      </v-btn>
      <v-container class="py-0 fill-height">
        <!-- <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn> -->

        <v-spacer></v-spacer>
        <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
          <v-icon> fas fa-{{ $vuetify.theme.dark ? "sun" : "moon" }} </v-icon>
        </v-btn>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="250"
          offset-x
          offset-y="200"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
              <v-avatar color="primary" size="32">
                <v-img
                  src="https://randomuser.me/api/portraits/men/85.jpg"
                ></v-img>
              </v-avatar>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item to="/profile">
                <v-list-item-avatar>
                  <img
                    src="https://randomuser.me/api/portraits/men/85.jpg"
                    :alt="user.name"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{user.name}}</v-list-item-title>
                  <v-list-item-subtitle
                    >{{user.email}}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon> fas fa-user-circle </v-icon>
                </v-list-item-icon>
                <v-list-item-title>Profile </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch v-model="hints" color="purple"></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable hints</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon dark color="primary" v-bind="attrs" v-on="on">
              <v-icon> fas fa-globe </v-icon>
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
        <v-btn icon>
          <v-icon> fas fa-bell </v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>
    <v-main
      :class="`grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3 py-10`"
    >
      <v-container>
        <v-card elevation="0" rounded>
          <v-card-title>
            <v-breadcrumbs :items="routeLinks" large>
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-card-title>
          <v-card-text>
            <Nuxt />
          </v-card-text>
        </v-card>
      </v-container>
      <v-footer padless>
        <v-col
          :class="`grey ${
            $vuetify.theme.dark ? 'darken' : 'lighten'
          }-3 text-center`"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>مطبخ أون لاين</strong>
        </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DefaultLayout",
  middleware: "auth",
  data() {
    return {
      // clipped: false,
      // drawer: true,
      // fixed: false,
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      links: [],
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
      let links = route.split("/").map((link, i, arr) => {
        return {
          text: this.$t(link || "dashboard"),
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
      user:state=>state.auth.user

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
      this.$vuetify.rtl = locale == "ar" ? true : false;
    },
  },
  beforeCreate() {
    this.$vuetify.rtl = this.$i18n.locale == "ar";
  },
};
</script>
<style>
.logo-btn::before {
  display: none !important;
}
</style>
