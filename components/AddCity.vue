<template>
  <v-card class="pa-8">
    <v-form v-model="validated">
      <v-row>
        <v-col>
          <InputField required v-model="item.name" text="city" holder="city" />
        </v-col>
        <v-col>
          <CountryAutocomplete
            required
            v-model="item.country_id"
            text="country"
            holder="country"
          />
        </v-col>
        <v-col align-self="center">
          <v-btn
            :disabled="!validated"
            color="primary"
            @click="saveCity"
          >
            {{ $t("save") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      validated: false,
      item: {},
    };
  },
  methods: {
    async saveCity() {
      let response = await this.$save(this.item,'city');
      this.$emit('close',response.id);
      this.item = {};
    },
  }
};
</script>

<style>
</style>