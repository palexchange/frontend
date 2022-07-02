import Vue from 'vue';
import VueCookie from 'vue-cookie';
Vue.use(VueCookie);
export default {}
// let testPromise = new Promise((resolve, reject) => {
//     let a = 1 + 1
//     if (a = 2) {
//         resolve('promise is true')
//     } else {
//         reject("rejected")
//     }

// })
// testPromise.then((success) => {
//     console.log(success);
// }).catch(() => {
//     console.log(success);
// })