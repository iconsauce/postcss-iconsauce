import { parse, Plugin } from 'postcss'
import { build } from '@iconsauce/core'

const plugin = (): Plugin => {
  return {
    postcssPlugin: 'postcss-iconsauce',
    async AtRule (rule) {
      if (rule.name === 'iconsauce') {
        rule.replaceWith(parse(await build()))
      }
    },
  }
}

export const postcss = true

plugin.postcss = true

module.exports = plugin
