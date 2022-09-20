<template>
  <div style="height: 100vh; display: relative" class="landing-mian">
    <v-card style="height: 100%" color="#000" flat class="overflow-hidden">
      <v-app-bar dark scroll-target="#scrolling-techniques-4">
        <!-- src="https://picsum.photos/1920/1080?random" -->
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgb(162, 155, 255),rgba(0, 38, 255, 0.2)"
          ></v-img>
        </template>

        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

        <v-toolbar-title>PalExchange</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn to="/auth/login" icon>
          <v-icon>mdi-login</v-icon>
        </v-btn>

        <!-- <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon color="yellow" v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>Click Me 1</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Click Me 2</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Click Me 3</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Click Me 4</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->

        <!-- <template v-slot:extension>
            <v-tabs align-with-title>
              <v-tab>Tab 1</v-tab>

              <v-tab>Tab 2</v-tab>

              <v-tab>Tab 3</v-tab>
            </v-tabs>
          </template> -->
      </v-app-bar>
      <v-carousel draggable="false" cycle height="100vh" hide-delimiters>
        <v-carousel-item v-for="(item, i) in items" :key="i">
          <v-sheet color="black" height="100%" tile>
            <v-row class="fill-height" align="center" justify="space-around">
              <v-col class="d-flex justify-center text-center white--text">
                <div>
                  <h1 style="width: 30ch">{{ quotes[i] }}</h1>
                </div>
              </v-col>
              <v-col class="d-flex justify-center text-center white--text">
                <div
                  :style="{
                    backgroundImage: `url('/landing/${i + 1}.png')`,
                  }"
                  class="test_side"
                ></div>
              </v-col>

              <!-- <img
              height="100%"
                src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
                alt=""
              /> -->
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <!-- <v-sheet max-height="600" color="orange" id="scrolling-techniques-4">
        <v-container> </v-container>
      </v-sheet> -->
    </v-card>

    <!-- <div>
        <v-btn to="/dashboard"> <h1>go to dashboard here</h1></v-btn>
      </div> -->
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
      quotes: [
        "الصرافة",
        "الحوالات",
        "التقارير",
        "القيود",
      ],
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      model: 0,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    };
  },
};
</script>
<style>
.landing-mian {
  background-color: #000 !important;
}
.test_side {
  /* width: 50%; */
  background-repeat: no-repeat;
  background-size: auto;
  height: 500px;
  background-position: center;
  width: 600px;
  text-align: center;
  border-radius: 50px;
  background-size: cover;
  /* background-image: url("/_nuxt/assets/img/landing/1.png"); */
}
</style>
