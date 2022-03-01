import { parse, Plugin } from 'postcss'
import { PathLike } from 'fs'
import { build, buildCSS as css } from '@iconsauce/core'
import { IconsauceConfig } from '@iconsauce/config'
import { Config } from '@iconsauce/config/src/interface/config'

const plugin = (configOrPath?: Config | PathLike): Plugin => {
  return {
    postcssPlugin: 'postcss-iconsauce',
    async AtRule (rule) {
      if (rule.name === 'iconsauce') {
        let config: Config
        if (typeof configOrPath === 'string' ) {
          config = new IconsauceConfig(configOrPath)
        } else {
          if (configOrPath === undefined) {
            config = new IconsauceConfig()
          } else {
            config = configOrPath as Config
          }
        }
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
