<template>
  <div>
    <v-card :elevation="0" class="p-8 my-5">
      <v-tabs v-model="seted_tab">
        <v-tab :key="i" v-for="(tab, i) in tabs"> {{ $t(tab.header) }}</v-tab>
        <v-tab-item :key="i" v-for="(tab, i) in tabs">
          <v-card flat>
            <v-card-text>
              <component :is="tab.component_name" />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      download_item: null,
      seted_tab: 0,
      tabs: [
        {
          header: this.$t("users"),
          component_name: "SettingsUsers",
        },
        {
          header: this.$t("accounts"),
          component_name: "SettingsAccounts",
        },
        {
          header: this.$t("accounts balances"),
          component_name: "SettingsAccountsBalance",
        },
        {
          header: this.$t("entries"),
          component_name: "SettingsEntry",
        },
        // { header: "currencies report", component_name: "Card" },
        // { header: "courier report", component_name: "Card" },
      ],
    };
  },
  methods: {
    handle(v) {
      this.download_item = v;
    },
  },
};
</script>

<style>
</style>