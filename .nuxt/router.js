import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d472dc58 = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _da6d8e98 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _31855aca = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _5780fc61 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _1cc0bc1d = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/index" */))
const _c0635fa0 = () => interopDefault(import('..\\pages\\dashboard\\entries\\index.vue' /* webpackChunkName: "pages/dashboard/entries/index" */))
const _f3cbf05e = () => interopDefault(import('..\\pages\\dashboard\\exchange\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/index" */))
const _0298a26a = () => interopDefault(import('..\\pages\\dashboard\\inputs\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/index" */))
const _5e8237ee = () => interopDefault(import('..\\pages\\dashboard\\outputs\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/index" */))
const _1bddbfa1 = () => interopDefault(import('..\\pages\\dashboard\\reports\\index.vue' /* webpackChunkName: "pages/dashboard/reports/index" */))
const _574819d1 = () => interopDefault(import('..\\pages\\dashboard\\settings\\index.vue' /* webpackChunkName: "pages/dashboard/settings/index" */))
const _3fc3ab50 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\index.vue' /* webpackChunkName: "pages/dashboard/transfers/index" */))
const _770d5f19 = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/index" */))
const _789b4e28 = () => interopDefault(import('..\\pages\\dashboard\\entries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/entries/form/index" */))
const _5ee413cd = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/form/index" */))
const _33ff1747 = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/form/index" */))
const _727cfa2a = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/form/index" */))
const _345aa0c6 = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\index.vue' /* webpackChunkName: "pages/dashboard/reports/form/index" */))
const _45bca5cd = () => interopDefault(import('..\\pages\\dashboard\\settings\\form\\index.vue' /* webpackChunkName: "pages/dashboard/settings/form/index" */))
const _1d2e8df6 = () => interopDefault(import('..\\pages\\dashboard\\settings\\pricing.vue' /* webpackChunkName: "pages/dashboard/settings/pricing" */))
const _8f2b587e = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/_id" */))
const _1399a654 = () => interopDefault(import('..\\pages\\dashboard\\entries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/entries/form/_id" */))
const _0fe2b516 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/exchange/form/_id" */))
const _a5af8122 = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/inputs/form/_id" */))
const _02777f12 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/outputs/form/_id" */))
const _1291f545 = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/reports/form/_id" */))
const _7fe3b775 = () => interopDefault(import('..\\pages\\dashboard\\settings\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/settings/form/_id" */))
const _d2bfa708 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/form/_id" */))
const _eef06f4c = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/_id" */))
const _6f418e16 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\outcoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/outcoming/_id" */))
const _91f149a8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _d472dc58,
    name: "dashboard"
  }, {
    path: "/inspire",
    component: _da6d8e98,
    name: "inspire"
  }, {
    path: "/auth/login",
    component: _31855aca,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _5780fc61,
    name: "auth-register"
  }, {
    path: "/dashboard/beneficiaries",
    component: _1cc0bc1d,
    name: "dashboard-beneficiaries"
  }, {
    path: "/dashboard/entries",
    component: _c0635fa0,
    name: "dashboard-entries"
  }, {
    path: "/dashboard/exchange",
    component: _f3cbf05e,
    name: "dashboard-exchange"
  }, {
    path: "/dashboard/inputs",
    component: _0298a26a,
    name: "dashboard-inputs"
  }, {
    path: "/dashboard/outputs",
    component: _5e8237ee,
    name: "dashboard-outputs"
  }, {
    path: "/dashboard/reports",
    component: _1bddbfa1,
    name: "dashboard-reports"
  }, {
    path: "/dashboard/settings",
    component: _574819d1,
    name: "dashboard-settings"
  }, {
    path: "/dashboard/transfers",
    component: _3fc3ab50,
    name: "dashboard-transfers"
  }, {
    path: "/dashboard/beneficiaries/form",
    component: _770d5f19,
    name: "dashboard-beneficiaries-form"
  }, {
    path: "/dashboard/entries/form",
    component: _789b4e28,
    name: "dashboard-entries-form"
  }, {
    path: "/dashboard/exchange/form",
    component: _5ee413cd,
    name: "dashboard-exchange-form"
  }, {
    path: "/dashboard/inputs/form",
    component: _33ff1747,
    name: "dashboard-inputs-form"
  }, {
    path: "/dashboard/outputs/form",
    component: _727cfa2a,
    name: "dashboard-outputs-form"
  }, {
    path: "/dashboard/reports/form",
    component: _345aa0c6,
    name: "dashboard-reports-form"
  }, {
    path: "/dashboard/settings/form",
    component: _45bca5cd,
    name: "dashboard-settings-form"
  }, {
    path: "/dashboard/settings/pricing",
    component: _1d2e8df6,
    name: "dashboard-settings-pricing"
  }, {
    path: "/dashboard/beneficiaries/form/:id",
    component: _8f2b587e,
    name: "dashboard-beneficiaries-form-id"
  }, {
    path: "/dashboard/entries/form/:id",
    component: _1399a654,
    name: "dashboard-entries-form-id"
  }, {
    path: "/dashboard/exchange/form/:id",
    component: _0fe2b516,
    name: "dashboard-exchange-form-id"
  }, {
    path: "/dashboard/inputs/form/:id",
    component: _a5af8122,
    name: "dashboard-inputs-form-id"
  }, {
    path: "/dashboard/outputs/form/:id",
    component: _02777f12,
    name: "dashboard-outputs-form-id"
  }, {
    path: "/dashboard/reports/form/:id",
    component: _1291f545,
    name: "dashboard-reports-form-id"
  }, {
    path: "/dashboard/settings/form/:id",
    component: _7fe3b775,
    name: "dashboard-settings-form-id"
  }, {
    path: "/dashboard/transfers/form/:id?",
    component: _d2bfa708,
    name: "dashboard-transfers-form-id"
  }, {
    path: "/dashboard/transfers/incoming/:id?",
    component: _eef06f4c,
    name: "dashboard-transfers-incoming-id"
  }, {
    path: "/dashboard/transfers/outcoming/:id?",
    component: _6f418e16,
    name: "dashboard-transfers-outcoming-id"
  }, {
    path: "/",
    component: _91f149a8,
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
