import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_c24e8420 from 'nuxt_plugin_plugin_c24e8420' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_plugin_550e6804 from 'nuxt_plugin_plugin_550e6804' // Source: ./vuetify/plugin.js (mode: 'all')
import nuxt_plugin_toast_6a649db5 from 'nuxt_plugin_toast_6a649db5' // Source: ./toast.js (mode: 'client')
import nuxt_plugin_pluginutils_080989f5 from 'nuxt_plugin_pluginutils_080989f5' // Source: ./nuxt-i18n/plugin.utils.js (mode: 'all')
import nuxt_plugin_pluginrouting_3c612400 from 'nuxt_plugin_pluginrouting_3c612400' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_28203d6f from 'nuxt_plugin_pluginmain_28203d6f' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_pluginclient_162bdd28 from 'nuxt_plugin_pluginclient_162bdd28' // Source: ./content/plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_5aa382f4 from 'nuxt_plugin_pluginserver_5aa382f4' // Source: ./content/plugin.server.js (mode: 'server')
import nuxt_plugin_workbox_64349ca2 from 'nuxt_plugin_workbox_64349ca2' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_388021b5 from 'nuxt_plugin_metaplugin_388021b5' // Source: ./pwa/meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_3d27c729 from 'nuxt_plugin_iconplugin_3d27c729' // Source: ./pwa/icon.plugin.js (mode: 'all')
import nuxt_plugin_axios_c3975df4 from 'nuxt_plugin_axios_c3975df4' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_vuetify_165b1c58 from 'nuxt_plugin_vuetify_165b1c58' // Source: ../plugins/vuetify (mode: 'client')
import nuxt_plugin_mixins_5013a1f0 from 'nuxt_plugin_mixins_5013a1f0' // Source: ../plugins/mixins (mode: 'all')
import nuxt_plugin_vueapexchart_0ea3e8d8 from 'nuxt_plugin_vueapexchart_0ea3e8d8' // Source: ../plugins/vue-apexchart.js (mode: 'client')
import nuxt_plugin_vmask_3c04b27e from 'nuxt_plugin_vmask_3c04b27e' // Source: ../plugins/v-mask.js (mode: 'client')
import nuxt_plugin_elementidentifier_419b9a16 from 'nuxt_plugin_elementidentifier_419b9a16' // Source: ../plugins/element_identifier.js (mode: 'all')
import nuxt_plugin_cookie_7d4b4e5d from 'nuxt_plugin_cookie_7d4b4e5d' // Source: ../plugins/cookie.js (mode: 'all')
import nuxt_plugin_sweetalert_973f4b64 from 'nuxt_plugin_sweetalert_973f4b64' // Source: ../plugins/sweet-alert.js (mode: 'all')
import nuxt_plugin_modulegenerator_68ef9bfe from 'nuxt_plugin_modulegenerator_68ef9bfe' // Source: ../plugins/module_generator.js (mode: 'all')
import nuxt_plugin_globalmixin_54acb0bc from 'nuxt_plugin_globalmixin_54acb0bc' // Source: ../plugins/global_mixin.js (mode: 'all')
import nuxt_plugin_axios_5659d192 from 'nuxt_plugin_axios_5659d192' // Source: ../plugins/axios.js (mode: 'all')
import nuxt_plugin_phonenumber_24a3a639 from 'nuxt_plugin_phonenumber_24a3a639' // Source: ../plugins/phone-number.js (mode: 'all')
import nuxt_plugin_menusfilters_03f6f578 from 'nuxt_plugin_menusfilters_03f6f578' // Source: ../helpers/menus_filters.js (mode: 'all')
import nuxt_plugin_auth_a403c12c from 'nuxt_plugin_auth_a403c12c' // Source: ./auth.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":"%s - nux2-dashboard","title":"nux2-dashboard","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""},{"name":"format-detection","content":"telephone=no"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_c24e8420 === 'function') {
    await nuxt_plugin_plugin_c24e8420(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_550e6804 === 'function') {
    await nuxt_plugin_plugin_550e6804(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_6a649db5 === 'function') {
    await nuxt_plugin_toast_6a649db5(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginutils_080989f5 === 'function') {
    await nuxt_plugin_pluginutils_080989f5(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_3c612400 === 'function') {
    await nuxt_plugin_pluginrouting_3c612400(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_28203d6f === 'function') {
    await nuxt_plugin_pluginmain_28203d6f(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_162bdd28 === 'function') {
    await nuxt_plugin_pluginclient_162bdd28(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_5aa382f4 === 'function') {
    await nuxt_plugin_pluginserver_5aa382f4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_64349ca2 === 'function') {
    await nuxt_plugin_workbox_64349ca2(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_388021b5 === 'function') {
    await nuxt_plugin_metaplugin_388021b5(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_3d27c729 === 'function') {
    await nuxt_plugin_iconplugin_3d27c729(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_c3975df4 === 'function') {
    await nuxt_plugin_axios_c3975df4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuetify_165b1c58 === 'function') {
    await nuxt_plugin_vuetify_165b1c58(app.context, inject)
  }

  if (typeof nuxt_plugin_mixins_5013a1f0 === 'function') {
    await nuxt_plugin_mixins_5013a1f0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueapexchart_0ea3e8d8 === 'function') {
    await nuxt_plugin_vueapexchart_0ea3e8d8(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vmask_3c04b27e === 'function') {
    await nuxt_plugin_vmask_3c04b27e(app.context, inject)
  }

  if (typeof nuxt_plugin_elementidentifier_419b9a16 === 'function') {
    await nuxt_plugin_elementidentifier_419b9a16(app.context, inject)
  }

  if (typeof nuxt_plugin_cookie_7d4b4e5d === 'function') {
    await nuxt_plugin_cookie_7d4b4e5d(app.context, inject)
  }

  if (typeof nuxt_plugin_sweetalert_973f4b64 === 'function') {
    await nuxt_plugin_sweetalert_973f4b64(app.context, inject)
  }

  if (typeof nuxt_plugin_modulegenerator_68ef9bfe === 'function') {
    await nuxt_plugin_modulegenerator_68ef9bfe(app.context, inject)
  }

  if (typeof nuxt_plugin_globalmixin_54acb0bc === 'function') {
    await nuxt_plugin_globalmixin_54acb0bc(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_5659d192 === 'function') {
    await nuxt_plugin_axios_5659d192(app.context, inject)
  }

  if (typeof nuxt_plugin_phonenumber_24a3a639 === 'function') {
    await nuxt_plugin_phonenumber_24a3a639(app.context, inject)
  }

  if (typeof nuxt_plugin_menusfilters_03f6f578 === 'function') {
    await nuxt_plugin_menusfilters_03f6f578(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_a403c12c === 'function') {
    await nuxt_plugin_auth_a403c12c(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
