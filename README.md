# postcss-iconsauce

For more infos go to [iconsauce docs][iconsauce-docs].

#### Installation

To install iconsauce you'll need to run this command

```
npm i --save-dev @iconsauce/core postcss-iconsauce autoprefixer
```

#### PostCSS config

Place a `postcss.config.js` into the root of your project:

```js
module.exports = {
  plugins: [
    require('postcss-iconsauce'),
    require('autoprefixer'),
  ],
}
```

#### CSS entry point

To let iconsauce builds, it needs a css entrypoint with a special `at-rule` inside:

```css
@iconsauce;

/* You can also add more code for icons here */
```

At this point, how PostCSS is integrated in yout build system depends on the framework you are using, we will add more reproducible example as soon as possibile:

* create-react-app
* Next
* Angular

#### PostCSS CLI

If you want to use iconsauce from CLI with PostCSS, install an additional dependency:

```
npm i --save-dev postcss-cli
```

Now you can add a script to build in your `package.json` file.

```json
"scripts": {
  "build:iconsauce": "postcss src/styles/iconsauce.css -o public/styles/iconsauce.css"
}
```

[iconsauce-docs]: https://iconsauce.github.io/docs/
