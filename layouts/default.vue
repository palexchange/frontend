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

      <!-- {{ this.$auth.user.name }}
      <span v-for="account in $auth.user.active_accounts">
        {{ account.name }}
      </span> -->
      <v-spacer></v-spacer>
      <v-menu :close-on-content-click="true" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark color="primary" v-bind="attrs" v-on="on">
            <img src="~/assets/img/vertical_menu.png" alt="" />
          </v-btn>
        </template>
        <v-list width="200">
          <!-- <v-list-item to="/dashboard/settings/pricing">
            {{ $t("exchange prices") }}
          </v-list-item>
          <v-list-item to="/dashboard/settings">
            {{ $t("accounting settings") }}
          </v-list-item>
          <v-list-item to="/dashboard/settings/settings">
            {{ $t("app settings") }}
          </v-list-item>
          <v-list-item to="/dashboard/settings/roles">
            {{ $t("roles") }}
          </v-list-item> -->

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

          <!-- <v-list-item>
            <v-btn @click="$auth.logout()"> logout </v-btn>
          </v-list-item> -->
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main :class="`grey ${$vuetify.theme.dark ? 'darken' : 'lighten'}-3  `">
      <v-container style="max-width: 1340px !important">
        <!-- <Boxes /> -->
        <UserActiveAccounts />
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
      <v-dialog
        transition="dialog-top-transition"
        @keydown.esc="$store.dispatch('closeDialog')"
        @click:outside="$store.dispatch('closeDialog')"
        width="800"
        v-model="state_dialog.active"
      >
        <v-card>
          <component :is="state_dialog.name"></component>
        </v-card>
      </v-dialog>
      <div class="text-center">
        {{ new Date().getFullYear() }}
        @
        <strong>ALTARIQ Systems & Projects </strong>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import global from "../helpers/global";
import { mapState } from "vuex";
export default {
  name: "DefaultLayout",
  mixins: [global],
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
      all_settings: (state) => state.setting.all,
      delete_data: (state) => state.deletingData,
      action: (state) => state.context.action,
      item: (state) => state.context.item,
      module_name: (state) => state.module_name,
      redirect: (state) => state.redirect,
      locales: (state) => state.locales,
      user: (state) => state.auth.user,
      overlay: (state) => state.overlay,
      stocks: (state) => state.stock.all,
      settings: (state) => state.setting.all,
      state_dialog: (state) => state.state_dialog,
      success_msg: (state) => state.success_msg,
      errors_msg: (state) => state.errors,
    }),
  },

  watch: {
    delete_data(val) {
      if (val.resource) {
        console.log(this.module_name);
        this.$swal({
          title: this.$t("confirm"),
          text: this.$t("are_you_sure"),
          icon: "error",
          confirmButtonText: this.$t("delete"),
        }).then((v) => {
          this.$store.dispatch("setModule", null);
          if (v.value) {
            this.$store.dispatch(`${val.resource}/delete`, {
              item: val.item,
              params: val.params,
            });
          }
        });
      }
    },
    all_settings(val) {
      this.$store.dispatch(
        "setSettings",
        val.reduce((obj, item) => Object.assign(obj, item), {})
      );
    },
    success_msg(val) {
      if (val) {
        this.$swal
          .fire({
            title: this.$t("Success"),
            text: this.$t(val),
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#41b882",
          })
          .then(() => {
            if (this.redirect) {
              this.$router.push(this.redirect);
            }
            this.$store
              .dispatch("clearSuccessMsg")
              .then(() => this.$store.dispatch("closeDialog"));
          });
      }
    },
    errors_msg(val) {
      if (val) {
        let values = Object.values(val);
        this.$swal
          .fire({
            title: this.$t("Error Happend"),
            text: this.$t(...values),
            icon: "error",
            confirmButtonText: this.$t("ok"),
            confirmButtonColor: "#41b882",
          })
          .then(() => {
            // if (this.redirect) {
            //   this.$router.push(this.redirect);
            // }
            // this.$store.dispatch("clearErrors");
          });
      }
    },
    // module_name(val) {
    //   if (val && this.item) {
    //     this.delete(this.item);
    //   }
    // },
    // redirect(val) {
    //   if (val) {
    //     this.$store.dispatch("clearRedirect");
    //     this.$router.push(val);
    //   }
    // },
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
  methods: {
    delete(item) {},
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
    this.$vuetify.rtl = this.$i18n.locale == "ar";
  },
  created() {
    if (!this.stocks[0]) {
      this.$store.dispatch("stock/index");
    }
    if (!this.settings[0]) {
      this.$store.dispatch("setting/index");
    }
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
