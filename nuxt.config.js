import colors from 'vuetify/es5/util/colors'
import ar from 'vuetify/lib/locale/ar';
import en from 'vuetify/lib/locale/en';
export default {
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  server: {
    host: '127.0.0.1',
    port: 6214
  },
  head: {
    // titleTemplate: '',
    titleTemplate: '%s - الفلسطينية للصرافة',
    title: 'الفلسطينية',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/global-keydown.js', ssr: false },

    {
      src: "~/plugins/vuetify",
      ssr: false
    },
    {
      src: "~/plugins/mixins",
    },
    {
      src: '~/plugins/vue-apexchart.js',
      ssr: false
    },
    {
      src: '~/plugins/v-mask.js',
      ssr: false
    },
    {
      src: '~/plugins/element_identifier.js',
    },
    {
      src: '~/plugins/cookie.js'
    },
    {
      src: '~/plugins/sweet-alert.js'
    },
    {
      src: '~/plugins/module_generator.js'
    },
    {
      src: '~/plugins/global_mixin.js'
    },
    {
      src: '~/plugins/axios.js'
    },
    {
      src: '~/plugins/phone-number.js'
    },
    {
      src: '~/helpers/menus_filters.js'
    },
    {
      src: '~/helpers/global.js'
    },
    // {
    //   src: '~/plugins/v-datetime-picker.js'
    // },

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // credentials: true,
    withCredentials: true,
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: `${process.env.BASE_URL}/api`,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#FF7F00',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    lang: {
      locales: {
        ar,
        en,
      },
      current: 'ar',
    },
  },
  i18n: {
    silentTranslationWarn: true,
    baseUrl: process.env.BASE_URL,
    strategy: 'no_prefix',
    differentDomains: true,
    locales: [{
      code: 'en',
      iso: 'en-US',
      file: 'en.json',
      dir: 'ltr',
      name: 'english'
    },
    {
      code: 'ar',
      iso: 'ar-EG',
      file: 'ar.json',
      dir: 'rtl',
      name: 'arabic'
    },
    {
      code: 'he',
      iso: 'he',
      file: 'he.js',
      dir: 'rtl',
      name: 'hebrow'
    },
    ],
    langDir: '~/locales/',
    defaultLocale: 'ar',
    vueI18n: {
      fallbackLocale: 'ar',
    },
    detectBrowserLanguage:
    {
      alwaysRedirect: true,
      fallbackLocale: 'ar', //If none of the locales match the browser's locale, use this one as a fallback
      onlyOnRoot: true, //for better SEO it's recommended to set onlyOnRoot to true.
      useCookie: true,
      cookieCrossOrigin: false,
      cookieDomain: null,
      cookieKey: 'i18n_redirected',
      cookieSecure: false
    },

    // rootRedirect: {
    //   statusCode: 301,
    //   path: '/'
    // },
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
      syncMessages: false,
      syncRouteParams: true
    },
    strategy: 'no_prefix',
    differentDomains: true,
    // beforeLanguageSwitch:(oldLocale, newLocale) => {
    //   console.log(oldLocale, newLocale)
    //   oldLocale == 'en' ? (this.vuetify.rtl = true):(this.vuetify.rtl = false)
    // }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  auth: {
    redirect: {
      login: '/auth/login',
      home: '/dashboard',
      logout: '/auth/login',
      callback: false,
    },
    strategies: {
      local: {
        name: 'local',
        // provider: 'laravel/passport',
        cookie: {
          prefix: 'auth.',
          options: {
            path: '/',
            secure: true,
          }
        },
        url: '/backend',
        endpoints: {
          logout: '/auth/logout',
          token: {
            property: 'token',
            global: true,
          },
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          authorization: '/auth/login',
          user: {
            url: '/auth/user',
          },
        },
        clientId: process.env.PASSPORT_CLIENT_ID,
        clientSecret: process.env.PASSPORT_CLIENT_SECRET,
        grantType: 'password',
      },
    },
  },
  proxy: {
    '/backend': {
      target: `${process.env.BASE_URL}/api`,
      pathRewrite: { '^/backend': `${process.env.BASE_URL}/api` },
    },
  },
  toast: {
    duration: 5000,
    keepOnHover: true,
    position: 'top-center',
  },
}
