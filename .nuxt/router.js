import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a7d8ff4c = () => interopDefault(import('..\\pages\\child.vue' /* webpackChunkName: "pages/child" */))
const _23bd2d70 = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _11f3dd98 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _79a1645c = () => interopDefault(import('..\\pages\\parent.vue' /* webpackChunkName: "pages/parent" */))
const _1a45aa78 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _55fa3502 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _1a61cefd = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _2b7815fe = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/index" */))
const _67b05f26 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/index" */))
const _00da2332 = () => interopDefault(import('..\\pages\\dashboard\\inputs\\index.vue' /* webpackChunkName: "pages/dashboard/inputs/index" */))
const _03b69d70 = () => interopDefault(import('..\\pages\\dashboard\\inventory\\index.vue' /* webpackChunkName: "pages/dashboard/inventory/index" */))
const _4d0ca6a6 = () => interopDefault(import('..\\pages\\dashboard\\moneygram\\index.vue' /* webpackChunkName: "pages/dashboard/moneygram/index" */))
const _798aebd2 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\index.vue' /* webpackChunkName: "pages/dashboard/outputs/index" */))
const _2694c9a8 = () => interopDefault(import('..\\pages\\dashboard\\profit\\index.vue' /* webpackChunkName: "pages/dashboard/profit/index" */))
const _36e67385 = () => interopDefault(import('..\\pages\\dashboard\\reports\\index.vue' /* webpackChunkName: "pages/dashboard/reports/index" */))
const _c5543b26 = () => interopDefault(import('..\\pages\\dashboard\\settings\\index.vue' /* webpackChunkName: "pages/dashboard/settings/index" */))
const _5bc9753c = () => interopDefault(import('..\\pages\\dashboard\\transfers\\index.vue' /* webpackChunkName: "pages/dashboard/transfers/index" */))
const _2d84f35e = () => interopDefault(import('..\\pages\\dashboard\\user-profit\\index.vue' /* webpackChunkName: "pages/dashboard/user-profit/index" */))
const _50535cfd = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\index.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/index" */))
const _1a67714d = () => interopDefault(import('..\\pages\\dashboard\\exchange\\2.vue' /* webpackChunkName: "pages/dashboard/exchange/2" */))
const _41c7f769 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\index.vue' /* webpackChunkName: "pages/dashboard/exchange/form/index" */))
const _974e1d58 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\multi.vue' /* webpackChunkName: "pages/dashboard/exchange/multi" */))
const _88dceff8 = () => interopDefault(import('..\\pages\\dashboard\\inventory\\form\\index.vue' /* webpackChunkName: "pages/dashboard/inventory/form/index" */))
const _72edbdcc = () => interopDefault(import('..\\pages\\dashboard\\inventory\\index2.vue' /* webpackChunkName: "pages/dashboard/inventory/index2" */))
const _99542efe = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\index.vue' /* webpackChunkName: "pages/dashboard/reports/form/index" */))
const _29b26abe = () => interopDefault(import('..\\pages\\dashboard\\settings\\pricing.vue' /* webpackChunkName: "pages/dashboard/settings/pricing" */))
const _3aeb4a50 = () => interopDefault(import('..\\pages\\dashboard\\settings\\roles.vue' /* webpackChunkName: "pages/dashboard/settings/roles" */))
const _5c894258 = () => interopDefault(import('..\\pages\\dashboard\\settings\\settings.vue' /* webpackChunkName: "pages/dashboard/settings/settings" */))
const _120749af = () => interopDefault(import('..\\pages\\dashboard\\moneygram\\incoming\\temp.vue' /* webpackChunkName: "pages/dashboard/moneygram/incoming/temp" */))
const _2557cf97 = () => interopDefault(import('..\\pages\\dashboard\\moneygram\\incoming\\temp_old.vue' /* webpackChunkName: "pages/dashboard/moneygram/incoming/temp_old" */))
const _e4029c00 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\temp.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/temp" */))
const _e85eb130 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\temp_old.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/temp_old" */))
const _2e1e7aa5 = () => interopDefault(import('..\\pages\\dashboard\\beneficiaries\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/beneficiaries/form/_id" */))
const _7a8ec011 = () => interopDefault(import('..\\pages\\dashboard\\exchange\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/exchange/form/_id" */))
const _b2335dea = () => interopDefault(import('..\\pages\\dashboard\\inputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/inputs/form/_id" */))
const _a1ac8928 = () => interopDefault(import('..\\pages\\dashboard\\inventory\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/inventory/form/_id" */))
const _1c0bb4a2 = () => interopDefault(import('..\\pages\\dashboard\\moneygram\\incoming\\_id.vue' /* webpackChunkName: "pages/dashboard/moneygram/incoming/_id" */))
const _e58ef380 = () => interopDefault(import('..\\pages\\dashboard\\moneygram\\outcoming\\_id.vue' /* webpackChunkName: "pages/dashboard/moneygram/outcoming/_id" */))
const _407ba0f6 = () => interopDefault(import('..\\pages\\dashboard\\outputs\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/outputs/form/_id" */))
const _50961729 = () => interopDefault(import('..\\pages\\dashboard\\reports\\form\\_id.vue' /* webpackChunkName: "pages/dashboard/reports/form/_id" */))
const _03882184 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\incoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/_id" */))
const _092fee91 = () => interopDefault(import('..\\pages\\dashboard\\transfers\\outcoming\\_id.vue' /* webpackChunkName: "pages/dashboard/transfers/outcoming/_id" */))
const _fcc42de0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _a7d8ff4c,
    name: "child"
  }, {
    path: "/dashboard",
    component: _23bd2d70,
    name: "dashboard"
  }, {
    path: "/inspire",
    component: _11f3dd98,
    name: "inspire"
  }, {
    path: "/parent",
    component: _79a1645c,
    name: "parent"
  }, {
    path: "/test",
    component: _1a45aa78,
    name: "test"
  }, {
    path: "/auth/login",
    component: _55fa3502,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _1a61cefd,
    name: "auth-register"
  }, {
    path: "/dashboard/beneficiaries",
    component: _2b7815fe,
    name: "dashboard-beneficiaries"
  }, {
    path: "/dashboard/exchange",
    component: _67b05f26,
    name: "dashboard-exchange"
  }, {
    path: "/dashboard/inputs",
    component: _00da2332,
    name: "dashboard-inputs"
  }, {
    path: "/dashboard/inventory",
    component: _03b69d70,
    name: "dashboard-inventory"
  }, {
    path: "/dashboard/moneygram",
    component: _4d0ca6a6,
    name: "dashboard-moneygram"
  }, {
    path: "/dashboard/outputs",
    component: _798aebd2,
    name: "dashboard-outputs"
  }, {
    path: "/dashboard/profit",
    component: _2694c9a8,
    name: "dashboard-profit"
  }, {
    path: "/dashboard/reports",
    component: _36e67385,
    name: "dashboard-reports"
  }, {
    path: "/dashboard/settings",
    component: _c5543b26,
    name: "dashboard-settings"
  }, {
    path: "/dashboard/transfers",
    component: _5bc9753c,
    name: "dashboard-transfers"
  }, {
    path: "/dashboard/user-profit",
    component: _2d84f35e,
    name: "dashboard-user-profit"
  }, {
    path: "/dashboard/beneficiaries/form",
    component: _50535cfd,
    name: "dashboard-beneficiaries-form"
  }, {
    path: "/dashboard/exchange/2",
    component: _1a67714d,
    name: "dashboard-exchange-2"
  }, {
    path: "/dashboard/exchange/form",
    component: _41c7f769,
    name: "dashboard-exchange-form"
  }, {
    path: "/dashboard/exchange/multi",
    component: _974e1d58,
    name: "dashboard-exchange-multi"
  }, {
    path: "/dashboard/inventory/form",
    component: _88dceff8,
    name: "dashboard-inventory-form"
  }, {
    path: "/dashboard/inventory/index2",
    component: _72edbdcc,
    name: "dashboard-inventory-index2"
  }, {
    path: "/dashboard/reports/form",
    component: _99542efe,
    name: "dashboard-reports-form"
  }, {
    path: "/dashboard/settings/pricing",
    component: _29b26abe,
    name: "dashboard-settings-pricing"
  }, {
    path: "/dashboard/settings/roles",
    component: _3aeb4a50,
    name: "dashboard-settings-roles"
  }, {
    path: "/dashboard/settings/settings",
    component: _5c894258,
    name: "dashboard-settings-settings"
  }, {
    path: "/dashboard/moneygram/incoming/temp",
    component: _120749af,
    name: "dashboard-moneygram-incoming-temp"
  }, {
    path: "/dashboard/moneygram/incoming/temp_old",
    component: _2557cf97,
    name: "dashboard-moneygram-incoming-temp_old"
  }, {
    path: "/dashboard/transfers/incoming/temp",
    component: _e4029c00,
    name: "dashboard-transfers-incoming-temp"
  }, {
    path: "/dashboard/transfers/incoming/temp_old",
    component: _e85eb130,
    name: "dashboard-transfers-incoming-temp_old"
  }, {
    path: "/dashboard/beneficiaries/form/:id",
    component: _2e1e7aa5,
    name: "dashboard-beneficiaries-form-id"
  }, {
    path: "/dashboard/exchange/form/:id",
    component: _7a8ec011,
    name: "dashboard-exchange-form-id"
  }, {
    path: "/dashboard/inputs/form/:id?",
    component: _b2335dea,
    name: "dashboard-inputs-form-id"
  }, {
    path: "/dashboard/inventory/form/:id",
    component: _a1ac8928,
    name: "dashboard-inventory-form-id"
  }, {
    path: "/dashboard/moneygram/incoming/:id?",
    component: _1c0bb4a2,
    name: "dashboard-moneygram-incoming-id"
  }, {
    path: "/dashboard/moneygram/outcoming/:id?",
    component: _e58ef380,
    name: "dashboard-moneygram-outcoming-id"
  }, {
    path: "/dashboard/outputs/form/:id?",
    component: _407ba0f6,
    name: "dashboard-outputs-form-id"
  }, {
    path: "/dashboard/reports/form/:id",
    component: _50961729,
    name: "dashboard-reports-form-id"
  }, {
    path: "/dashboard/transfers/incoming/:id?",
    component: _03882184,
    name: "dashboard-transfers-incoming-id"
  }, {
    path: "/dashboard/transfers/outcoming/:id?",
    component: _092fee91,
    name: "dashboard-transfers-outcoming-id"
  }, {
    path: "/",
    component: _fcc42de0,
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
