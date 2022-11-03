<template>
  <div>
    <!-- <Card> -->
    <DataTable
      single-expand
      module="exchange"
      show-expand
      :expanded.sync="expanded_item"
    >
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length" class="pa-0">
          <v-card color="primary" flat class="px-8">
            <DataTable
              hide_pagination
              no_class
              module="exchange_detail"
              :params="params2"
              :noActions="true"
            />
          </v-card>
        </td>
      </template>
    </DataTable>
    <!-- </Card> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      expanded_item: [],
      params2: {},
      va: 0,
    };
  },
  computed: {
    ...mapState({
      action: (state) => state.context.action,
      item: (state) => state.context.item,
      setting_time: (state) => state.setting.one,
    }),
  },
  watch: {
    expanded_item(val) {
      if (val[0]) {
        this.params2 = {
          exchange_id: val[0].id ? val[0].id : "",
          per_page: 999,
        };
      }
    },
    action(val) {
      if (this[val]) {
        this[val](this.item);
      }
    },
  },
  created() {
    this.$store.dispatch('setting/show', "time_allowed_for_deletion");
  },
  methods: {
    remove(item) {
      console.log(this.module_name);
      if(!this.checkTimeValidForDeletion(new Date(item.created_at))) {
        console.log("In No Enought time Block");
        this.$swal({
          title: this.$t("Error Happend"),
          text: this.$t("You can't delete, more time than the allowed has passed"),
          icon: "error",
          confirmButtonText: this.$t("Ok"),
        }).then((v) => {return;});
      }
      else {
      this.$swal({
        title: this.$t("confirm"),
        text: this.$t("are_you_sure"),
        icon: "error",
        confirmButtonText: this.$t("delete"),
      }).then((v) => {
        if (v.value) {
          this.$store.dispatch(`exchange/delete`, item);
        }
      });
    }
    },
    checkTimeValidForDeletion(date) {
      let tempDate = new Date(date.getTime() + (60 * 1000 * parseInt(this.setting_time.value)));
      // console.log("TempDate Constructor: ",tempDate.getTime());
      // console.log("date getMin: ",date.getMinutes());
      // tempDate.setMinutes(date.getMinutes() + parseInt(this.setting_time.value));
      // console.log("TempDate setMin: ",tempDate.getTime());
      // tempDate = new Date(tempDate);
      let now = new Date();
      let diff = tempDate.getTime() - now.getTime();
      console.log("TempDate: ",tempDate);
      console.log("Now: ",now);
      console.log("TempDate: ",diff);
      return diff > 0;
    },
  }
};
</script>

<style>
</style>