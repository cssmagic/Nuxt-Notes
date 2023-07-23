---
id: 11
tags: [Nuxt3]
---

# Nuxt 3 笔记：插件

## 概述

* Nuxt 有自己的插件机制。Nuxt 会在创建 Vue 应用时加载所有能找到的插件。

* 插件的存放位置也有约定。在 `plugins` 目录下，一级 `*.(js|ts)` 文件和一级目录下的 `index.(js|ts)` 文件会被自动加载。

* 导入顺序按字母排序，所以可以通过显式地给文件名加序号来决定它们的加载顺序。

* Nuxt 插件并不是 Vue 插件，但它可以用来加载 Vue 插件。


## 格式

插件的默认导出是一个函数，代码示例如下：

```js
export default defineNuxtPlugin((nuxtApp) => {
	const app = nuxtApp.vueApp
	// ...
})
```

插件内部可以使用 Composable。但是：

* 如果一个 Composable 是由其他插件注册的，那就会存在加载顺序问题。
* 如果一个 Composable 依赖 Vue.js 生命周期，那它也不能正常工作。因为这些 Composable 是跟组件绑定的，而插件是跟当前 `nuxtApp` 绑定的。


## 加载 Vue 插件

```js
import MyPlugin from 'vue-my-plugin'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(MyPlugin, {})
})
```

同理，也可以在 Nuxt 插件里定义指令：

```js
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('my-directive', { /* ... */ })
})
```


## 提供工具方法

插件函数可以返回一个对象，对象的 `provide` 字段用于向外提供工具方法：

```js
export default defineNuxtPlugin(() => {
	return {
		provide: {
			hello: (msg) => `Hello ${msg}!`
		}
	}
})
```

这个工具方法会被加上 `$` 前缀，并挂载在 `nuxtApp` 身上。我们需要先获取它：

```js
// script setup
const { $hello } = useNuxtApp()
```

然后就可以使用这个工具方法了（需要加 `$` 前缀）：

```html
<template>
	<div>
		{{ $hello('world') }}
	</div>
</template>
```


## 避开初始化高峰执行代码

```js
export default defineNuxtPlugin(() => {
	onNuxtReady(async () => {
		const myAnalyticsLibrary = await import('my-big-analytics-library')
		// do something with myAnalyticsLibrary
	})
})
```

即使是在初始化完成之后，也是可以调用 `onNuxtReady()` 的，它的回调会在下个周期立即执行。就像 jQuery 的 `ready()` 方法一样。
