import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module'
  ],
  css: [],
  build: {
    transpile: ['primevue']
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
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/primeicons/primeicons.css' }
      ]
    }
  },
  compatibilityDate: '2025-02-01'
})
