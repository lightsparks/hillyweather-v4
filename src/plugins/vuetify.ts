import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#2B93F3',
          secondary: '#5A557C',
          error: '#FF5356',
          info: '#FF8696',
          success: '#00CE89',
          warning: '#F1BB46',
        },
      },
    },
  },
})
