<template>
  <BaseFilter v-bind="$attrs" v-on="$listeners" :params="params">
    <v-form ref="filter">
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
      </v-row>
    </v-form>
  </BaseFilter>
</template>
<script>
export default {
  data() {
    return {
      params: {},
    };
  },
};
</script>