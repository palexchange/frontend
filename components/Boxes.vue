<template>
  <div>
    <v-btn @click="expand = !expand" icon>
      <v-icon small> fas fa-eye</v-icon>
    </v-btn>
    <v-expand-transition>
      <v-row v-show="expand">
        <v-col
          :key="i"
          cols="2"
          v-for="(account, i) in $auth.user.active_accounts.filter(
            (v) => v.balance != 0
          )"
        >
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
                {{ parseFloat(account.balance || 0) | money }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-expand-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      expand: true,
    };
  },

  mounted() {
    this.$store.dispatch("currency/index");
  },
  filters: {
    money(value) {
      if (value) {
        return value == 0
          ? 0
          : value.toLocaleString(undefined, { minimumFractionDigits: 2 });
      }
    },
  },
};
</script>

<style>
</style>