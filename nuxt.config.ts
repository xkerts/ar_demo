// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false // Disabled to avoid vue-tsc library path issues
  },

  // Development server with HTTPS
  devServer: {
    https: {
      key: './certificates/localhost-key.pem',
      cert: './certificates/localhost.pem'
    },
    host: '0.0.0.0', // Allow external access for mobile testing
    port: 3000
  },

  // App configuration
  app: {
    head: {
      title: 'WebAR Product Viewer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'View products in augmented reality using WebXR'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // CSS configuration
  css: ['~/assets/styles/main.css'],

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      modelsPath: process.env.MODELS_PATH || '/models'
    }
  },

  // Nitro server configuration
  nitro: {
    preset: 'netlify'
  }
})
