<template>
  <div>
    <v-menu
      :position-x="coordinates.x"
      :position-y="coordinates.y - 70"
      v-model="active_menu"
      transition="slide-y-transition"
      bottom
    >
      <v-list>
        <v-list-item v-for="(item, i) in users" :key="i">
          <v-list-item-title dir="rtl">
            {{ user.daily_profit }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    active_menu: Boolean,
    profit_name: String,
    coordinates: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data: () => ({
    test: true,
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style>
</style>