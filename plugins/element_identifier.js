import Vue from 'vue'
Vue.directive('id', {
    bind: async function (el, binding, vnode) {
        let protected_keys = await vnode.context.$store.dispatch('plan_protected_field/index');
        console.log(protected_keys);
        console.log(vnode.context.$store.getters);
        let protected_key = protected_keys.some(k=>k.field_key==binding.value);
        if(protected_key){
            el.style.display='none';
            console.log("a7a 2022");
            console.log(el);
        }
    }
})
export default {}