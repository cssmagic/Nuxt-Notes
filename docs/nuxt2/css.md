---
id: 4
---

# CSS 开发

## 文件组织

所有写在 Vue 组件之外样式代码，统一存放在 `@/assets/css/` 目录下。

## 预处理语言

统一采用 SCSS 作为 CSS 预处理语言。

可选择 Node Sass ([node-sass](https://www.npmjs.com/package/node-sass)) 和 Dart Sass ([sass](https://www.npmjs.com/package/sass)) 两者之一作为 SCSS 的编译引擎。前者已经被 Sass 官方宣布废弃，且安装过程不稳定，不推荐使用。在通常情况下建议选用后者，安装更简便，功能更新、更全。

Nuxt 项目必须安装 [sass-loader](https://www.npmjs.com/package/sass-loader) 才能实现对 SCSS 代码的编译。sass-loader 会自动寻找并加载已安装的编译引擎。如果两款编译引擎都安装了，会优先加载 Dart Sass。

`package.json` 中的相关依赖如下：

```json
{
	"devDependencies": {
		"node-sass": "^6.0.1",
		"sass": "^1.43.2",
		"sass-loader": "^10.2.0"
	}
}
```

## 自动注入公共代码

在常规的 Vue 项目中，可以通过 `vue.config.js` 的 [自动导入](https://cli.vuejs.org/zh/guide/css.html#%E8%87%AA%E5%8A%A8%E5%8C%96%E5%AF%BC%E5%85%A5) 或 [`scss.additionalData`](https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9) 来把公共代码注入到每个组件的 `<style>` 中。当我们定义了一些 SCSS 变量和 mixin 并希望它们全局可用时，这种统一加载的效果就十分方便了，省去了每个组件重复引入公共代码的操作。

而在 Nuxt 项目中，我们需要通过 [@nuxtjs/style-resources](https://www.npmjs.com/package/@nuxtjs/style-resources) 模块来实现类似的效果。

相关依赖：

```json
{
	"devDependencies": {
		"@nuxtjs/style-resources": "^1.2.1"
	}
}
```

在 `nuxt.config.js` 中的配置如下：

```js
export default {
	buildModules: [
		// 声明构建过程需要加载此模块
		'@nuxtjs/style-resources',
	],

	styleResources: {
		scss: [
			// 指定需要自动加载的全局代码
			'@/assets/css/global.scss',
		],
	},
}
```

## 指定全局 CSS

Nuxt 允许我们指定全局 CSS 代码。

在 `nuxt.config.js` 中可以指定一个 `css` 字段，它是一个文件数组。我们可以指定现成的 CSS 文件，也可以提供 SCSS 文件让 Nuxt 编译成 CSS 代码。（注：这里的编译行为也会受到上述 “自动注入公共代码” 机制的影响。）

配置代码示意如下：

```js
export default {
	css: [
		// 组件库的 CSS
		'element-ui/lib/theme-chalk/index.css',
		// 应用自身的公共样式
		'@/assets/css/common.scss',
	],
}
```

## 网页最终加载的 CSS

### Nuxt 生成的 CSS

在默认情况下，Nuxt 会把网页所需的 CSS 代码内嵌到 HTML 里的一个 `<style>` 标签里。其中包含以下几种 CSS 代码：

* `nuxt.config.js` 的 `css` 字段所指定的全局 CSS 资源。
* Vue 应用在 SSR 阶段编译生成的 CSS 代码，类似于常规 Vue 应用构建生成的 `app.css`。

异步路由所需要的组件样式代码包含在异步路由的 JS 资源中，并没有单独的 CSS 资源。这一点与常规 Vue 应用相同。

### 抽取 CSS 文件

我们可以让 Nuxt 把它生成的 CSS 代码抽取为外部的 CSS 资源文件，这样可以减少 HTML 的体积，同时也便于我们把 CSS 部署到 CDN 并享受缓存带来的好处。

配置方法如下：

```js
export default {
	build: {
		extractCSS: true,
	},
}
```

如果需要进一步控制 CSS 抽取的行为，请参考 [Nuxt 官网文档 > 配置 > 构建配置 > extractCSS](https://nuxtjs.org/docs/configuration-glossary/configuration-build#extractcss)。

## 加载第三方 CSS

如果你需要直接加载第三方提供的 CSS 资源，可以这样配置：

```js
export default {
	head: {
		link: [
			{ rel: 'stylesheet', href: '//cdn.net/css/lib.min.css' },
		],
	},
}
```

Nuxt 会根据这个配置在 HTML 的 `<head>` 中生成对应的 `<link>` 标签。

```html
<link data-n-head="ssr" rel="stylesheet" href="//cdn.net/css/lib.min.css">
```

你可能需要留意一下，这个 `<link>` 标签总是早于 Nuxt 生成的 CSS。

网页通过这种方式加载的 CSS 资源就是它在第三方服务器上原本的状态，Nuxt 不会对它做任何处理。

