<template>
  <div>
    <v-row class="">
      <v-col v-for="currency in 7">
        <v-card flat style="border: 1px solid lightgrey">
          <v-card-text class="text-center text-black">
            <v-row dense>
              <v-col cols="3"><img src="/calculator.png" alt="" /></v-col>
              <v-col style="font-size: 18px; color: black">
                {{ currencies[currency] }}
              </v-col>
            </v-row>
            <div style="font-size: 20px; color: black">15</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currencies: ['asds',"دولار", "شيكل", "دينار" , 'يورو' , 'ريال'  ,'درهم', 'جنيه'],
    };
  },
};
</script>

<style>
</style>