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
            <InputField
              v-model="form.name"
              required
              text="Role Name"
            ></InputField>
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
            form: {},
        };
    },
    methods: {
        save() {
            this.$save(this.form, "role");
            this.dialog = false;
            this.form = {};
            this.$store.dispatch("closeDialog");
        },
    },
    computed: {
        ...mapState({
            all_permissions: (state) => state.permission.all,
            dialog_item: (state) => state.state_dialog.item,
        }),
    },
    watch: {
        all_permissions(new_val) {
            console.log("Watcher");
            console.log(new_val);
        },
    },

};
</script>

<style>
</style>