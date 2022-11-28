import Vue from 'vue';
import { mapState } from 'vuex';
import store from '../store';
let mixin = {
  computed: {
    ...mapState({
      errors: state => state.erorrs,
      app_setting: (state) => state.app_settings
    })
  },
  methods: {
    resetValidation(module = null) {
      // this.$refs.form.resetValidation();
      if (module) {
        this.$store.dispatch(`${module}/clearErrors`);
      }
    },
  },

  filters: {
    // money(value) {
    //   console.log("in the filter here man ");
    //   console.log(value);
    //   if (value) {
    //     return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
    //   }
    // },
  },
}
Vue.mixin(mixin);
export default {}