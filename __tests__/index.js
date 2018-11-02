const postcss = require('postcss')
const plugin = require('../')

const process = (css, options) =>
  postcss([plugin(options)]).process(css, { from: undefined })

it('provides fallback for given families', async () => {
  const css = `
    .header {
      font-family: Lora, Georgia, Times New Roman, serif;
    }

    .body {
      font-family: Helvetica Neue, Helvetica, sans-serif;
    }
  `
  const result = await process(css, { families: ['Lora'] })
  expect(result.css).toMatchInlineSnapshot(`
"
    .header {
      font-family: Georgia, Times New Roman, serif;
    }
    .wf-active .header {
      font-family: Lora, Georgia, Times New Roman, serif;
    }

    .body {
      font-family: Helvetica Neue, Helvetica, sans-serif;
    }
  "
`)
})

it('supports CSS Modules', async () => {
  const css = `
    .header {
      font-family: Lora, Georgia, Times New Roman, serif;
    }
  `
  const result = await process(css, { modules: true, families: ['Lora'] })
  expect(result.css).toMatchInlineSnapshot(`
"
    .header {
      font-family: Georgia, Times New Roman, serif;
    }
    :global(.wf-active) .header {
      font-family: Lora, Georgia, Times New Roman, serif;
    }
  "
`)
})
