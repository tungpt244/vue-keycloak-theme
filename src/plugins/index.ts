import messages from '@intlify/unplugin-vue-i18n/messages'
import { useStorage } from '@vueuse/core'
import { type App } from 'vue'
import { createI18n } from 'vue-i18n'

const locale = useStorage('locale', 'en')

const i18n = createI18n({
  locale: locale.value,
  messages,
})

export default {
  install: (app: App) => {
    app.use(i18n)
  },
}
