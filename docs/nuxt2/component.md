---
id: 5
---

# 组件开发

在 Nuxt 的设计中，组件文件分为 “布局 > 页面 > 子组件” 三个级别。

## 布局组件

### 功能概述

“布局” 相当于为页面提供一个外层骨架，便于我们统一整个网站或某个频道的页面结构和样式。

布局组件存放在 `./layouts` 目录下。每个页面组件都会去寻找自己的布局来渲染页面，寻找优先顺序如下：

1. 如果页面组件指定了 `layout` 字段，则以此字段值作为文件名去寻找布局组件。比如下面这个组件页面会寻找 `./layouts/foo.vue` 作为自己的布局。

	```html
	<template>
		<!-- 模板代码 -->
	</template>

	<script>
	export default {
		layout: 'foo',
		// ...
	}
	</script>
	```

1. 如果页面没有指定 `layout` 字段，则默认寻找 `./layouts/default.vue` 作为布局（注意：文件名的大小写敏感。）。

1. 如果不存在 `./layouts/default.vue` 文件，则取 Nuxt 内置的默认布局。其代码基本上是这样的：

	```html
	<template>
		<Nuxt />
	</template>
	```

### 代码书写

一个典型的布局组件可能是这样的：

```html
<template>
	<div class="page-wrapper">
		<header>...</header>
		<div class="page-main-body">
			<div class="main">
				<Nuxt />
			</div>
		</div>
		<footer>...</footer>
	</div>
</template>
```

布局组件的模板必须包含一个 `<Nuxt />` 组件，用于标记页面组件在布局组件中的插入点。

布局组件可以正常引用 “子组件”。

### 不便之处

“布局” 是 Nuxt 的原生机制，每个页面都逃脱不掉。比较讨厌的是，Nuxt 会在渲染页面时生成一些冗余结构，开发者无法控制。最终生成的页面结构是这样的（示意）：

* `<html>`
	* `<body>`
		* `<div id="__nuxt">`
			* `<div id="__layout">`
				* 布局组件的结构
					* 页面组件


## 页面级组件

所有页面级组件都应存放在 `/pages` 目录下。

页面级组件有两大玄机，一是 Nuxt 对 Vue 组件赋予了一些特殊能力，二是 Nuxt 的 “约定式路由” 机制——Nuxt 会根据 `/pages` 目录内部层级来生成路由。这两部分内容会在其它文档中另述。

值得一提的是，Nuxt 对当前路由之外的路由统一使用异步路由（页面级组件异步加载）。

### 错误页面

当 Nuxt 的服务端出现运行时错误时（比如常见的路由未定义出现 404 错误），会自动调用一个内置的错误页面组件用于展示错误页。如果你需要自定义这个错误页，则需要手动创建一个名为 `error.vue`  的错误页面组件。

这个错误页面组件非常特殊：

* 它必须放置于 `./layouts` 目录下，但它又不是一个布局组件——它不能包含 `<Nuxt />`，也不能被其它页面级组件指定为布局。
* 它是一个标准的页面级组件，所有行为与其它页面级组件无异——比如它会寻找布局组件用于自身的渲染。

默认的错误页面组件代码 [参见这里](https://nuxtjs.org/docs/concepts/views#error-page)，我们可以以此为蓝本来编写自己的错误页面。


## 子组件

“子组件” 是本文自定义的一个概念，指所有非布局、非页面级组件。所有子组件都应存放在 `/components` 目录下。

### 自动注册

`/components` 目录下的组件会被 Nuxt 自动注册为全局组件，可以在任意组件的模板中直接使用。

这个 “自动注册” 特性是由 `nuxt.config.js` 中的 `components` 字段来启动的（需要设置为 `true` 或一个详细的配置对象）。

### 子目录

对于 `/components` 的子目录下的组件，Nuxt 也是会自动注册的，但是 Nuxt 会自动根据子目录的结构来给组件名加前缀。比如 `/components/foo/bar/Button.vue` 会被注册为 `<FooBarButton />`。

如果你不喜欢附加的路径前缀，希望组件的文件名和组件名保持一致，则需要在 `nuxt.config.js` 中显式指定所有需要自动注册组件的路径：

```js
export default {
	components: {
		// 需要自动注册组件的路径
		dirs: [
			'@/components',
			'@/components/foo/bar',
		],
	},
}
```

***

### 附：组件异步加载

“组件异步加载” 也称作 “组件懒加载”，在构建层面的效果就是组件代码被打到独立的包中，在需要时才加载，从而减小主包的体积。

在 Nuxt 中，除了异步路由具有异步加载组件代码的效果，你也可以对任何一个组件进行异步加载。方法就是把给组件名加上 `Lazy-` 前缀。比如把 `<MyFooter>` 改名为 `<LazyMyFooter>` 就可以了，十足的黑魔法。


### 附：自定义 HTML 骨架

如上所述，布局组件只能决定 `html > body > div#__nuxt > div#__layout` 内的结构，如果我们想修改更上层的页面结构，就需要自定义 HTML 骨架。

在项目的根目录下创建一个 `app.html`：

```html
<!DOCTYPE html>
<!--[if IE 9]><html class="ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
<head {{ HEAD_ATTRS }}>
{{ HEAD }}
</head>
<body {{ BODY_ATTRS }}>
{{ APP }}
</body>
</html>
```

它必须包含一些特定的插值标记，以便 Nuxt 在构建 HTML 时插入合适的内容，此外就随你发挥了。比如上面的示例就利用 IE 的条件注释给 `<html>` 添加了 class 作为 IE9 的标记。
