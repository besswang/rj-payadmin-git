import pkg from './package'

export default {
  mode: 'universal',
  generate : {
    subFolders: false
  },
  // router: {
  //   base: '/admin/',
  //   mode: 'hash'
  // },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'red' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css', '@/assets/stylus/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/element-ui', '@/plugins/filters.js', '@/plugins/axios.js', '@/plugins/jk.js'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios','@nuxtjs/proxy'
  ],
  axios: {
      proxy: true, // 表示开启代理
      prefix: '/api', // 表示给请求url加个前缀 /api
      credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      target: 'http://47.94.142.215:8082', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '', // 把 /api 替换成 /,api会自动替换target
      }
    }
  },
  // modules: [
  //     '@nuxtjs/axios',
  //     '@nuxtjs/proxy'
  //   ],
  // proxy: [
  //   ['/app', {
  //     target: 'http://xxx.com:8080'
  //   }]
  // ],

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    vendor: ['axios'] //为防止重复打包
  }
}
