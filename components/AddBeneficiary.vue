<template>
  <v-card>
    <v-toolbar color="primary" dark
      ><v-spacer></v-spacer>
      {{ $t(`${dialog_item ? "edit" : "add"} beneficiary`) }}
      <v-spacer></v-spacer
    ></v-toolbar>
    <div >
      <v-form v-model="validated">
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                required
                text="beneficiary name"
                v-model="form.name"
                holder="beneficiary name"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                v-model="form.phone"
                text="phone"
                holder="phone"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                v-model="form.id_no"
                text="id number"
                holder="id number"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                v-model="form.address"
                text="address"
                holder="address"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <CountryAutocomplete
                v-model="form.country_id"
                text="country"
                holder="country"
              >
              </CountryAutocomplete>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <CityAutocomplete
                @close="change_city"
                v-model="form.city_id"
                holder="city"
                text="city"
              >
              </CityAutocomplete>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <CurrencyAutoComplete
                v-model="form.default_currency_id"
                holder="default currency"
                text="default currency"
              >
              </CurrencyAutoComplete>
            </v-col>
            <v-col cols="12" sm="8" xs="12">
              <FileUpload
                v-model="photo"
                holder="default currency"
                text="default currency"
              >
              </FileUpload>
            </v-col>
            <v-col cols="12" sm="8" xs="12">
              <img :src="form.image ? form.image.url : ''" alt="" />
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
      validated: false,
      photo: null,
      form: {
        type: 0,
        city_id: 0,
      },
    };
  },
  methods: {
    save() {
      this.$save(this.form, "party").then((data) => {
        if (this.photo) {
          this.$save(
            { file: this.photo, attachable_type: 2, attachable_id: data.id },
            "file"
          );
        }
      });
      this.dialog = false;
      this.form = {};
      this.$store.dispatch("closeDialog");
    },
    change_city(city_id) {
      console.log("Reeeacchhhh");
      if(city_id)
      this.form.city_id = city_id;
    }
  },
  computed: {
    ...mapState({
      all_currencies: (state) => state.currency.all,
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