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
        <v-col cols="3">
          <v-text-field
            prepend-inner-icon="fas fa-dollar-sign"
            v-model="params.price"
            filled
            rounded
            :placeholder="$t('price')"
            :label="$t('price')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            prepend-inner-icon="fas fa-dollar-sign"
            v-model="params.price1"
            filled
            rounded
            :placeholder="$t('price1')"
            :label="$t('price1')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            prepend-inner-icon="fas fa-dollar-sign"
            v-model="params.price2"
            filled
            rounded
            :placeholder="$t('price2')"
            :label="$t('price2')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            prepend-inner-icon="fas fa-dollar-sign"
            v-model="params.price3"
            filled
            rounded
            :placeholder="$t('price3')"
            :label="$t('price3')"
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