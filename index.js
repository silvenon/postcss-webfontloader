const postcss = require('postcss')

const SELECTOR_ACTIVE = '.wf-active'

module.exports = postcss.plugin(
  'postcss-webfontloader',
  ({ modules = false, families }) => root => {
    root.walkDecls('font-family', decl => {
      const [firstFamily, ...fallbackFamilies] = postcss.list.comma(decl.value)
      const rule = decl.parent
      if (
        families.find(family => firstFamily.match(new RegExp(family, 'i'))) &&
        rule != null &&
        !rule.selector.includes(SELECTOR_ACTIVE)
      ) {
        const fallbackDecl = decl.clone({
          value: fallbackFamilies.join(', '),
        })
        const activeDecl = decl.clone()

        decl.replaceWith(fallbackDecl)
        rule.cloneAfter({
          selectors: rule.selectors.map(
            selector =>
              modules
                ? `:global(${SELECTOR_ACTIVE}) ${selector}`
                : `${SELECTOR_ACTIVE} ${selector}`
          ),
          nodes: [activeDecl],
        })
      }
    })
  }
)
