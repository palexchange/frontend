import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6ae5d590 = () => interopDefault(import('..\\pages\\child.vue' /* webpackChunkName: "pages/child" */))
const _6166fc5c = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _785bb2f6 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _2a5a6b3e = () => interopDefault(import('..\\pages\\parent.vue' /* webpackChunkName: "pages/parent" */))
const _6ae2fbb4 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _6ea4dbdd = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _fdc25842 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _0579105f = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/index" */))
const _c9aadb62 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/index" */))
const _3a7e7e6e = () => interopDefault(import('..\\pages\\dashboard\\inputs\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/index" */))
const _0f7a2ba6 = () => interopDefault(import('..\\pages\\dashboard\\inventory\\index.vue' /* webpackChunkName: "pages/dashboard/inventory/index" */))
const _2a61b1ea = () => interopDefault(import('..\\pages\\dashboard\\moneygram\\index.vue' /* webpackChunkName: "pages/dashboard/moneygram/index" */))
const _07d134a0 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/index" */))
const _603924e4 = () => interopDefault(import('..\\pages\\dashboard\\profit\\index.vue' /* webpackChunkName: "pages/dashboard/profit/index" */))
const _8d1a253a = () => interopDefault(import('..\\pages\\dashboard\\reports\\index.vue' /* webpackChunkName: "pages/dashboard/reports/index" */))
const _6c58a44f = () => interopDefault(import('..\\pages\\dashboard\\settings\\index.vue' /* webpackChunkName: "pages/dashboard/settings/index" */))
const _6d1eef9a = () => interopDefault(import('..\\pages\\dashboard\\transfers\\index.vue' /* webpackChunkName: "pages/dashboard/transfers/index" */))
const _3f654e3c = () => interopDefault(import('..\\pages\\dashboard\\user-profit\\index.vue' /* webpackChunkName: "pages/dashboard/user-profit/index" */))
const _2491f9db = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/index" */))
const _6a4a742f = () => interopDefault(import('..\\pages\\dashboard\\exchange\\2.vue' /* webpackChunkName: "pages/dashboard/exchange/2" */))
const _235541b4 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\excel.vue' /* webpackChunkName: "pages/dashboard/exchange/excel" */))
const _e593706a = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/form/index" */))
const _f9489994 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\multi.vue' /* webpackChunkName: "pages/dashboard/exchange/multi" */))
const _4425783c = () => interopDefault(import('..\\pages\\dashboard\\inventory\\form\\index.vue' /* webpackChunkName: "pages/dashboard/inventory/form/index" */))
const _403a1b08 = () => interopDefault(import('..\\pages\\dashboard\\inventory\\index2.vue' /* webpackChunkName: "pages/dashboard/inventory/index2" */))
const _62e9f842 = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\index.vue' /* webpackChunkName: "pages/dashboard/reports/form/index" */))
const _04809c03 = () => interopDefault(import('..\\pages\\dashboard\\settings\\pricing.vue' /* webpackChunkName: "pages/dashboard/settings/pricing" */))
const _9ce5c68c = () => interopDefault(import('..\\pages\\dashboard\\settings\\roles.vue' /* webpackChunkName: "pages/dashboard/settings/roles" */))
const _6e699d36 = () => interopDefault(import('..\\pages\\dashboard\\settings\\settings.vue' /* webpackChunkName: "pages/dashboard/settings/settings" */))
const _10f707f5 = () => interopDefault(import('..\\pages\\dashboard\\settings\\short-cuts.vue' /* webpackChunkName: "pages/dashboard/settings/short-cuts" */))
const _47a89df9 = () => interopDefault(import('..\\pages\\dashboard\\moneygram\\incoming\\temp_old.vue' /* webpackChunkName: "pages/dashboard/moneygram/incoming/temp_old" */))
const _a3bd146c = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\temp_old.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/temp_old" */))
const _287ab703 = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/_id" */))
const _b68c7e1a = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/exchange/form/_id" */))
const _7f7fbb26 = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/inputs/form/_id" */))
const _6b42526c = () => interopDefault(import('..\\pages\\dashboard\\inventory\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/inventory/form/_id" */))
const _27533be6 = () => interopDefault(import('..\\pages\\dashboard\\moneygram\\incoming\\_id.vue' /* webpackChunkName: "pages/dashboard/moneygram/incoming/_id" */))
const _433854bc = () => interopDefault(import('..\\pages\\dashboard\\moneygram\\outcoming\\_id.vue' /* webpackChunkName: "pages/dashboard/moneygram/outcoming/_id" */))
const _525bfbd4 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/outputs/form/_id" */))
const _62767207 = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/reports/form/_id" */))
const _0ecfa8c8 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/_id" */))
const _5a5b3df3 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\outcoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/outcoming/_id" */))
const _bfd10424 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _6ae5d590,
    name: "child"
  }, {
    path: "/dashboard",
    component: _6166fc5c,
    name: "dashboard"
  }, {
    path: "/inspire",
    component: _785bb2f6,
    name: "inspire"
  }, {
    path: "/parent",
    component: _2a5a6b3e,
    name: "parent"
  }, {
    path: "/test",
    component: _6ae2fbb4,
    name: "test"
  }, {
    path: "/auth/login",
    component: _6ea4dbdd,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _fdc25842,
    name: "auth-register"
  }, {
    path: "/dashboard/beneficiaries",
    component: _0579105f,
    name: "dashboard-beneficiaries"
  }, {
    path: "/dashboard/exchange",
    component: _c9aadb62,
    name: "dashboard-exchange"
  }, {
    path: "/dashboard/inputs",
    component: _3a7e7e6e,
    name: "dashboard-inputs"
  }, {
    path: "/dashboard/inventory",
    component: _0f7a2ba6,
    name: "dashboard-inventory"
  }, {
    path: "/dashboard/moneygram",
    component: _2a61b1ea,
    name: "dashboard-moneygram"
  }, {
    path: "/dashboard/outputs",
    component: _07d134a0,
    name: "dashboard-outputs"
  }, {
    path: "/dashboard/profit",
    component: _603924e4,
    name: "dashboard-profit"
  }, {
    path: "/dashboard/reports",
    component: _8d1a253a,
    name: "dashboard-reports"
  }, {
    path: "/dashboard/settings",
    component: _6c58a44f,
    name: "dashboard-settings"
  }, {
    path: "/dashboard/transfers",
    component: _6d1eef9a,
    name: "dashboard-transfers"
  }, {
    path: "/dashboard/user-profit",
    component: _3f654e3c,
    name: "dashboard-user-profit"
  }, {
    path: "/dashboard/beneficiaries/form",
    component: _2491f9db,
    name: "dashboard-beneficiaries-form"
  }, {
    path: "/dashboard/exchange/2",
    component: _6a4a742f,
    name: "dashboard-exchange-2"
  }, {
    path: "/dashboard/exchange/excel",
    component: _235541b4,
    name: "dashboard-exchange-excel"
  }, {
    path: "/dashboard/exchange/form",
    component: _e593706a,
    name: "dashboard-exchange-form"
  }, {
    path: "/dashboard/exchange/multi",
    component: _f9489994,
    name: "dashboard-exchange-multi"
  }, {
    path: "/dashboard/inventory/form",
    component: _4425783c,
    name: "dashboard-inventory-form"
  }, {
    path: "/dashboard/inventory/index2",
    component: _403a1b08,
    name: "dashboard-inventory-index2"
  }, {
    path: "/dashboard/reports/form",
    component: _62e9f842,
    name: "dashboard-reports-form"
  }, {
    path: "/dashboard/settings/pricing",
    component: _04809c03,
    name: "dashboard-settings-pricing"
  }, {
    path: "/dashboard/settings/roles",
    component: _9ce5c68c,
    name: "dashboard-settings-roles"
  }, {
    path: "/dashboard/settings/settings",
    component: _6e699d36,
    name: "dashboard-settings-settings"
  }, {
    path: "/dashboard/settings/short-cuts",
    component: _10f707f5,
    name: "dashboard-settings-short-cuts"
  }, {
    path: "/dashboard/moneygram/incoming/temp_old",
    component: _47a89df9,
    name: "dashboard-moneygram-incoming-temp_old"
  }, {
    path: "/dashboard/transfers/incoming/temp_old",
    component: _a3bd146c,
    name: "dashboard-transfers-incoming-temp_old"
  }, {
    path: "/dashboard/beneficiaries/form/:id",
    component: _287ab703,
    name: "dashboard-beneficiaries-form-id"
  }, {
    path: "/dashboard/exchange/form/:id",
    component: _b68c7e1a,
    name: "dashboard-exchange-form-id"
  }, {
    path: "/dashboard/inputs/form/:id?",
    component: _7f7fbb26,
    name: "dashboard-inputs-form-id"
  }, {
    path: "/dashboard/inventory/form/:id",
    component: _6b42526c,
    name: "dashboard-inventory-form-id"
  }, {
    path: "/dashboard/moneygram/incoming/:id?",
    component: _27533be6,
    name: "dashboard-moneygram-incoming-id"
  }, {
    path: "/dashboard/moneygram/outcoming/:id?",
    component: _433854bc,
    name: "dashboard-moneygram-outcoming-id"
  }, {
    path: "/dashboard/outputs/form/:id?",
    component: _525bfbd4,
    name: "dashboard-outputs-form-id"
  }, {
    path: "/dashboard/reports/form/:id",
    component: _62767207,
    name: "dashboard-reports-form-id"
  }, {
    path: "/dashboard/transfers/incoming/:id?",
    component: _0ecfa8c8,
    name: "dashboard-transfers-incoming-id"
  }, {
    path: "/dashboard/transfers/outcoming/:id?",
    component: _5a5b3df3,
    name: "dashboard-transfers-outcoming-id"
  }, {
    path: "/",
    component: _bfd10424,
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
