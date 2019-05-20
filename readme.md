# postcss-webfontloader

Provides fallbacks for loading fonts with [Web Font Loader][webfontloader].

---

**Deprecated**: Google Fonts [started offering](https://addyosmani.com/blog/google-fonts-font-display/) stylesheets with `font-display: swap`, which has a [decent browser support](https://caniuse.com/#feat=css-font-rendering-controls), so you might want to consider using that instead of mimicking the same behavior by loading fonts with Web Font Loader and generating fallbacks using this PostCSS plugin.

---

## Setup

```sh
yarn add postcss-webfontloader
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-webfontloader': {
      modules: false,
      families: [
        'Lora',
      ],
    },
  },
}
```

## Basic usage

### Input

```css
/* base.css */
body {
  font-family: Lora, Georgia, serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
```

### Output

```css
/* base.css */
body {
  font-family: Georgia, serif;
}
.wf-active body {
  font-family: Lora, Georgia, serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
```

### Output for CSS Modules

If you're using CSS Modules, set `modules` to `true` to get the following output:

```css
/* base.css */
body {
  font-family: Georgia, serif;
}
:global(.wf-active) body {
  font-family: Lora, Georgia, serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
```

[webfontloader]: https://github.com/typekit/webfontloader
