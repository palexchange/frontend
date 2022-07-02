<template>
  <BaseFilter v-bind="$attrs" v-on="$listeners" :params="params">
    <v-form ref="filter">
    <v-row>
        <v-col cols="3">
            <v-text-field prepend-inner-icon="mdi-calendar" v-model="params.date" v-mask="'####/##/##'" filled rounded :placeholder="$t('date')" :label="$t('date')"></v-text-field>
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