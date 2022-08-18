import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _41466920 = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _7caa7f98 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _40cef102 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _555e2606 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _b896d1fe = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/index" */))
const _142db3d8 = () => interopDefault(import('..\\pages\\dashboard\\entries\\index.vue' /* webpackChunkName: "pages/dashboard/entries/index" */))
const _194c2326 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/index" */))
const _2e96e732 = () => interopDefault(import('..\\pages\\dashboard\\inputs\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/index" */))
const _96c5e45c = () => interopDefault(import('..\\pages\\dashboard\\outputs\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/index" */))
const _71f89585 = () => interopDefault(import('..\\pages\\dashboard\\reports\\index.vue' /* webpackChunkName: "pages/dashboard/reports/index" */))
const _76efff26 = () => interopDefault(import('..\\pages\\dashboard\\settings\\index.vue' /* webpackChunkName: "pages/dashboard/settings/index" */))
const _1adb173c = () => interopDefault(import('..\\pages\\dashboard\\transfers\\index.vue' /* webpackChunkName: "pages/dashboard/transfers/index" */))
const _317b0206 = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/index" */))
const _4aa633d0 = () => interopDefault(import('..\\pages\\dashboard\\entries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/entries/form/index" */))
const _9328d52e = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/form/index" */))
const _c91b603a = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/form/index" */))
const _0d1e55e4 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/form/index" */))
const _6cc68a81 = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\index.vue' /* webpackChunkName: "pages/dashboard/reports/form/index" */))
const _c577b12e = () => interopDefault(import('..\\pages\\dashboard\\settings\\form\\index.vue' /* webpackChunkName: "pages/dashboard/settings/form/index" */))
const _0e4968a1 = () => interopDefault(import('..\\pages\\dashboard\\settings\\pricing.vue' /* webpackChunkName: "pages/dashboard/settings/pricing" */))
const _cb23c6b6 = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/_id" */))
const _da622b90 = () => interopDefault(import('..\\pages\\dashboard\\entries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/entries/form/_id" */))
const _5f81de11 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/exchange/form/_id" */))
const _6bee21ea = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/inputs/form/_id" */))
const _fca67a14 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/outputs/form/_id" */))
const _dc718dae = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/reports/form/_id" */))
const _31521fde = () => interopDefault(import('..\\pages\\dashboard\\settings\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/settings/form/_id" */))
const _6a8b913e = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/_id" */))
const _26d48c91 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\outcoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/outcoming/_id" */))
const _0d950b10 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _41466920,
    name: "dashboard"
  }, {
    path: "/inspire",
    component: _7caa7f98,
    name: "inspire"
  }, {
    path: "/auth/login",
    component: _40cef102,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _555e2606,
    name: "auth-register"
  }, {
    path: "/dashboard/beneficiaries",
    component: _b896d1fe,
    name: "dashboard-beneficiaries"
  }, {
    path: "/dashboard/entries",
    component: _142db3d8,
    name: "dashboard-entries"
  }, {
    path: "/dashboard/exchange",
    component: _194c2326,
    name: "dashboard-exchange"
  }, {
    path: "/dashboard/inputs",
    component: _2e96e732,
    name: "dashboard-inputs"
  }, {
    path: "/dashboard/outputs",
    component: _96c5e45c,
    name: "dashboard-outputs"
  }, {
    path: "/dashboard/reports",
    component: _71f89585,
    name: "dashboard-reports"
  }, {
    path: "/dashboard/settings",
    component: _76efff26,
    name: "dashboard-settings"
  }, {
    path: "/dashboard/transfers",
    component: _1adb173c,
    name: "dashboard-transfers"
  }, {
    path: "/dashboard/beneficiaries/form",
    component: _317b0206,
    name: "dashboard-beneficiaries-form"
  }, {
    path: "/dashboard/entries/form",
    component: _4aa633d0,
    name: "dashboard-entries-form"
  }, {
    path: "/dashboard/exchange/form",
    component: _9328d52e,
    name: "dashboard-exchange-form"
  }, {
    path: "/dashboard/inputs/form",
    component: _c91b603a,
    name: "dashboard-inputs-form"
  }, {
    path: "/dashboard/outputs/form",
    component: _0d1e55e4,
    name: "dashboard-outputs-form"
  }, {
    path: "/dashboard/reports/form",
    component: _6cc68a81,
    name: "dashboard-reports-form"
  }, {
    path: "/dashboard/settings/form",
    component: _c577b12e,
    name: "dashboard-settings-form"
  }, {
    path: "/dashboard/settings/pricing",
    component: _0e4968a1,
    name: "dashboard-settings-pricing"
  }, {
    path: "/dashboard/beneficiaries/form/:id",
    component: _cb23c6b6,
    name: "dashboard-beneficiaries-form-id"
  }, {
    path: "/dashboard/entries/form/:id",
    component: _da622b90,
    name: "dashboard-entries-form-id"
  }, {
    path: "/dashboard/exchange/form/:id",
    component: _5f81de11,
    name: "dashboard-exchange-form-id"
  }, {
    path: "/dashboard/inputs/form/:id",
    component: _6bee21ea,
    name: "dashboard-inputs-form-id"
  }, {
    path: "/dashboard/outputs/form/:id",
    component: _fca67a14,
    name: "dashboard-outputs-form-id"
  }, {
    path: "/dashboard/reports/form/:id",
    component: _dc718dae,
    name: "dashboard-reports-form-id"
  }, {
    path: "/dashboard/settings/form/:id",
    component: _31521fde,
    name: "dashboard-settings-form-id"
  }, {
    path: "/dashboard/transfers/incoming/:id?",
    component: _6a8b913e,
    name: "dashboard-transfers-incoming-id"
  }, {
    path: "/dashboard/transfers/outcoming/:id?",
    component: _26d48c91,
    name: "dashboard-transfers-outcoming-id"
  }, {
    path: "/",
    component: _0d950b10,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
