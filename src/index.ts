import { parse, Plugin } from 'postcss'
import { PathLike } from 'fs'
import { build } from '@iconsauce/core'
import { IconsauceConfig } from '@iconsauce/config'
import { Config } from '@iconsauce/config/src/interface/config'

const plugin = (configOrPath?: Config | PathLike): Plugin => {
  return {
    postcssPlugin: 'postcss-iconsauce',
    async AtRule (rule) {
      if (rule.name === 'iconsauce') {
        if (typeof configOrPath === 'string' ) {
          rule.replaceWith(parse(await build(new IconsauceConfig(configOrPath))))
        } else {
          rule.replaceWith(parse(await build(configOrPath as Config ?? new IconsauceConfig())))
        }
      }
    },
  }
}

export const postcss = true

plugin.postcss = true

module.exports = plugin
