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
            (v) => v.net_balance + v.price != 0
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
                  <h3>
                    {{ account.name }}
                  </h3>
                </v-col>
                <!-- <v-col style="font-size: 18px; color: black">
                {{ account.name }}
              </v-col> -->
              </v-row>
              <div style="font-size: 20px; color: black">آخر اليوم</div>
              <div style="font-size: 20px; color: black">
                {{ (account.net_balance * 1 + account.price * 1) | money }}
              </div>
              <div style="font-size: 20px; color: black">رصيد جرد</div>
              <div style="font-size: 20px; color: light-black">
                {{ account.inventory_balance | money }}
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
    this.$auth.fetchUser();
    let coiunt = this.$auth.user.active_accounts.reduce((a, n) => {
      return a + n.net_balance * 1;
    }, 0);
    console.log("coiunt");
    console.log(coiunt);
  },
  filters: {
    money(value) {
      if (value) {
        return (value * 1).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        });
      } else {
        return 0.0;
      }
    },
  },
};
</script>

<style>
</style>