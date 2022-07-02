<template>
  <v-card>
    <v-card-title> {{ $t("items_form") }} </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="item.name"
              outlined
              dense
              :label="$t('name')"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="item.email"
              outlined
              dense
              type="email"
              :label="$t('email')"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="item.phone"
              outlined
              dense
              type="phone"
              :label="$t('phone')"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="item.address"
              outlined
              dense
              :label="$t('address')"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="item.category"
              outlined
              dense
              :label="$t('category')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn block color="primary" @click="$save(item, 'user')">
            {{ $t("save") }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      item: {
        type: 2,
        
      },
    };
  },
 async mounted() {
    if (this.$route.params.id) {
      await this.$store.dispatch("user/show", this.$route.params.id);
    }
  },
  computed: {
    ...mapState({
      user:state=>state.user.one,
    }),
  },
  watch: {
    user(v) {
      this.item = JSON.parse(JSON.stringify(v));
    },
  },
};
</script>

<style>
</style>