import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0bedd392 = () => interopDefault(import('..\\pages\\child.vue' /* webpackChunkName: "pages/child" */))
const _7f1d2738 = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _36f37a60 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _15117824 = () => interopDefault(import('..\\pages\\parent.vue' /* webpackChunkName: "pages/parent" */))
const _614f908c = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _be202292 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _2f859ac5 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _c06f9b8e = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/index" */))
const _02bf8b4c = () => interopDefault(import('..\\pages\\dashboard\\entries\\index.vue' /* webpackChunkName: "pages/dashboard/entries/index" */))
const _fd5f9f96 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/index" */))
const _1d3ebfa2 = () => interopDefault(import('..\\pages\\dashboard\\inputs\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/index" */))
const _7d1919ec = () => interopDefault(import('..\\pages\\dashboard\\outputs\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/index" */))
const _7ecefabd = () => interopDefault(import('..\\pages\\dashboard\\reports\\index.vue' /* webpackChunkName: "pages/dashboard/reports/index" */))
const _527e4235 = () => interopDefault(import('..\\pages\\dashboard\\settings\\index.vue' /* webpackChunkName: "pages/dashboard/settings/index" */))
const _4bad0e74 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\index.vue' /* webpackChunkName: "pages/dashboard/transfers/index" */))
const _4152d035 = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/index" */))
const _46b9cf08 = () => interopDefault(import('..\\pages\\dashboard\\entries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/entries/form/index" */))
const _3ccb6131 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/form/index" */))
const _453b24aa = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/form/index" */))
const _14f71f74 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/form/index" */))
const _68da25b9 = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\index.vue' /* webpackChunkName: "pages/dashboard/reports/form/index" */))
const _10934f2e = () => interopDefault(import('..\\pages\\dashboard\\settings\\pricing.vue' /* webpackChunkName: "pages/dashboard/settings/pricing" */))
const _d09a8ac0 = () => interopDefault(import('..\\pages\\dashboard\\settings\\roles.vue' /* webpackChunkName: "pages/dashboard/settings/roles" */))
const _3c2924e0 = () => interopDefault(import('..\\pages\\dashboard\\settings\\settings.vue' /* webpackChunkName: "pages/dashboard/settings/settings" */))
const _2227f7c8 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\temp.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/temp" */))
const _22eeaa9a = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\temp2.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/temp2" */))
const _3f5d4846 = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/_id" */))
const _52001920 = () => interopDefault(import('..\\pages\\dashboard\\entries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/entries/form/_id" */))
const _bd1c084e = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/exchange/form/_id" */))
const _9914425a = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/inputs/form/_id" */))
const _744467a4 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/outputs/form/_id" */))
const _540f7b3e = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/reports/form/_id" */))
const _9f225f14 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/_id" */))
const _c54d974e = () => interopDefault(import('..\\pages\\dashboard\\transfers\\outcoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/outcoming/_id" */))
const _3d0f8770 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/child",
    component: _0bedd392,
    name: "child"
  }, {
    path: "/dashboard",
    component: _7f1d2738,
    name: "dashboard"
  }, {
    path: "/inspire",
    component: _36f37a60,
    name: "inspire"
  }, {
    path: "/parent",
    component: _15117824,
    name: "parent"
  }, {
    path: "/test",
    component: _614f908c,
    name: "test"
  }, {
    path: "/auth/login",
    component: _be202292,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _2f859ac5,
    name: "auth-register"
  }, {
    path: "/dashboard/beneficiaries",
    component: _c06f9b8e,
    name: "dashboard-beneficiaries"
  }, {
    path: "/dashboard/entries",
    component: _02bf8b4c,
    name: "dashboard-entries"
  }, {
    path: "/dashboard/exchange",
    component: _fd5f9f96,
    name: "dashboard-exchange"
  }, {
    path: "/dashboard/inputs",
    component: _1d3ebfa2,
    name: "dashboard-inputs"
  }, {
    path: "/dashboard/outputs",
    component: _7d1919ec,
    name: "dashboard-outputs"
  }, {
    path: "/dashboard/reports",
    component: _7ecefabd,
    name: "dashboard-reports"
  }, {
    path: "/dashboard/settings",
    component: _527e4235,
    name: "dashboard-settings"
  }, {
    path: "/dashboard/transfers",
    component: _4bad0e74,
    name: "dashboard-transfers"
  }, {
    path: "/dashboard/beneficiaries/form",
    component: _4152d035,
    name: "dashboard-beneficiaries-form"
  }, {
    path: "/dashboard/entries/form",
    component: _46b9cf08,
    name: "dashboard-entries-form"
  }, {
    path: "/dashboard/exchange/form",
    component: _3ccb6131,
    name: "dashboard-exchange-form"
  }, {
    path: "/dashboard/inputs/form",
    component: _453b24aa,
    name: "dashboard-inputs-form"
  }, {
    path: "/dashboard/outputs/form",
    component: _14f71f74,
    name: "dashboard-outputs-form"
  }, {
    path: "/dashboard/reports/form",
    component: _68da25b9,
    name: "dashboard-reports-form"
  }, {
    path: "/dashboard/settings/pricing",
    component: _10934f2e,
    name: "dashboard-settings-pricing"
  }, {
    path: "/dashboard/settings/roles",
    component: _d09a8ac0,
    name: "dashboard-settings-roles"
  }, {
    path: "/dashboard/settings/settings",
    component: _3c2924e0,
    name: "dashboard-settings-settings"
  }, {
    path: "/dashboard/transfers/incoming/temp",
    component: _2227f7c8,
    name: "dashboard-transfers-incoming-temp"
  }, {
    path: "/dashboard/transfers/incoming/temp2",
    component: _22eeaa9a,
    name: "dashboard-transfers-incoming-temp2"
  }, {
    path: "/dashboard/beneficiaries/form/:id",
    component: _3f5d4846,
    name: "dashboard-beneficiaries-form-id"
  }, {
    path: "/dashboard/entries/form/:id",
    component: _52001920,
    name: "dashboard-entries-form-id"
  }, {
    path: "/dashboard/exchange/form/:id",
    component: _bd1c084e,
    name: "dashboard-exchange-form-id"
  }, {
    path: "/dashboard/inputs/form/:id",
    component: _9914425a,
    name: "dashboard-inputs-form-id"
  }, {
    path: "/dashboard/outputs/form/:id",
    component: _744467a4,
    name: "dashboard-outputs-form-id"
  }, {
    path: "/dashboard/reports/form/:id",
    component: _540f7b3e,
    name: "dashboard-reports-form-id"
  }, {
    path: "/dashboard/transfers/incoming/:id?",
    component: _9f225f14,
    name: "dashboard-transfers-incoming-id"
  }, {
    path: "/dashboard/transfers/outcoming/:id?",
    component: _c54d974e,
    name: "dashboard-transfers-outcoming-id"
  }, {
    path: "/",
    component: _3d0f8770,
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
