import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5385c45d = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _51f25bc0 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _b1cd7528 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _3426cbf0 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _f9be635e = () => interopDefault(import('../pages/dashboard/beneficiaries/index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/index" */))
const _f19012c4 = () => interopDefault(import('../pages/dashboard/entries/index.vue' /* webpackChunkName: "pages/dashboard/entries/index" */))
const _2f9f762a = () => interopDefault(import('../pages/dashboard/exchange/index.vue' /* webpackChunkName: "pages/dashboard/exchange/index" */))
const _dc705f1e = () => interopDefault(import('../pages/dashboard/inputs/index.vue' /* webpackChunkName: "pages/dashboard/inputs/index" */))
const _92adc1c0 = () => interopDefault(import('../pages/dashboard/outputs/index.vue' /* webpackChunkName: "pages/dashboard/outputs/index" */))
const _7ab4550d = () => interopDefault(import('../pages/dashboard/reports/index.vue' /* webpackChunkName: "pages/dashboard/reports/index" */))
const _0ff7f2eb = () => interopDefault(import('../pages/dashboard/settings/index.vue' /* webpackChunkName: "pages/dashboard/settings/index" */))
const _0d2ff936 = () => interopDefault(import('../pages/dashboard/transfers/index.vue' /* webpackChunkName: "pages/dashboard/transfers/index" */))
const _b73d0950 = () => interopDefault(import('../pages/dashboard/beneficiaries/form/index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/index" */))
const _5be87b2b = () => interopDefault(import('../pages/dashboard/entries/form/index.vue' /* webpackChunkName: "pages/dashboard/entries/form/index" */))
const _735614fe = () => interopDefault(import('../pages/dashboard/exchange/form/index.vue' /* webpackChunkName: "pages/dashboard/exchange/form/index" */))
const _4666cd38 = () => interopDefault(import('../pages/dashboard/inputs/form/index.vue' /* webpackChunkName: "pages/dashboard/inputs/form/index" */))
const _4ac653e9 = () => interopDefault(import('../pages/dashboard/outputs/form/index.vue' /* webpackChunkName: "pages/dashboard/outputs/form/index" */))
const _5ae0ca1c = () => interopDefault(import('../pages/dashboard/reports/form/index.vue' /* webpackChunkName: "pages/dashboard/reports/form/index" */))
const _09a9b204 = () => interopDefault(import('../pages/dashboard/settings/form/index.vue' /* webpackChunkName: "pages/dashboard/settings/form/index" */))
const _3d86b39f = () => interopDefault(import('../pages/dashboard/settings/pricing.vue' /* webpackChunkName: "pages/dashboard/settings/pricing" */))
const _6c4673c0 = () => interopDefault(import('../pages/dashboard/beneficiaries/form/_id.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/_id" */))
const _6f214c53 = () => interopDefault(import('../pages/dashboard/entries/form/_id.vue' /* webpackChunkName: "pages/dashboard/entries/form/_id" */))
const _227d8234 = () => interopDefault(import('../pages/dashboard/exchange/form/_id.vue' /* webpackChunkName: "pages/dashboard/exchange/form/_id" */))
const _ed9284c0 = () => interopDefault(import('../pages/dashboard/inputs/form/_id.vue' /* webpackChunkName: "pages/dashboard/inputs/form/_id" */))
const _507a3c91 = () => interopDefault(import('../pages/dashboard/outputs/form/_id.vue' /* webpackChunkName: "pages/dashboard/outputs/form/_id" */))
const _2512a384 = () => interopDefault(import('../pages/dashboard/reports/form/_id.vue' /* webpackChunkName: "pages/dashboard/reports/form/_id" */))
const _2cb2d0e6 = () => interopDefault(import('../pages/dashboard/settings/form/_id.vue' /* webpackChunkName: "pages/dashboard/settings/form/_id" */))
const _f151ba8a = () => interopDefault(import('../pages/dashboard/transfers/form/_id.vue' /* webpackChunkName: "pages/dashboard/transfers/form/_id" */))
const _c7d6dbc6 = () => interopDefault(import('../pages/dashboard/transfers/incoming/_id.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/_id" */))
const _071bd79e = () => interopDefault(import('../pages/dashboard/transfers/outcoming/_id.vue' /* webpackChunkName: "pages/dashboard/transfers/outcoming/_id" */))
const _22745f98 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _5385c45d,
    name: "dashboard"
  }, {
    path: "/inspire",
    component: _51f25bc0,
    name: "inspire"
  }, {
    path: "/auth/login",
    component: _b1cd7528,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _3426cbf0,
    name: "auth-register"
  }, {
    path: "/dashboard/beneficiaries",
    component: _f9be635e,
    name: "dashboard-beneficiaries"
  }, {
    path: "/dashboard/entries",
    component: _f19012c4,
    name: "dashboard-entries"
  }, {
    path: "/dashboard/exchange",
    component: _2f9f762a,
    name: "dashboard-exchange"
  }, {
    path: "/dashboard/inputs",
    component: _dc705f1e,
    name: "dashboard-inputs"
  }, {
    path: "/dashboard/outputs",
    component: _92adc1c0,
    name: "dashboard-outputs"
  }, {
    path: "/dashboard/reports",
    component: _7ab4550d,
    name: "dashboard-reports"
  }, {
    path: "/dashboard/settings",
    component: _0ff7f2eb,
    name: "dashboard-settings"
  }, {
    path: "/dashboard/transfers",
    component: _0d2ff936,
    name: "dashboard-transfers"
  }, {
    path: "/dashboard/beneficiaries/form",
    component: _b73d0950,
    name: "dashboard-beneficiaries-form"
  }, {
    path: "/dashboard/entries/form",
    component: _5be87b2b,
    name: "dashboard-entries-form"
  }, {
    path: "/dashboard/exchange/form",
    component: _735614fe,
    name: "dashboard-exchange-form"
  }, {
    path: "/dashboard/inputs/form",
    component: _4666cd38,
    name: "dashboard-inputs-form"
  }, {
    path: "/dashboard/outputs/form",
    component: _4ac653e9,
    name: "dashboard-outputs-form"
  }, {
    path: "/dashboard/reports/form",
    component: _5ae0ca1c,
    name: "dashboard-reports-form"
  }, {
    path: "/dashboard/settings/form",
    component: _09a9b204,
    name: "dashboard-settings-form"
  }, {
    path: "/dashboard/settings/pricing",
    component: _3d86b39f,
    name: "dashboard-settings-pricing"
  }, {
    path: "/dashboard/beneficiaries/form/:id",
    component: _6c4673c0,
    name: "dashboard-beneficiaries-form-id"
  }, {
    path: "/dashboard/entries/form/:id",
    component: _6f214c53,
    name: "dashboard-entries-form-id"
  }, {
    path: "/dashboard/exchange/form/:id",
    component: _227d8234,
    name: "dashboard-exchange-form-id"
  }, {
    path: "/dashboard/inputs/form/:id",
    component: _ed9284c0,
    name: "dashboard-inputs-form-id"
  }, {
    path: "/dashboard/outputs/form/:id",
    component: _507a3c91,
    name: "dashboard-outputs-form-id"
  }, {
    path: "/dashboard/reports/form/:id",
    component: _2512a384,
    name: "dashboard-reports-form-id"
  }, {
    path: "/dashboard/settings/form/:id",
    component: _2cb2d0e6,
    name: "dashboard-settings-form-id"
  }, {
    path: "/dashboard/transfers/form/:id?",
    component: _f151ba8a,
    name: "dashboard-transfers-form-id"
  }, {
    path: "/dashboard/transfers/incoming/:id?",
    component: _c7d6dbc6,
    name: "dashboard-transfers-incoming-id"
  }, {
    path: "/dashboard/transfers/outcoming/:id?",
    component: _071bd79e,
    name: "dashboard-transfers-outcoming-id"
  }, {
    path: "/",
    component: _22745f98,
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
