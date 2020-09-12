import colors from 'vuetify/es5/util/colors'
import pkg from './package'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3000'
const BASE_URL = (
  process.env.BASE_URL ||
  process.env.DEPLOY_URL ||
  process.env.URL ||
  process.env.VERCEL_URL ||
  `http${PORT === 433 ? 's' : ''}://${HOST}${
    [433, 80].includes(PORT) ? '' : `:${PORT}`
  }`
).replace(/(^http[s]?)?(?::\/\/)?(.*)/, function (
  _,
  protocol = 'https',
  domain
) {
  return `${protocol}://${domain}`
})

const env = {
  APP_NAME: process.env.APP_NAME || 'Plants',
  VERSION: pkg.version,
  COMMIT: process.env.npm_package_gitHead,
  DATE_GENERATED: new Date().toISOString(),
  BASE_URL,
  MAPBOX_TOKEN:
    'pk.eyJ1IjoiZGFtaWVucm9iaW5zb24iLCJhIjoiY2tkbDdoMndhMDBqNjJ6cDhkbWg0ZnZ3cSJ9._xNEQMD1mzKuKyb8imU0Ng',
}

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',

  publicRuntimeConfig: {
    ...env,
  },

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: `%s | ${env.APP_NAME}`,
    meta: [
      {
        once: true,
        name: 'charset',
        hid: 'charset',
        content: 'utf-8',
      },
      {
        property: 'og:title',
        template: `%s | ${env.APP_NAME}`,
        hid: 'og:title',
      },
      {
        once: true,
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        once: true,
        name: 'version',
        hid: 'version',
        content: env.VERSION,
      },
    ],
    link: [
      {
        once: true,
        rel: 'icon',
        hid: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  pwa: {
    manifest: {
      name: env.APP_NAME,
      short_name: env.APP_NAME,
    },
    meta: {
      name: env.APP_NAME,
      ogHost: env.BASE_URL,
      ogImage: {
        path: '/cover.jpg',
        width: 1200,
        height: 600,
        type: 'image/jpg',
      },
    },
    icon: {
      sizes: [24, 48, 64, 120, 144, 152, 192, 384, 512],
    },
  },

  generate: {
    // if you want to use '404.html' instead of the default '200.html'
    fallback: true,
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // { src: 'plugins/theme', mode: 'client' }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  // components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@aceforth/nuxt-optimized-images',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/markdownit',
    // [
    //   'vue-warehouse/nuxt',
    //   {
    //     storages: [
    //       // 'store/storages/localStorage',
    //       // 'store/storages/cookieStorage',
    //     ],
    //   },
    // ],

    // keep sitemap last
    '@nuxtjs/sitemap',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    csc: {
      checkType: true,
    },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg',
    },
    theme: {
      dark: false,
      themes: {
        light: {
          anchor: colors.blue.darken4,
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: true,
    responsive: {
      quality: 50,
      adapter: require('responsive-loader/sharp'),
      sizes: [320, 640, 960, 1200, 1800, 2400],
      placeholder: true,
      placeholderSize: 20,
      format: 'webp',
      sharp: {
        format: {
          webp: true,
        },
        progressive: true,
      },
    },
  },

  sitemap: {
    hostname: BASE_URL,
    xslUrl: '/sitemap.xsl',
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // extractCSS: true,
    transpile: ['lodash-es'],
  },
}
