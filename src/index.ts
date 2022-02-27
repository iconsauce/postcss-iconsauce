import { parse, Plugin } from 'postcss'
import { build } from '@iconsauce/core'
import { IconsauceConfig } from '@iconsauce/config'
import { Config } from '@iconsauce/config/src/interface/config'

const plugin = (configuration?: Config): Plugin => {
  const config = configuration ?? new IconsauceConfig()
  return {
    postcssPlugin: 'postcss-iconsauce',
    async AtRule (rule) {
      if (rule.name === 'iconsauce') {
        rule.replaceWith(parse(await build(config)))
      }
    },
  }
}

export const postcss = true

plugin.postcss = true

module.exports = plugin
