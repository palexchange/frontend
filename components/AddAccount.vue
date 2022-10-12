<template>
  <v-card>
    <v-toolbar color="primary" dark
      ><v-spacer></v-spacer>
      {{ $t(`${dialog_item ? "edit" : "add"} account`) }}
      <v-spacer></v-spacer
    ></v-toolbar>
    <div>
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
              <AccountAutocomplete
                v-model="form.type_id"
                text="parent account number"
                holder="parent account number"
              ></AccountAutocomplete>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <AutoAccount
                v-model="form.parent_id"
                text="type"
                holder="type"
              ></AutoAccount>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                v-model="form.code"
                text="code"
                holder="code"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                v-model="form.description"
                text="description"
                holder="description"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                v-model="form.notes"
                text="notes"
                holder="notes"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <UserAutocomplete
                clearable
                v-model="form.user_id"
                text="sign account to user"
                holder="sign account to user"
              ></UserAutocomplete>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <CurrencyAutoComplete
                clearable
                v-model="form.currency_id"
                text="box currency"
                holder="box currency"
              ></CurrencyAutoComplete>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <v-checkbox
                v-model="form.is_transaction"
                color="primary"
                label="is_transaction"
              />
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
      this.$save(this.form, "account");
      this.dialog = false;
      this.form = {};
      this.$store.dispatch("closeDialog");
    },
    // change_city(city_id) {
    //   console.log("Reeeacchhhh");
    //   if (city_id) this.form.city_id = city_id;
    // },
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