<template>
  <v-card>
    <v-toolbar color="primary" dark
      ><v-spacer></v-spacer>
      {{ $t(`${dialog_item ? "edit" : "add"} beneficiary`) }}
      <v-spacer></v-spacer
    ></v-toolbar>
    <div>
      <v-form v-model="validated">
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12" sm="8">
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
            <v-col cols="12" sm="4" xs="12">
              <AccountAutocomplete
                text="account"
                holder="account"
                v-model="form.account_id"
              />
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <div
                @mouseenter="(v) => (show_delete = true)"
                @mouseleave="(v) => (show_delete = false)"
                :style="
                  show_delete
                    ? 'background: rgba(0, 0, 0, 0.5);width: 100px;position: relative;'
                    : ''
                "
              >
                <img
                  style="width: 100px"
                  :style="show_delete ? 'opacity: 0.2; ' : ''"
                  :src="form.image ? form.image.url : ''"
                  alt=""
                />
                <v-btn
                  @click="deletePhoto(form.image)"
                  v-if="show_delete"
                  outlined
                  style="position: absolute; right: 7%; top: 34%"
                >
                  delete
                </v-btn>
              </div>
            </v-col>
            <v-col class="pa-0" cols="12" xs="12">
              <FileUpload
                v-model="photo"
                holder="default currency"
                text="default currency"
              >
              </FileUpload>
            </v-col>
          </v-row>
          <v-row dense class="button-responsive mt-5">
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
      show_delete: false,
      validated: false,
      photo: null,
      form: {
        type: 0,
      },
    };
  },
  methods: {
    deletePhoto(image) {
      this.$swal({
        title: this.$t("confirm deletion"),
        text: this.$t("are_you_sure"),
        icon: "error",
        confirmButtonText: this.$t("yes"),
      }).then((v) => {
        if (v.value) {
          this.$store.dispatch(`file/delete`, image);
        }
      });
    },
    save() {
      this.form.no_reload = true;
      this.$save(this.form, "party").then((data) => {
        if (this.photo) {
          this.$save(
            {
              file: this.photo,
              attachable_type: 4,
              attachable_id: data.id,
              silent: true,
            },
            "file"
          ).then(() => {
            this.$store.dispatch("party/push", data.id);
          });
        } else {
          this.$store.dispatch("party/push", data.id);
        }
        this.$store.dispatch("account/index", { per_page: -1 });
      });
      this.dialog = false;
      this.form = {};
      this.$store.dispatch("closeDialog");
    },
    change_city(city_id) {
      console.log("Reeeacchhhh");
      if (city_id) this.form.city_id = city_id;
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