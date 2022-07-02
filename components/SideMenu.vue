<template>
  <v-navigation-drawer
    app
    clipped    
    :mini-variant.sync="drawer"
    permanent
    :right="$vuetify.rtl"
  >
    <v-card rounded flat>
      <v-btn @click="drawer = !drawer" class="px-7" :block="!drawer" icon rounded color="primary">
        <v-icon>
           fas fa-bars 
        </v-icon>
        <v-spacer></v-spacer>
        <span v-if="!drawer">
        {{$t('menu')}}
        </span>
        <v-spacer></v-spacer>
      </v-btn>
      <v-list>
      <v-divider></v-divider>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{user.name}}
        <v-list-item-subtitle>
          {{user.email}}
        </v-list-item-subtitle>
        </v-list-item-title>
        <v-btn
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list shaped dense>
        <v-list-group
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
        </v-list-group>

        <v-list-item
          v-for="item in items.filter((i) => !i.items && i.types[c_type])"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="primary" @click="$auth.logout()" :icon="drawer">
          <v-icon class="pa-2"> fas fa-sign-out-alt </v-icon>
          <span v-if="!drawer">
          {{$t('logout')}}
          </span>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { mapState } from 'vuex';
import items from "../helpers/admin_menu";
export default {
  //
  data() {
    return {
      selectedItem: null,
      items,
      drawer: false,
    };
  },
  computed:{
    ...mapState({
      user:state=>state.auth.user
    }),
    c_type(){
      let types=['admin','customer'];
      return types[this.user.type-1];
    }
  }
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
</style>