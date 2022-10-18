<template>
  <v-card  class="pa-5" flat color="#fafafa">
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
        {{ $t("add permissions to role") + " " + role.name }}
      </h4>
    </div>

    <v-form v-model="validated">
      <v-row>
        <v-col :key="i" v-for="(permission, i) in permissions" cols="4">
          <v-checkbox
            :value="permission"
            :value-comparator="idComparator"
            :label="$t(permission.name)"
            v-model="item"
          >
          </v-checkbox>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="4">
          <v-btn
            dense
            :disabled="!validated"
            class="primary"
            @click.prevent="save()"
         
          >{{$t('save')}} </v-btn>

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
      validated: false,
      item: {},
    };
  },
  methods: {
    save() {
      this.$store.dispatch("role/update", {
        permessions: this.item,
        ...this.role,
      });
    },
    idComparator(a, b) {
      return a.id == b.id;
    },
  },
  computed: {
    ...mapState({
      role: (state) => state.context.item,
      role_permissions: (state) => state.role.one,
      permissions: (state) => state.permission.all,
    }),
  },
  watch: {
    role_permissions(val) {
      this.item = val;
    },
  },

  async mounted() {
    await this.$store.dispatch("role/show", this.role.id);
    await this.$store.dispatch("permission/index", { per_page: -1 });
  },
};
</script>

<style>
</style>