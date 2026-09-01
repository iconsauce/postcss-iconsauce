import { parse, type Plugin } from 'postcss'
import { type PathLike } from 'fs'
import { build, buildCSS as css, IconsauceConfig } from '@iconsauce/core'

const plugin = (configPath?: PathLike ): Plugin => {
  return {
    postcssPlugin: 'postcss-iconsauce',
    async AtRule (rule) {
      if (rule.name === 'iconsauce') {
        const config = await new IconsauceConfig().loadConfig(configPath?.toString())
        await build(config).then(async (data: { dictionary: Map<string, PathLike>, list: Map<string, PathLike> } | undefined) => {
          if (data === undefined) {
            return ''
          }
          rule.replaceWith(parse(await css(config, data.list)))
        })
      }
    },
  }
}

plugin.postcss = true

export = plugin
