<template>
  <BaseFilter v-bind="$attrs" v-on="$listeners" :params="params">
    <v-form ref="form">
    <v-row>
      <v-col cols="3">
            <v-text-field prepend-inner-icon="mdi-calendar" v-model="params.from" v-mask="'####/##/##'" filled rounded :placeholder="$t('from_date')" :label="$t('from_date')"></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-text-field prepend-inner-icon="mdi-calendar" v-model="params.to" v-mask="'####/##/##'" filled rounded :placeholder="$t('to_date')" :label="$t('to_date')"></v-text-field>
        </v-col>
        <v-col cols="3">
          <AutoComplete module="user" v-model="params.user_id" />
        </v-col>
    </v-row>
    </v-form>
  </BaseFilter>
</template>
<script>
export default {
  props:['params'],
  data() {
    return {
    };
  },
};
</script>