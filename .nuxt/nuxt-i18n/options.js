import locale38517862 from '../..\\locales\\ar.json'
import locale9ec66352 from '../..\\locales\\en.json'
import locale7768ada4 from '../..\\locales\\he.js'

export const Constants = {
  COMPONENT_OPTIONS_KEY: "nuxtI18n",
  STRATEGIES: {"PREFIX":"prefix","PREFIX_EXCEPT_DEFAULT":"prefix_except_default","PREFIX_AND_DEFAULT":"prefix_and_default","NO_PREFIX":"no_prefix"},
  REDIRECT_ON_OPTIONS: {"ALL":"all","ROOT":"root","NO_PREFIX":"no prefix"},
}
export const nuxtOptions = {
  isUniversalMode: true,
  trailingSlash: undefined,
}
export const options = {
  vueI18n: {"fallbackLocale":"ar"},
  vueI18nLoader: false,
  locales: [{"code":"en","iso":"en-US","file":"en.json","dir":"ltr","name":"english"},{"code":"ar","iso":"ar-EG","file":"ar.json","dir":"rtl","name":"arabic"},{"code":"he","iso":"he","file":"he.js","dir":"rtl","name":"hebrow"}],
  defaultLocale: "ar",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  defaultLocaleRouteNameSuffix: "default",
  sortRoutes: true,
  strategy: "no_prefix",
  lazy: false,
  langDir: "E:\\IbrahimProject\\Vue\\Serapha\\locales\\",
  rootRedirect: null,
  detectBrowserLanguage: {"alwaysRedirect":true,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"ar","redirectOn":"root","useCookie":true,"onlyOnRoot":true},
  differentDomains: true,
  baseUrl: "http://localhost:8000",
  vuex: {"moduleName":"i18n","syncRouteParams":true,"syncLocale":true,"syncMessages":false},
  parsePages: true,
  pages: {},
  skipSettingLocaleOnNavigate: false,
  onBeforeLanguageSwitch: () => {},
  onLanguageSwitched: () => null,
  normalizedLocales: [{"code":"en","iso":"en-US","file":"en.json","dir":"ltr","name":"english"},{"code":"ar","iso":"ar-EG","file":"ar.json","dir":"rtl","name":"arabic"},{"code":"he","iso":"he","file":"he.js","dir":"rtl","name":"hebrow"}],
  localeCodes: ["en","ar","he"],
  additionalMessages: [],
}

export const localeMessages = {
  'ar.json': () => Promise.resolve(locale38517862),
  'en.json': () => Promise.resolve(locale9ec66352),
  'he.js': () => Promise.resolve(locale7768ada4),
}
