<template>
  <v-card>
    <v-toolbar
      color="#222"
      style="opacity: 0.65; height: fit-content"
      dark
      flat
      absolute
      width="100%"
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title class="font-weight-bold text-center">
        مطبخ أون لاين
        <br />
        للمأكولات الشرقية و الغريبة
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn href="https://api.whatsapp.com/send?phone=970597857597" target="_blank">
        +972597857597
        <v-icon> fas fa-phone </v-icon>
      </v-btn>
      <!-- 
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-btn
        v-if="!user"
        color="transparent"
        flat
        elevation="0"
        to="/auth/register"
      >
        <span>
          {{ $t("register") }}
        </span>
        <span class="ml-5 mr-5">
          <v-icon>fas fa-user</v-icon>
        </span>
      </v-btn>
      <v-btn
        v-if="!user"
        color="transparent"
        flat
        elevation="0"
        to="/auth/login"
      >
        <span>
          {{ $t("login") }}
        </span>
        <span class="ml-5 mr-5">
          <v-icon>fas fa-sign-in-alt</v-icon>
        </span>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark v-bind="attrs" v-on="on">
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

      <v-btn v-if="user" color="transparent" flat elevation="0" to="/dashboard">
        <span>
          {{ $t("dashboard") }}
        </span>
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>

      <template v-slot:extension v-if="false">
        <v-tabs v-model="tab" align-with-title>
          <v-tab
            v-for="(item, i) in items"
            @click="
              c_slide = i;
              delay_cycle();
            "
            :key="item"
            class="font-weight-bold"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-carousel
          :continuous="true"
          :cycle="cycle"
          :show-arrows="false"
          hide-delimiter-background
          delimiter-icon="mdi-minus"
          height="100vh"
          reverse-transition="fade-transition"
          transition="fade-transition"
          v-model="c_slide"
          interval="4000"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            :src="slide.src"
          >
            <v-row class="fill-height" align="center" justify="center">
              <!-- <div class="text-h2">{{ slide.text }}</div> -->
              <v-col cols="6">
                <v-fab-transition>
                  <SliderCard
                    transition="scale-transition"
                    origin="center center"
                    v-if="c_slide == i && false"
                    :slide="slide"
                    @exited="rm_slide"
                    @shown="expand_slide"
                    v-show="false"
                    @mouseenter="delay_cycle"
                  />
                </v-fab-transition>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Index",
  middleware: "auth",
  auth: "guest",
  layout: "external",
  data() {
    return {
      tab: null,
      c_slide: null,
      items: [],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      colors: [
        "green",
        "secondary",
        "yellow darken-4",
        "red lighten-2",
        "orange darken-1",
      ],
      cycle: true,
      slides: [
        {
          text: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum provident sequi nostrum ad optio quisquam dolore nesciunt! Sit, voluptatum!",
          title: "Best Junk food",
          link: "/auth/register",
          link_title: "Register",
          src: "https://www.albawaba.com/sites/default/files/im/Nadien_healthbeauty_/Mansaf-jordan2017.jpg?width=1200&enable=upscale",
        },
        {
          text: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum provident sequi nostrum ad optio quisquam dolore nesciunt! Sit, voluptatum!",

          title: "Best Junk food",
          link: "/auth/register",
          link_title: "Register",
          src: "https://modo3.com/thumbs/fit630x300/107221/1469970320/%D8%B7%D8%B1%D9%8A%D9%82%D8%A9_%D8%B9%D9%85%D9%84_%D8%A7%D9%84%D9%85%D8%B4%D8%A7%D9%88%D9%8A_%D8%B9%D9%84%D9%89_%D8%A7%D9%84%D9%81%D8%AD%D9%85.jpg",
        },
        {
          text: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum provident sequi nostrum ad optio quisquam dolore nesciunt! Sit, voluptatum!",

          title: "Best Junk food",
          link: "/auth/register",
          link_title: "Register",
          src: "https://modo3.com/thumbs/fit630x300/202168/1548165397/%D8%B7%D8%B1%D9%8A%D9%82%D8%A9_%D8%B9%D9%85%D9%84_%D9%85%D8%B4%D8%A7%D9%88%D9%8A_%D8%B9%D9%84%D9%89_%D8%A7%D9%84%D9%81%D8%AD%D9%85.jpg",
        },
        {
          text: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum provident sequi nostrum ad optio quisquam dolore nesciunt! Sit, voluptatum!",

          title: "Best Junk food",
          link: "/auth/register",
          link_title: "Register",
          src: "https://i0.wp.com/bestriyadh.com/wp-content/uploads/2021/12/images-21-5.jpeg?resize=554%2C554&ssl=1",
        },
      ],
      expand: true,
    };
  },
  methods: {
    log(v) {
      console.log(v);
    },
    expand_slide() {
      this.expand = false;
      setTimeout(() => {
        this.expand = true;
      }, 100);
    },
    rm_slide() {
      this.expand = false;
    },
    delay_cycle() {
      this.cycle = false;
      setTimeout(() => {
        this.cycle = true;
      }, 100000);
    },
    changeLocale(locale) {
      console.log(locale);
      this.$i18n.setLocale(locale.code);
      this.$i18n.setLocaleCookie(locale.code);
      this.$i18n.finalizePendingLocaleChange();
      this.$vuetify.rtl = locale == "ar" || locale == "he" ? true : false;
    },
  },
  watch: {
    c_slide(v) {
      // this.expand=false;
      this.tab = v;
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      locales: (state) => state.locales,
    }),
  },
};
</script>
<style>
</style>
