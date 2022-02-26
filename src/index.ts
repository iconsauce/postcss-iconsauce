import { parse, Plugin } from 'postcss'
import { build } from '@iconsauce/core'
import { Config } from '@iconsauce/core/src/interface/config'

const plugin = (configuration?: Config): Plugin => {
  return {
    postcssPlugin: 'postcss-iconsauce',
    async AtRule (rule) {
      if (rule.name === 'iconsauce') {
        rule.replaceWith(parse(await build(configuration)))
      }
    },
  }
}

export const postcss = true

plugin.postcss = true

module.exports = plugin
