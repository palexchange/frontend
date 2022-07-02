import Vue from 'vue';
import { mapState } from 'vuex';
import store from '../store';
let mixin = {
  computed: {
    ...mapState({
      errors: state => state.erorrs
    })
  },
  methods:{
    resetValidation (module=null) {
      // this.$refs.form.resetValidation();
      if(module){
        this.$store.dispatch(`${module}/clearErrors`);
      }
    },
  }
}
Vue.mixin(mixin);
export default {}