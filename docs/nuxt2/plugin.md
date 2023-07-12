---
id: 7
---

# 插件

## 概述

Nuxt 有自己的插件机制。Nuxt 会在实例化 Vue 应用之前运行所有指定的插件。

Nuxt 插件并不是 Vue 插件，但它可以用来加载 Vue 插件。


## 标准写法

一个标准的 Nuxt 插件通常导出一个函数，我们姑且称之为 “插件函数” 吧。Nuxt 在调用插件函数时会传入两个参数（`context` 和 `inject`），便于我们在函数内完成一些操作。示例如下：

```js
export default (context, inject) => {
	// ...
}
```

第一个参数 `context` 与 [中间件函数](6) 接收到 `context` 参数是一样的，因此在插件函数内，我们同样可以从 context 上获取数据或往 context 上挂载数据。

而 `inject` 是一个工具方法，我们可以借助它向 Vue 实例、context 等处注入一些公共数据或方法，从而方便我们在整个应用的各处调用。写法如下：

```js
export default (context, inject) => {
	inject('foo', function () {})
}
```

`inject()` 的第一个参数是要注入的 key，会自动加上 `$` 作为前缀（也就是说，`foo` 在注入后需要以 `$foo` 作为 key 来访问）；第二个参数是对应的值，可以是数据，也可以是函数。

一次注入之后，我们就可以在以下几种场景调用它：

* 在 Vue 实例的 `this` 身上调用（通常运行于客户端）。

	```html
	<script>
	export default  {
		mounted() {
			this.$foo()
		},
		// ...
	}
	</script>
	```

* 在 context 身上调用（通常运行于服务端）。

	```html
	<script>
	export default  {
		asyncData(context) {
			context.$foo()
		},
		// ...
	}
	</script>
	```

* 在 store 的 action 身上调用。

	```js
	export const actions = {
		myAction({ commit }) {
			this.$foo()

			// ...
		},
	}
	```


## Vue 插件

插件的另一种用法是加载 [Vue 插件](https://cn.vuejs.org/v2/guide/plugins.html)。此时无需导出一个函数，直接把加载 Vue 插件的语句写在插件文件中就可以了。

```js
import Vue from 'vue'
import * as Laserbeak from '@*******/laserbeak'

Vue.use(Laserbeak.vuePlugin)
```


## 声明

我们需要在 `nuxt.config.js` 的 `plugins` 字段中指定插件。我们除了可以指定插件文件的位置，还可以指定每个插件运行在客户端还是服务端。方法如下：

* 基于文件名约定：

	```js
	export default {
		plugins: [
			'@/plugins/foo.client.js',	// 仅运行于客户端
			'@/plugins/bar.server.js',	// 仅运行于服务端
			'@/plugins/foobar.js',		// 运行在两端
		],
	}
	```

* 基于显式配置：

	```js
	export default {
		plugins: [
			{ src: '@/plugins/foo.js', mode: 'client' },	// 仅运行于客户端
			{ src: '@/plugins/bar.js', mode: 'server' },	// 仅运行于服务端
			{ src: '@/plugins/foobar.js' },					// 运行在两端
		],
	}
	```

### 进阶配置

在 `nuxt.config.js` 中还可以指定一个 `extendPlugins` 方法。这个方法会接收到我们通过 `plugins` 字段指定的所有插件（数组），它可以对这个数组做一些处理，然后再传递给 Nuxt 运行。这个方法通常用来调整插件的运行顺序。


## 注意事项

* 禁止在插件函数内使用 `Vue.use()`、`Vue.component()` 等全局操作，因为这样会导致服务端内存泄漏。（待确认）

* 如果想在插件函数内加载全局 mixin，则应该通过标志位（或其它方法）避免重复加载。否则可能导致服务端内存泄漏。（待确认）
