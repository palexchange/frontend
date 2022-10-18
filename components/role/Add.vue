<template>
  <v-card class="pa-5" flat color="#fafafa">
    <div
      class="
        text-capitalize
        box-title-sec
        d-flex
        justify-content-between
        items-center
      "
    >
      <h4 class="title-sec">
        {{ $t("add new role") }}
      </h4>
    </div>
    <v-form v-model="validated">
      <v-row>
        <v-col cols="3">
          <InputField
            v-model="item.name"
            required
            holder="role name"
            text="role name"
          />
        </v-col>
      </v-row>
      <v-row class="justify-start">
        <v-col cols="3">
          <v-btn
            :disabled="!validated"
            class="primary"
            @click.prevent="$save(item, 'role')"
       
          >{{$t('add')}}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      item: {
        validated: false,
      },
    };
  },
  computed: {
    ...mapState({
      role: (state) => state.context.item,
    }),
  },
  watch: {
    role(val) {
      if (val) {
        this.item = JSON.parse(JSON.stringify(val));
      }
    },
  },
  mounted() {
    if (this.role) {
      this.item = JSON.parse(JSON.stringify(this.role));
    }
  },
};
</script>

<style>
</style>