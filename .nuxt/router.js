import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6230aa24 = () => interopDefault(import('..\\pages\\child.vue' /* webpackChunkName: "pages/child" */))
const _4c3e5e5c = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _5f3099a8 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _9d5ae770 = () => interopDefault(import('..\\pages\\parent.vue' /* webpackChunkName: "pages/parent" */))
const _38ac5dda = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _2d124ae9 = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _489562d6 = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/index" */))
const _e73fc6b0 = () => interopDefault(import('..\\pages\\dashboard\\entries\\index.vue' /* webpackChunkName: "pages/dashboard/entries/index" */))
const _2bc1ca59 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/index" */))
const _ca0b195a = () => interopDefault(import('..\\pages\\dashboard\\inputs\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/index" */))
const _4b140466 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/index" */))
const _086f8c19 = () => interopDefault(import('..\\pages\\dashboard\\reports\\index.vue' /* webpackChunkName: "pages/dashboard/reports/index" */))
const _0620474e = () => interopDefault(import('..\\pages\\dashboard\\settings\\index.vue' /* webpackChunkName: "pages/dashboard/settings/index" */))
const _21228e60 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\index.vue' /* webpackChunkName: "pages/dashboard/transfers/index" */))
const _48b83791 = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/index" */))
const _fab22938 = () => interopDefault(import('..\\pages\\dashboard\\entries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/entries/form/index" */))
const _7e81d055 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/form/index" */))
const _637255cf = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/form/index" */))
const _31718ca2 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/form/index" */))
const _b6717bd6 = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\index.vue' /* webpackChunkName: "pages/dashboard/reports/form/index" */))
const _655a6255 = () => interopDefault(import('..\\pages\\dashboard\\settings\\form\\index.vue' /* webpackChunkName: "pages/dashboard/settings/form/index" */))
const _67ac0ce6 = () => interopDefault(import('..\\pages\\dashboard\\settings\\pricing.vue' /* webpackChunkName: "pages/dashboard/settings/pricing" */))
const _253e2b8e = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/_id" */))
const _ddff1268 = () => interopDefault(import('..\\pages\\dashboard\\entries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/entries/form/_id" */))
const _2781e3fd = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/exchange/form/_id" */))
const _f02d0012 = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/inputs/form/_id" */))
const _7fde4f8a = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/outputs/form/_id" */))
const _e00e7486 = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/reports/form/_id" */))
const _a1521406 = () => interopDefault(import('..\\pages\\dashboard\\settings\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/settings/form/_id" */))
const _8503425c = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/_id" */))
const _323b717d = () => interopDefault(import('..\\pages\\dashboard\\transfers\\outcoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/outcoming/_id" */))
const _b71bd8b8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _6230aa24,
    name: "child"
  }, {
    path: "/dashboard",
    component: _4c3e5e5c,
    name: "dashboard"
  }, {
    path: "/inspire",
    component: _5f3099a8,
    name: "inspire"
  }, {
    path: "/parent",
    component: _9d5ae770,
    name: "parent"
  }, {
    path: "/auth/login",
    component: _38ac5dda,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _2d124ae9,
    name: "auth-register"
  }, {
    path: "/dashboard/beneficiaries",
    component: _489562d6,
    name: "dashboard-beneficiaries"
  }, {
    path: "/dashboard/entries",
    component: _e73fc6b0,
    name: "dashboard-entries"
  }, {
    path: "/dashboard/exchange",
    component: _2bc1ca59,
    name: "dashboard-exchange"
  }, {
    path: "/dashboard/inputs",
    component: _ca0b195a,
    name: "dashboard-inputs"
  }, {
    path: "/dashboard/outputs",
    component: _4b140466,
    name: "dashboard-outputs"
  }, {
    path: "/dashboard/reports",
    component: _086f8c19,
    name: "dashboard-reports"
  }, {
    path: "/dashboard/settings",
    component: _0620474e,
    name: "dashboard-settings"
  }, {
    path: "/dashboard/transfers",
    component: _21228e60,
    name: "dashboard-transfers"
  }, {
    path: "/dashboard/beneficiaries/form",
    component: _48b83791,
    name: "dashboard-beneficiaries-form"
  }, {
    path: "/dashboard/entries/form",
    component: _fab22938,
    name: "dashboard-entries-form"
  }, {
    path: "/dashboard/exchange/form",
    component: _7e81d055,
    name: "dashboard-exchange-form"
  }, {
    path: "/dashboard/inputs/form",
    component: _637255cf,
    name: "dashboard-inputs-form"
  }, {
    path: "/dashboard/outputs/form",
    component: _31718ca2,
    name: "dashboard-outputs-form"
  }, {
    path: "/dashboard/reports/form",
    component: _b6717bd6,
    name: "dashboard-reports-form"
  }, {
    path: "/dashboard/settings/form",
    component: _655a6255,
    name: "dashboard-settings-form"
  }, {
    path: "/dashboard/settings/pricing",
    component: _67ac0ce6,
    name: "dashboard-settings-pricing"
  }, {
    path: "/dashboard/beneficiaries/form/:id",
    component: _253e2b8e,
    name: "dashboard-beneficiaries-form-id"
  }, {
    path: "/dashboard/entries/form/:id",
    component: _ddff1268,
    name: "dashboard-entries-form-id"
  }, {
    path: "/dashboard/exchange/form/:id",
    component: _2781e3fd,
    name: "dashboard-exchange-form-id"
  }, {
    path: "/dashboard/inputs/form/:id",
    component: _f02d0012,
    name: "dashboard-inputs-form-id"
  }, {
    path: "/dashboard/outputs/form/:id",
    component: _7fde4f8a,
    name: "dashboard-outputs-form-id"
  }, {
    path: "/dashboard/reports/form/:id",
    component: _e00e7486,
    name: "dashboard-reports-form-id"
  }, {
    path: "/dashboard/settings/form/:id",
    component: _a1521406,
    name: "dashboard-settings-form-id"
  }, {
    path: "/dashboard/transfers/incoming/:id?",
    component: _8503425c,
    name: "dashboard-transfers-incoming-id"
  }, {
    path: "/dashboard/transfers/outcoming/:id?",
    component: _323b717d,
    name: "dashboard-transfers-outcoming-id"
  }, {
    path: "/",
    component: _b71bd8b8,
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
