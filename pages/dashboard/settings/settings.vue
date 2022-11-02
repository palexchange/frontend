<template>
  <div>
    <Card>
      <v-form v-model="validated">
        <v-card-title>
          <Title title="Settings" />
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col
              :key="row"
              v-for="row in all_settings"
              cols="12"
              xs="12"
              sm="6"
              md="4"
              lg="3"
            >
              <InputField
                :text="row['description']"
                :value="row['value']"
                @change="
                  (v) => (item[row['key']] = { key: row['key'], value: v })
                "
                :hide_details="true"
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
    return { validated: false, item: {} };
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
};
</script>

<style>
</style>