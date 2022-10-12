<template>
  <v-card>
    <v-toolbar color="primary" dark
      ><v-spacer></v-spacer>
      {{ $t(`${dialog_item ? "edit" : "add"} receipt`) }}
      <v-spacer></v-spacer
    ></v-toolbar>
    <div>
      <v-form v-model="validated">
        <v-card-title> تحويل رصيد </v-card-title>
        <v-card-text class="pa-6">
          <v-row dense>
            <v-col cols="12" sm="6" xs="12">
              <AccountAutocomplete
                required
                return-object
                @change="(v) => (form.from_account_id = v.id)"
                :params="{ type_id: 3, per_page: -1 }"
                v-model="from_account"
                text="from box"
                holder="from box"
              ></AccountAutocomplete>
            </v-col>
            <v-col cols="12" sm="6" xs="12">
              <AccountAutocomplete
                required
                return-object
                @change="(v) => (form.to_account_id = v.id)"
                :params="{ type_id: 3, per_page: -1 }"
                v-model="to_account"
                text="to box"
                holder="to box"
              ></AccountAutocomplete>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                required
                v-model.number="form.from_amount"
                holder="من كمية"
                :text="`من كمية (${from_account.currency.name || ''})`"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                required
                v-model.number="form.exchange_rate"
                text="exchange rate"
                holder="exchange rate"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                disabledd
                :value="total_to_amount"
                :text="`إلي كمية (${to_account.currency.name || ''})`"
                holder="إلي كمية"
              ></InputField>
            </v-col>
          </v-row>
          <v-row>
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
      to_account: { currency: {} },
      from_account: { currency: {} },
      form: {
        status: 1,
        type: 3,
      },
    };
  },
  methods: {
    save() {
      this.$save(this.form, "receipt");
    },
  },
  computed: {
    total_to_amount() {
      let amount = this.form.from_amount;
      let exchange_rate = this.form.exchange_rate;
      if (exchange_rate && amount) {
        exchange_rate;
        console.log(amount);
        console.log(exchange_rate);
        console.log("exchange_rate");
        let total = amount * exchange_rate;
        this.form.to_amount = total;
        return total;
      }
      return 0;
    },
    ...mapState({
      dialog_item: (state) => state.state_dialog.item,
      user_accounts: (state) => state.user_account.all,
    }),
  },
};
</script>

<style>
</style>