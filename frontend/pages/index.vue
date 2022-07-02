<template>
  <v-card>
    <v-toolbar color="transparent" dark flat absolute width="100%">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title class="font-weight-bold">Your Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- 
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-btn color="transparent" flat elevation="0" to="/auth/login">
        <span>
          {{ $t("login") }}
        </span>
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tab
            v-for="(item, i) in items"
            @click="c_slide = i;delay_cycle()"
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
              <v-col cols="8" >
                <v-fab-transition>
                  <SliderCard
                    transition="scale-transition"
                    origin="center center"
                    v-if="c_slide == i"
                    :slide="slide"
                    @exited="rm_slide"
                    @shown="expand_slide"
                    v-show="expand"
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
export default {
  name: "Index",
  middleware: "auth",
  auth: "guest",
  layout: "external",
  data() {
    return {
      tab: null,
      c_slide: null,
      items: ["web", "shopping", "videos", "images"],
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
          link: "/menu",
          link_title: "Register",
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          text: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum provident sequi nostrum ad optio quisquam dolore nesciunt! Sit, voluptatum!",

          title: "Best Junk food",
          link: "/menu",
          link_title: "Register",
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          text: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum provident sequi nostrum ad optio quisquam dolore nesciunt! Sit, voluptatum!",

          title: "Best Junk food",
          link: "/menu",
          link_title: "Register",
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
        {
          text: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatum provident sequi nostrum ad optio quisquam dolore nesciunt! Sit, voluptatum!",

          title: "Best Junk food",
          link: "/menu",
          link_title: "Register",
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
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
  },
  watch: {
    c_slide(v) {
      // this.expand=false;
      this.tab = v;
    },
  },
};
</script>
<style>
</style>
