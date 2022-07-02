<template>
  <BaseFilter v-bind="$attrs" v-on="$listeners" :params="params">
    <v-form ref="filter">
      <v-row>
        <v-col cols="3">
          <v-text-field
            prepend-inner-icon="mdi-calendar"
            v-model="params.from_date"
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
            v-model="params.to_date"
            v-mask="'####/##/##'"
            filled
            rounded
            :placeholder="$t('to_date')"
            :label="$t('to_date')"
          ></v-text-field>
        </v-col>
        <v-col cols="3"
              v-if="user.type == 1"
        
        >
          <AutoComplete
            module="user"
            v-model="params.user_id"
            :label="$t('user')"
            filled
            rounded
            dense
          />
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
      </v-row>
    </v-form>
  </BaseFilter>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      params: {},
      status_items: [
        {
          name: this.$t("draft"),
          id: 0,
        },
        {
          name: this.$t("confirmed"),
          id: 1,
        },
        {
          name: this.$t("finalized"),
          id: 2,
        },
        {
          name: this.$t("cancelled"),
          id: 3,
        },
      ],
    };
  },
  computed:{
    ...mapState({
      user: (state) => state.auth.user,
    })
  }
};
</script>