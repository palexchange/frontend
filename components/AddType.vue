<template>
    <v-card>
      <v-toolbar color="primary" dark
        ><v-spacer></v-spacer>
        {{ $t(`${dialog_item ? "edit" : "add"} account type`) }}
        <v-spacer></v-spacer
      ></v-toolbar>
      <div >
        <v-form v-model="validated">
          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" sm="4" xs="12">
                <InputField
                  required
                  text="name"
                  v-model="form.name"
                  holder="name"
                ></InputField>
              </v-col>
              <v-col cols="12" sm="4" xs="12">
                <TypeAutoComplete
                  v-model="form.parent_id"
                  text="parent"
                  holder="parent"
                ></TypeAutoComplete>
              </v-col>
            </v-row>
            <v-row class="button-responsive">
              <v-col class="text-center">
                <v-btn
                  :disabled="!validated"
                  @click="save"
                  color="primary"
                  height="45"
                >
                  {{ $t("save") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </div>
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
            this.$save(this.form, "account_type");
            this.dialog = false;
            this.form = {};
            this.$store.dispatch("closeDialog");
        },
    },
    computed: {
        ...mapState({
            dialog_item: (state) => state.state_dialog.item,
        }),
    },
    mounted() {
        if (this.dialog_item) {
            this.form = JSON.parse(JSON.stringify(this.dialog_item));
        }
    },
};
  </script>
  
  <style>
  </style>