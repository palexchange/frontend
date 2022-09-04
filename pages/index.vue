<template>
  <div style="height: 100vh; display: relative" class="landing-mian">
    <v-container style="max-height: 100vh; display: relative">
      <v-card style="height: 100%" color="#000" flat class="overflow-hidden">
        <v-app-bar dark scroll-target="#scrolling-techniques-4">
          <!-- src="https://picsum.photos/1920/1080?random" -->
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(255,127,80), rgba(25,32,72,.2)"
            ></v-img>
          </template>

          <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

          <v-toolbar-title>PalExchange</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn to="/auth/login" icon>
            <v-icon>mdi-login</v-icon>
          </v-btn>

          <v-btn to="/landing-mian" icon>
            <v-icon>mdi-heart</v-icon>
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

        <v-sheet max-height="600" color="orange" id="scrolling-techniques-4">
          <v-container> </v-container>
        </v-sheet>
      </v-card>
      <!-- <div>
        <v-btn to="/dashboard"> <h1>go to dashboard here</h1></v-btn>
      </div> -->
    </v-container>
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
</style>
