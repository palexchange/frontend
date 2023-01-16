<template>
  <BaseFilter v-bind="$attrs" v-on="$listeners" :params="params">
    <v-form ref="filter">
      <v-row>
        <v-col cols="3">
          <v-text-field
            prepend-inner-icon="mdi-calendar"
            v-model="params.date"
            v-mask="'####/##/##'"
            filled
            rounded
            :placeholder="$t('from_date')"
            :label="$t('from_date')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            prepend-inner-icon="mdi-calendar"
            v-model="params.date"
            v-mask="'####/##/##'"
            filled
            rounded
            :placeholder="$t('to_date')"
            :label="$t('to_date')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <AutoComplete
            module="user"
            v-model="params.user_id"
            filled
            rounded
            dense
            :label="$t('user')"
            prepend-inner-icon="fas fa-user"
          />
        </v-col>
      </v-row>
    </v-form>
  </BaseFilter>
</template>
<script>
export default {
  props: ["params"],
  data() {},
};
</script>
