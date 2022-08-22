<template>
  <v-app>
    <side-menu
      @change_dawer="() => (drawer = !drawer)"
      :forgin_drawer="drawer"
    />
    <v-app-bar
      :fixed="$vuetify.breakpoint.mobile"
      color="#EEEEEE"
      elevation="0"
    >
      <v-app-bar-nav-icon
        :class="$vuetify.breakpoint.mobile ? 'nomargin' : ''"
        :style="drawer ? 'margin-right: 160px' : 'margin-right: 240px'"
        @click="drawer = !drawer"
      >
        <v-icon> fas fa-bars </v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>{{ $t(this.$route.name) }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark color="primary" v-bind="attrs" v-on="on">
            <img src="~/assets/img/vertical_menu.png" alt="" />
          </v-btn>
        </template>
        <v-list width="200">
          <v-list-group>
            <template v-slot:activator>
              <v-list-item-title>{{ $t("settings") }}</v-list-item-title>
            </template>
            <v-list-item>
              <v-btn to="/dashboard/settings/pricing" block depressed>
                {{ $t("exchange prices") }}
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block depressed> {{ $t("exchange prices") }} </v-btn>
            </v-list-item>
          </v-list-group>

          <v-list-item>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text block dark color="primary" v-bind="attrs" v-on="on">
                  lang
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
          </v-list-item>
          <v-list-item>
            <v-btn @click="$auth.logout()"> logout </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main :class="`grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3  `">
      <v-container>
        <Breadcrumbs />
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
  middleware: "auth",
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
      console.log(locale.code);
      console.log(locale);
      this.$i18n.setLocale(locale.code);
      this.$i18n.setLocaleCookie(locale.code);
      this.$i18n.finalizePendingLocaleChange();
      this.$vuetify.rtl = locale.code == "ar" ? true : false;
    },
  },
  beforeCreate() {
    console.log(this.$i18n.locale);
    this.$vuetify.rtl = this.$i18n.locale == "ar";
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
.nomargin {
  margin-right: 0px !important ;
}
</style>
