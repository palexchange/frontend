import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {"duration":5000,"keepOnHover":true,"position":"top-center"})

const globals = undefined
if(globals) {
  globals.forEach(global => {
    Vue.toasted.register(global.name, global.message, global.options)
  })
}

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}
