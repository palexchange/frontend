<template>
  <v-card>
    <v-toolbar color="primary" dark
      ><v-spacer></v-spacer> {{ $t("add beneficiary") }} <v-spacer></v-spacer
    ></v-toolbar>
    <v-card-text class="pa-6">
      <v-row>
        <v-col cols="12" sm="4" xs="12">
          <InputField
            v-model="form.name"
            holder="beneficiary name"
          ></InputField>
        </v-col>
        <v-col cols="12" sm="4" xs="12">
          <InputField v-model="form.mobile" holder="mobile"></InputField>
        </v-col>
        <v-col cols="12" sm="4" xs="12">
          <InputField v-model="form.id_no" holder="id number"></InputField>
        </v-col>
        <v-col cols="12" sm="4" xs="12">
          <InputField v-model="form.address" holder="address"></InputField>
        </v-col>
        <v-col cols="12" sm="4" xs="12">
          <InputField
            v-model="form.default_currency"
            holder="default currency"
          ></InputField>
        </v-col>
      </v-row>
      <v-row class="button-responsive">
        <v-col class="text-center">
          <v-btn
            @click="
            console.log('gvf',form);
            
              $save(form, 'party');
              form = {};
              $store.dispatch('closeDialog');
            "
            color="primary"
            height="45"
          >
            {{ $t("save") }}</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },
};
</script>

<style>
</style>