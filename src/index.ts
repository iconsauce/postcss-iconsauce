import { parse, Plugin } from 'postcss'
import { PathLike } from 'fs'
import { build, buildCSS as css } from '@iconsauce/core'
import { IconsauceConfig } from '@iconsauce/config'

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

export const postcss = true

plugin.postcss = true

module.exports = plugin
