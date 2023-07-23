---
id: 10
tags: [Nuxt3]
---

# Nuxt 3 笔记：中间件

## 概述

全称应该是 “路由中间件”，用于把导航到特定路由之前所需要运行的代码抽出来。Nuxt 的中间件仅运行于 Vue 应用内，它跟 Web 服务器端的中间件不一个概念。

中间件的名称会被格式化为 kebab-case。

中间件本质上是一种 “路由守卫”。它对导航的控制能力如下：

* `navigateTo()`
* `abortNavigation()`


## 配置方法

* 全局中间件。命名为 `middleware/*.global.js`，会自动应用于所有路由。
* 页面级中间件。页面通过 `definePageMeta()` 指定。
* 匿名中间件。代码不是存放在 `middleware/` 目录中，而是内联于页面中。页面通过 `definePageMeta()` 指定。

此外，插件可以通过 `addRouteMiddleware()` 给当前应用动态添加中间件。


## 定义中间件

```js
export default defineNuxtRouteMiddleware((to, from) => {
	if (to.params.id === '1') {
		return abortNavigation()
	}
	return navigateTo('/')
})
```

***

相关链接：

* https://nuxt.com/docs/api/utils/navigate-to
* https://nuxt.com/docs/api/utils/abort-navigation
* https://nuxt.com/docs/api/utils/add-route-middleware
* https://nuxt.com/docs/api/utils/define-nuxt-route-middleware
