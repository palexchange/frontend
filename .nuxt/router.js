import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5385c45d = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _51f25bc0 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _b1cd7528 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _3426cbf0 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _c8c61b38 = () => interopDefault(import('../pages/dashboard/categories/index.vue' /* webpackChunkName: "pages/dashboard/categories/index" */))
const _6d94cb63 = () => interopDefault(import('../pages/dashboard/customers/index.vue' /* webpackChunkName: "pages/dashboard/customers/index" */))
const _56bb3110 = () => interopDefault(import('../pages/dashboard/daily_meals/index.vue' /* webpackChunkName: "pages/dashboard/daily_meals/index" */))
const _44248eee = () => interopDefault(import('../pages/dashboard/detailed_report.vue' /* webpackChunkName: "pages/dashboard/detailed_report" */))
const _094382e4 = () => interopDefault(import('../pages/dashboard/items/index.vue' /* webpackChunkName: "pages/dashboard/items/index" */))
const _2f1857b8 = () => interopDefault(import('../pages/dashboard/menu.vue' /* webpackChunkName: "pages/dashboard/menu" */))
const _96b0f326 = () => interopDefault(import('../pages/dashboard/orders/index.vue' /* webpackChunkName: "pages/dashboard/orders/index" */))
const _fac39e18 = () => interopDefault(import('../pages/dashboard/profile.vue' /* webpackChunkName: "pages/dashboard/profile" */))
const _6668ea39 = () => interopDefault(import('../pages/dashboard/report.vue' /* webpackChunkName: "pages/dashboard/report" */))
const _0d2ff936 = () => interopDefault(import('../pages/dashboard/transfers/index.vue' /* webpackChunkName: "pages/dashboard/transfers/index" */))
const _3b840622 = () => interopDefault(import('../pages/dashboard/categories/form.vue' /* webpackChunkName: "pages/dashboard/categories/form" */))
const _7a9f1a66 = () => interopDefault(import('../pages/dashboard/categories/form/_id.vue' /* webpackChunkName: "pages/dashboard/categories/form/_id" */))
const _10bd9143 = () => interopDefault(import('../pages/dashboard/customers/form.vue' /* webpackChunkName: "pages/dashboard/customers/form" */))
const _0804f524 = () => interopDefault(import('../pages/dashboard/customers/form/_id.vue' /* webpackChunkName: "pages/dashboard/customers/form/_id" */))
const _cf9cc2e4 = () => interopDefault(import('../pages/dashboard/daily_meals/form.vue' /* webpackChunkName: "pages/dashboard/daily_meals/form" */))
const _64c3f539 = () => interopDefault(import('../pages/dashboard/daily_meals/form/_id.vue' /* webpackChunkName: "pages/dashboard/daily_meals/form/_id" */))
const _bc98e690 = () => interopDefault(import('../pages/dashboard/items/form.vue' /* webpackChunkName: "pages/dashboard/items/form" */))
const _3c22833a = () => interopDefault(import('../pages/dashboard/items/form/_id.vue' /* webpackChunkName: "pages/dashboard/items/form/_id" */))
const _0b7b660e = () => interopDefault(import('../pages/dashboard/orders/form.vue' /* webpackChunkName: "pages/dashboard/orders/form" */))
const _4e9d13b8 = () => interopDefault(import('../pages/dashboard/orders/form/_id.vue' /* webpackChunkName: "pages/dashboard/orders/form/_id" */))
const _f151ba8a = () => interopDefault(import('../pages/dashboard/transfers/form/_id.vue' /* webpackChunkName: "pages/dashboard/transfers/form/_id" */))
const _c7d6dbc6 = () => interopDefault(import('../pages/dashboard/transfers/incoming/_id.vue' /* webpackChunkName: "pages/dashboard/transfers/incoming/_id" */))
const _071bd79e = () => interopDefault(import('../pages/dashboard/transfers/outcoming/_id.vue' /* webpackChunkName: "pages/dashboard/transfers/outcoming/_id" */))
const _70a1a01e = () => interopDefault(import('../pages/print/_id.vue' /* webpackChunkName: "pages/print/_id" */))
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
    path: "/dashboard/categories",
    component: _c8c61b38,
    name: "dashboard-categories"
  }, {
    path: "/dashboard/customers",
    component: _6d94cb63,
    name: "dashboard-customers"
  }, {
    path: "/dashboard/daily_meals",
    component: _56bb3110,
    name: "dashboard-daily_meals"
  }, {
    path: "/dashboard/detailed_report",
    component: _44248eee,
    name: "dashboard-detailed_report"
  }, {
    path: "/dashboard/items",
    component: _094382e4,
    name: "dashboard-items"
  }, {
    path: "/dashboard/menu",
    component: _2f1857b8,
    name: "dashboard-menu"
  }, {
    path: "/dashboard/orders",
    component: _96b0f326,
    name: "dashboard-orders"
  }, {
    path: "/dashboard/profile",
    component: _fac39e18,
    name: "dashboard-profile"
  }, {
    path: "/dashboard/report",
    component: _6668ea39,
    name: "dashboard-report"
  }, {
    path: "/dashboard/transfers",
    component: _0d2ff936,
    name: "dashboard-transfers"
  }, {
    path: "/dashboard/categories/form",
    component: _3b840622,
    name: "dashboard-categories-form",
    children: [{
      path: ":id?",
      component: _7a9f1a66,
      name: "dashboard-categories-form-id"
    }]
  }, {
    path: "/dashboard/customers/form",
    component: _10bd9143,
    name: "dashboard-customers-form",
    children: [{
      path: ":id?",
      component: _0804f524,
      name: "dashboard-customers-form-id"
    }]
  }, {
    path: "/dashboard/daily_meals/form",
    component: _cf9cc2e4,
    name: "dashboard-daily_meals-form",
    children: [{
      path: ":id?",
      component: _64c3f539,
      name: "dashboard-daily_meals-form-id"
    }]
  }, {
    path: "/dashboard/items/form",
    component: _bc98e690,
    name: "dashboard-items-form",
    children: [{
      path: ":id?",
      component: _3c22833a,
      name: "dashboard-items-form-id"
    }]
  }, {
    path: "/dashboard/orders/form",
    component: _0b7b660e,
    name: "dashboard-orders-form",
    children: [{
      path: ":id?",
      component: _4e9d13b8,
      name: "dashboard-orders-form-id"
    }]
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
    path: "/print/:id?",
    component: _70a1a01e,
    name: "print-id"
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
