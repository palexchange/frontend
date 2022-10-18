<template>
  <div>
  <Card>
    <v-card-text>
      <v-row>
        <v-col cols="12" xs="12" md="6" lg="2">
          <v-btn block color="primary" @click="$store.dispatch('setDialog', { name: 'AddRole' })">
            {{ $t("Add Role") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </Card>
      <div>
        <data-table module="role" />
      </div>
    </div>
</template>

<script>

  import { mapState  } from "vuex";
export default {
  computed:{
    ...mapState({
      action: (state) => state.context.action,
      item: (state) => state.context.item,
    }),
  },
  watch:{
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
  methods:{
    edit(item) {
      console.log(item);
      this.$store.dispatch("setDialog", {
        name: "RoleBindPermission",
        item,
      });
    },
  }
};
</script>

<style>
</style>