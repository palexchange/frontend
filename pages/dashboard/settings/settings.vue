<template>
  <div>
    <Card>
      <v-form v-model="validated">
        <v-card-title>
          <Title title="app settings" />
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" xs="12" sm="6" md="4" lg="3">
              <InputField
                :text="
                  keys['time_allowed_for_deletion']
                    ? keys['time_allowed_for_deletion']['description']
                    : ``
                "
                :value="
                  keys['time_allowed_for_deletion']
                    ? keys['time_allowed_for_deletion']['value']
                    : 0
                "
                @change="
                  (v) =>
                    (item['time_allowed_for_deletion'] = {
                      key: 'time_allowed_for_deletion',
                      value: v,
                    })
                "
                hide-details
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="4" lg="3">
              <BeneficiaryAutocomplete
                :text="
                  keys['general_customer']
                    ? keys['general_customer']['description']
                    : ``
                "
                :value="{
                  id: parseFloat(
                    keys['general_customer']
                      ? keys['general_customer']['value']
                      : 0
                  ),
                }"
                @change="
                  (v) =>
                    (item['general_customer'] = {
                      key: 'general_customer',
                      value: v,
                    })
                "
                hide-details
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="4" lg="3">
              <BeneficiaryAutocomplete
                :text="
                  keys['moneygram_account']
                    ? keys['moneygram_account']['description']
                    : ``
                "
                :value="{
                  id: parseFloat(
                    keys['moneygram_account']
                      ? keys['moneygram_account']['value']
                      : 0
                  ),
                }"
                @change="
                  (v) =>
                    (item['moneygram_account'] = {
                      key: 'moneygram_account',
                      value: v,
                    })
                "
                hide-details
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn :disabled="!validated" color="primary" @click="saveSettings">
            {{ $t("save") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      validated: false,
      item: {},
      keys2: new Set([
        "time_allowed_for_deletion",
        "general_customer",
        "moneygram_account",
      ]),
      keys: {},
    };
  },
  computed: {
    ...mapState({
      all_settings: (state) => state.setting.all,
      user: (state) => state.user.one || {},
    }),
  },
  created() {
    this.$store.dispatch("setting/index");
  },
  methods: {
    saveSettings() {
      this.$save(this.item, "setting").then((data) => {
        if (data && data.id) {
          this.item = {};
        }
      });
    },
  },
  watch: {
    all_settings(val) {
      this.keys = val.reduce((obj, item) => Object.assign(obj, item), {});
    },
  },
};
</script>

<style>
</style>