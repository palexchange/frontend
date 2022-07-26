<template>
  <v-navigation-drawer
    v-model="drawer"
    :temporary="$vuetify.breakpoint.mobile"
    app
    style="border: none"
    color="#E0E0FF"
    :mini-variant.sync="drawer"
    :permanent="!$vuetify.breakpoint.mobile"
    width="218"
    :right="$vuetify.rtl"
  >
    <v-card color="#E0E0FF" flat>
      <v-list height="135px" class="d-flex justify-center px-2">
        <v-list-item class="justify-center">
          <v-list-item-avatar class="justify-center">
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title class="text-center">
            user.name
            <v-list-item-subtitle> user.email </v-list-item-subtitle>
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list dense>
        <!-- <v-list-group
          v-for="item in items.filter((i) => i.items != null)"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            link
            :to="child.to"
            :style="`${!$vuetify.rtl ? 'padding-left' : 'padding-right'}:25px;`"
          >
            <v-list-item-icon
              :style="`${!$vuetify.rtl ? 'margin-left' : 'margin-right'}:0px;`"
            >
              <v-icon x-small>
                {{ child.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t(child.title)"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group> -->

        <!-- active-class="deactive" -->
        <v-list-item
          exact-active-class="active"
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <img :src="getImgUrl(item.icon)" v-bind:alt="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <template v-slot:append>
      <div style="background-color: #e0e0ff" class="pa-2">
        <v-btn
          block
          text
          color="primary"
          @click="$auth.logout()"
          :icon="drawer"
        >
          <v-icon color="grey darken-2" class="pa-2">
            fas fa-sign-out-alt
          </v-icon>
          <span class="grey--text text--darken-4" v-if="!drawer">
            {{ $t("logout") }}
          </span>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { mapState } from "vuex";
import items from "../helpers/admin_menu";
export default {
  props: {
    forgin_drawer: {
      type: Boolean,
      default: false,
    },
  },
  //
  data() {
    return {
      selectedItem: null,
      items,
      drawer: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    // c_type() {
    //   let types = ["admin", "customer"];
    //   return types[this.user.type - 1];
    // },
  },
  watch: {
    forgin_drawer(val) {
      this.drawer = val;
    },
    drawer(val) {
      if (val != this.forgin_drawer) {
        this.$emit("change_dawer");
      }
    },
  },
  methods: {
    getImgUrl(pic) {
      return require("~/assets/img/icons/" + pic);
    },
  },
};
</script>
<style>
.list-icon-margin-fix-rtl {
  margin-left: 0px;
}
.list-icon-margin-fix-ltr {
  margin-right: 0px;
}
.list-item-padding-fix-rtl {
  padding-left: 25px;
}
.list-item-padding-fix-ltr {
  padding-right: 25px;
}
/* .v-list-item--active {
  background-color: transparent !important;
} */

.active::before {
  content: "";
  width: 5px;
  height: 100%;
  background: #ee4d38;
  opacity: 1 !important;
  border-radius: 30px;
  position: absolute;
  top: 2%;
  right: 2%;
}
.theme--light.v-list-item--active::before {
  opacity: 0;
}
</style>