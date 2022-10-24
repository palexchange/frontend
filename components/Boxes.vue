<template>
  <div>
    <v-row class="">
      <v-col cols="2" v-for="(account, i) in $auth.user.active_accounts">
        <v-card flat style="border: 1px solid lightgrey">
          <v-card-text class="text-center text-black">
            <v-row dense>
              <v-col>
                <!-- <img
                  width="50"
                  :src="`/icons/currencies/${account.id}.png`"
                  alt=""
              /> -->
                {{ account.name }}
              </v-col>
              <!-- <v-col style="font-size: 18px; color: black">
                {{ account.name }}
              </v-col> -->
            </v-row>
            <div style="font-size: 20px; color: black">
              {{ parseFloat(account.balance).toFixed(4) }}
            </div>
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
    return {};
  },

  mounted() {
    this.$store.dispatch("currency/index");
  },
};
</script>

<style>
</style>