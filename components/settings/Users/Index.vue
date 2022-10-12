<template>
  <div>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="addUser()"> {{ $t("add user") }}</v-btn>
      </v-col>
    </v-row>
    <data-table module="user"> </data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        type: 0,
      },
    };
  },

  methods: {
    addUser() {
      this.$store.dispatch("setDialog", {
        name: "SettingsUsersCreate",
      });
    },
    edit(item) {
      this.$store.dispatch("setDialog", {
        name: "SettingsUsersCreate",
        item,
      });
    },
    show(item) {
      this.$store.dispatch("setDialog", {
        name: "AddBeneficiary",
        item,
      });
    },
    role_management(item) {
      this.$store.dispatch("setDialog", {
        name: "SettingsUsersRoleManagement",
        item,
      });
    },
  },
  computed: {
    ...mapState({
      action: (state) => state.context.action,
      item: (state) => state.context.item,
    }),
  },
  watch: {
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
};
</script>
 


<style>
</style>