<template>
  <div>
    <client-only>
      <bing-map
        :credentials="mapCredentials"
        :options="mapOptions"
        v-if="mapVisible"
      >
        <bing-map-layer
          name="activeFlightsLayer"
          v-on:layer-click="handleEvent"
          v-on:layer-mouseover="showTooltip"
          v-on:layer-mouseout="hideTooltip"
          :visible="pinsVisible"
        >
          <bing-map-pushpin
            v-for="item in pins"
            :metadata="item.metadata"
            :location="item.location"
            :options="item.options"
          ></bing-map-pushpin>
          <bing-map-infobox :options="tooltip">
            <div class="customInfobox">{{ tooltip.description }}</div>
          </bing-map-infobox>
        </bing-map-layer>
      </bing-map>
    </client-only>
    <v-btn to="/dashboard"> <h1>go to dashboard here</h1></v-btn>
  </div>
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
