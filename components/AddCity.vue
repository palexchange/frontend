<template>
  <div class="pa-8">
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
            @click="
              $save(item, 'city');
              item = {};
              $store.dispatch('closeDialog');
            "
          >
            {{ $t("save") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
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
};
</script>

<style>
</style>