import { defineNuxtModule } from '@nuxt/kit'
import * as composables from '@voire/vuerest'

const packageName = '@voire/vuerest'

/**
 * Auto import vuerest in Nuxt
 */
export default defineNuxtModule({
  meta: {
    name: '@voire/nuxt-vuerest',
    configKey: 'vuerest',
    version: '1.0.0',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(options, nuxt) {
    // opt-out vite deps optimization
    nuxt.hook('vite:extend', ({ config }: any) => {
      config.optimizeDeps = config.optimizeDeps ?? {}
      config.optimizeDeps.exclude = config.optimizeDeps.exclude ?? []
      config.optimizeDeps.exclude.push(packageName)
    })

    // auto import composables
    nuxt.hook('autoImports:sources', (sources: any[]) => {
      // List composables
      const imports = Object.keys(composables)

      sources.push({
        from: packageName,
        names: imports,
        imports,
        priority: -1,
      })
    })
  },
})
