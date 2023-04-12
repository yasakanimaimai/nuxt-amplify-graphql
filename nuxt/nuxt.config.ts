import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(vuetify())
    },
  },
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
      'window.global': {},
    },
  },
  css: ['@/assets/main.scss'],
  // plugins: [
  //   { src: '~/plugins/amplify'},
  //   { src: '~/plugins/client', mode: 'client' }
  // ],
  plugins: ["~/plugins/amplify"],
})