<template>
  <BaseFilter v-bind="$attrs" v-on="$listeners" :params="params">
    <v-row>
      <v-col cols="3">
        <v-text-field
          prepend-inner-icon="fas fa-user"
          v-model="params.name"
          filled
          rounded
          :placeholder="$t('name')"
          :label="$t('name')"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          prepend-inner-icon="fas fa-envelope"
          v-model="params.email"
          filled
          rounded
          :placeholder="$t('email')"
          :label="$t('email')"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          prepend-inner-icon="fas fa-phone"
          v-model="params.phone"
          filled
          rounded
          :placeholder="$t('phone')"
          :label="$t('phone')"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-autocomplete
          :items="status_items"
          item-text="name"
          item-value="id"
          v-model="params.status"
          multiple
          :label="$t('status')"
          filled
          dense
          rounded
          clearable
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          prepend-inner-icon="fas fa-bookmark"
          v-model="params.category"
          :label="$t('category')"
          filled
          dense
          rounded
        />
      </v-col>
    </v-row>
  </BaseFilter>
</template>
<script>
export default {
  data() {
    return {
      params: {},
      status_items: [
        {
          name: this.$t("pending"),
          id: 0,
        },
        {
          name: this.$t("active"),
          id: 1,
        },
        {
          name: this.$t("stopped"),
          id: 2,
        },
      ],
    };
  },
};
</script>