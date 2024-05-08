import '@/assets/style/style.css'
import '@/assets/style/tailwind.css'
import { MOCK_CONTEXT } from '@/mock'
import { Environment } from '@/types'
import { Component, createApp } from 'vue'
import i18nPlugin from '@/plugins'

declare global {
  interface Window {
    mountApp: (selector: string, context: Environment) => void
  }
}

export const renderHooks = (screen: Component) => {
  const app = createApp(screen)

  const mountApp = (selector: string, context: Environment) => {
    console.log(context)
    app.provide<Environment>('kcContext', context)
    app.use(i18nPlugin)
    app.mount(selector)
  }

  if (import.meta.env.DEV) {
    mountApp('#app', MOCK_CONTEXT)
  }

  window.mountApp = mountApp

  const __renders = import.meta.glob('../modules/*/index.html')
  console.log('__render', __renders)
}
