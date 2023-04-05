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
            {{ item.name }} :
            {{
              item.id == 1
                ? getAdminAmount()
                : (item[profit_name] * 1).toFixed(3)
            }}
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
      users: (state) => state.user.all,
    }),
  },
  methods: {
    getAdminAmount() {
      let sub_amount = this.users.reduce((e, user) => {
        if (user.id != 1) {
          return (user[this.profit_name] || 0) * 1 + e;
        }
        return 0;
      }, 0);
      const admin = this.users.find((user) => user.id == 1);
      return (admin[this.profit_name] - sub_amount).toFixed(3);
    },
  },
};
</script>

<style>
</style>