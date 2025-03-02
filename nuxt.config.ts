import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  
  runtimeConfig:{
    public:{
      API_BASE_URL:process.env.API_BASE_URL
    }
  },
  modules: ['@primevue/nuxt-module', 'vue3-carousel-nuxt'],
  css: ['~/assets/css/global.scss',
    'normalize.css/normalize.css'
  ],
  build: {
    transpile: ['primevue']
  },
  carousel: {
    prefix: 'sld'
  },
  
  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'none',
          cssLayer: false
        }
      }
    }
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/primevue/resources/themes/nova-light/theme.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/primevue/resources/primevue.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/primeicons/primeicons.css' },
        {
          rel: 'stylesheet',href: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
        }
      ]
    }
  },
  compatibilityDate: '2025-02-01'
})