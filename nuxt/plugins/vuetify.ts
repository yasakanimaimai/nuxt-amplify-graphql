import { createVuetify } from 'vuetify'
import {
  MAIN_THEME,
  mainTheme,
  MAIN_DARK_THEME,
  mainDarkTheme,
} from '@/helpers/themes'
import { defaults } from '@/helpers/defaults'
import * as labs from 'vuetify/labs/components'
// import '@mdi/font/css/materialdesignicons.css' // 使用するアイコンを読み込む `mdi-xxx`

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    defaults,
    display: {
      mobileBreakpoint: 'sm',
    },
    // add theme
    theme: {
      defaultTheme: MAIN_THEME,
      themes: {
        mainTheme,
        mainDarkTheme,
      },
      // primary-darken-9 primary-lighten-9 までできるようにする
      variations: {
        colors: ['primary', 'secondary', 'accent'],
        lighten: 9,
        darken: 9,
      },
    },
    components: {
      ...labs,
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
