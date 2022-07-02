import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _460f4192 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _57075455 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _62499b17 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _dc2fdb36 = () => interopDefault(import('../pages/auth/register.vue' /* webpackChunkName: "pages/auth/register" */))
const _3efa920f = () => interopDefault(import('../pages/dashboard/categories/index.vue' /* webpackChunkName: "pages/dashboard/categories/index" */))
const _077f0a58 = () => interopDefault(import('../pages/dashboard/customers/index.vue' /* webpackChunkName: "pages/dashboard/customers/index" */))
const _c60e85a6 = () => interopDefault(import('../pages/dashboard/daily_meals/index.vue' /* webpackChunkName: "pages/dashboard/daily_meals/index" */))
const _43e2643a = () => interopDefault(import('../pages/dashboard/detailed_report.vue' /* webpackChunkName: "pages/dashboard/detailed_report" */))
const _fc7f7ffa = () => interopDefault(import('../pages/dashboard/items/index.vue' /* webpackChunkName: "pages/dashboard/items/index" */))
const _42db5c4f = () => interopDefault(import('../pages/dashboard/menu.vue' /* webpackChunkName: "pages/dashboard/menu" */))
const _0af498d0 = () => interopDefault(import('../pages/dashboard/orders/index.vue' /* webpackChunkName: "pages/dashboard/orders/index" */))
const _0e85962e = () => interopDefault(import('../pages/dashboard/profile.vue' /* webpackChunkName: "pages/dashboard/profile" */))
const _75e1d8b8 = () => interopDefault(import('../pages/dashboard/report.vue' /* webpackChunkName: "pages/dashboard/report" */))
const _552375d2 = () => interopDefault(import('../pages/dashboard/categories/form.vue' /* webpackChunkName: "pages/dashboard/categories/form" */))
const _626fa17c = () => interopDefault(import('../pages/dashboard/categories/form/_id.vue' /* webpackChunkName: "pages/dashboard/categories/form/_id" */))
const _57c51fae = () => interopDefault(import('../pages/dashboard/customers/form.vue' /* webpackChunkName: "pages/dashboard/customers/form" */))
const _3e71e659 = () => interopDefault(import('../pages/dashboard/customers/form/_id.vue' /* webpackChunkName: "pages/dashboard/customers/form/_id" */))
const _3b8f3e39 = () => interopDefault(import('../pages/dashboard/daily_meals/form.vue' /* webpackChunkName: "pages/dashboard/daily_meals/form" */))
const _48b87138 = () => interopDefault(import('../pages/dashboard/daily_meals/form/_id.vue' /* webpackChunkName: "pages/dashboard/daily_meals/form/_id" */))
const _f5fdeeba = () => interopDefault(import('../pages/dashboard/items/form.vue' /* webpackChunkName: "pages/dashboard/items/form" */))
const _28f64cce = () => interopDefault(import('../pages/dashboard/items/form/_id.vue' /* webpackChunkName: "pages/dashboard/items/form/_id" */))
const _feb76324 = () => interopDefault(import('../pages/dashboard/orders/form.vue' /* webpackChunkName: "pages/dashboard/orders/form" */))
const _729bb519 = () => interopDefault(import('../pages/dashboard/orders/form/_id.vue' /* webpackChunkName: "pages/dashboard/orders/form/_id" */))
const _1aeb2dda = () => interopDefault(import('../pages/print/_id.vue' /* webpackChunkName: "pages/print/_id" */))
const _ccac29e6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _460f4192,
    name: "dashboard"
  }, {
    path: "/inspire",
    component: _57075455,
    name: "inspire"
  }, {
    path: "/auth/login",
    component: _62499b17,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _dc2fdb36,
    name: "auth-register"
  }, {
    path: "/dashboard/categories",
    component: _3efa920f,
    name: "dashboard-categories"
  }, {
    path: "/dashboard/customers",
    component: _077f0a58,
    name: "dashboard-customers"
  }, {
    path: "/dashboard/daily_meals",
    component: _c60e85a6,
    name: "dashboard-daily_meals"
  }, {
    path: "/dashboard/detailed_report",
    component: _43e2643a,
    name: "dashboard-detailed_report"
  }, {
    path: "/dashboard/items",
    component: _fc7f7ffa,
    name: "dashboard-items"
  }, {
    path: "/dashboard/menu",
    component: _42db5c4f,
    name: "dashboard-menu"
  }, {
    path: "/dashboard/orders",
    component: _0af498d0,
    name: "dashboard-orders"
  }, {
    path: "/dashboard/profile",
    component: _0e85962e,
    name: "dashboard-profile"
  }, {
    path: "/dashboard/report",
    component: _75e1d8b8,
    name: "dashboard-report"
  }, {
    path: "/dashboard/categories/form",
    component: _552375d2,
    name: "dashboard-categories-form",
    children: [{
      path: ":id?",
      component: _626fa17c,
      name: "dashboard-categories-form-id"
    }]
  }, {
    path: "/dashboard/customers/form",
    component: _57c51fae,
    name: "dashboard-customers-form",
    children: [{
      path: ":id?",
      component: _3e71e659,
      name: "dashboard-customers-form-id"
    }]
  }, {
    path: "/dashboard/daily_meals/form",
    component: _3b8f3e39,
    name: "dashboard-daily_meals-form",
    children: [{
      path: ":id?",
      component: _48b87138,
      name: "dashboard-daily_meals-form-id"
    }]
  }, {
    path: "/dashboard/items/form",
    component: _f5fdeeba,
    name: "dashboard-items-form",
    children: [{
      path: ":id?",
      component: _28f64cce,
      name: "dashboard-items-form-id"
    }]
  }, {
    path: "/dashboard/orders/form",
    component: _feb76324,
    name: "dashboard-orders-form",
    children: [{
      path: ":id?",
      component: _729bb519,
      name: "dashboard-orders-form-id"
    }]
  }, {
    path: "/print/:id?",
    component: _1aeb2dda,
    name: "print-id"
  }, {
    path: "/",
    component: _ccac29e6,
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
