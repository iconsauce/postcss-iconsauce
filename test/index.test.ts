import path from 'path'
import postcss from 'postcss'
import plugin = require('../src/index')

describe('postcss-iconsauce', () => {
  it('replaces the @iconsauce at-rule with the generated icon font CSS', async () => {
    const configPath = path.resolve(__dirname, 'fixtures/iconsauce.config.js')
    const result = await postcss([plugin(configPath)])
      .process('@iconsauce;', { from: undefined })

    expect(result.css).toContain('@font-face')
    expect(result.css).toContain('.mdi\\/account::before')
    expect(result.css).not.toContain('@iconsauce')
  }, 60000)

  it('leaves CSS without the at-rule untouched', async () => {
    const input = '.foo { color: red }'
    const result = await postcss([plugin()]).process(input, { from: undefined })
    expect(result.css).toBe(input)
  })
})
