<template>
  <v-card>
    <v-toolbar color="primary" dark
      ><v-spacer></v-spacer>
      {{ $t(`${dialog_item ? "edit" : "add"} role`) }}
      <v-spacer></v-spacer
    ></v-toolbar>
    <v-card-text>
      <div>
        <v-row class="button-responsive align-center">
          <v-col cols="12" xs="12" sm="6" md="4">
            <RoleAutocomplete
              
              v-model="form.roles_name"
              text="Availeble Roles"
         
            />
          </v-col>
          <v-col class="text-left" cols="12" xs="12" sm="6" md="8">
            <v-btn @click="save" color="primary" height="45">
              {{ $t("save") }}</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>
  
  <script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      form: {roles_name: null},
    };
  },
  methods: {
    save() {
      this.form["to_user_id"] = this.dialog_item.id;
      this.$save(this.form, "role_permission").then((data) => {
        if (data && data.id) {
          this.$store.dispatch("closeDialog");
          this.form = {};
          this.dialog = false;
        }
      });
    },
  },
  created() {
    this.$store.dispatch("role_permission/show",  this.dialog_item.id );
  },
  computed: {
    ...mapState({
      all_permissions: (state) => state.permission.all,
      dialog_item: (state) => state.state_dialog.item,
      role_name: (state) => state.role_permission.one,
    }),
  },
  watch: {
    role_name(new_val) {
    console.log(new_val,"0000000000");
    console.log(new_val[0],"0000000000");
      if (new_val){ 
        this.form.roles_name =  new_val[0];
        console.log(new_val[0],"iM iN");
    }
    },
  },
};
</script>
  
  <style>
</style>