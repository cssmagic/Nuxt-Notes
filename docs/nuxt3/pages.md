---
id: 9
tags: [Nuxt3]
---

# Nuxt 3 笔记：页面与路由

## 概述

页面组件只能有一个根元素，这样路由间的过渡动效才能正确完成；否则路由过渡之后新页面可能无法正常显示。（注意：HTML 注释也会被视为元素。）

## 动态路由

* `[foo]` —— 表示 `foo` 是动态参数。
* `[[bar]]` —— 表示 `bar` 是可省略参数。
* `[...foobar]` —— 匹配任意层级的路径。

示例：

* `/pages/[[slug]].vue` 可以被 `/` 和 `/abc` 匹配到。
* `/pages/aaa/[...slug].vue` 可以被 `/aaa/bbb` 和 `/aaa/bbb/ccc` 匹配到。

获取参数：

* 在组件的模板中通过 `$route.params.xxx` 获取参数。
* 在组件的 JS 中通过 `useRoute()` 获取当前 route 对象，再通过 `.params.xxx` 获取参数。
* `[...foobar]` 这种形式的参数的值是一个数组。

## 嵌套路由

父路由组件内需要内嵌一个 `<NuxtPage />` 组件来显示子路由的组件，并且可以通过 `<NuxtPage />` 的 prop 来传递参数给子路由的组件。

## 子路由的 key

（待确认）

## 路由元数据

设置：

```js
definePageMeta({
	title: 'My home page'
})
```

在别处获取：

```js
const route = useRoute()
route.meta.title  // => 'My home page'
```

注意事项：

* `definePageMeta()` 是一个宏命令，会在编译阶段特殊处理。它的内容会被提升到组件之外，因此它不能引用组件内定义的值。但它可以引用从其它模块导入的数据。

* 元数据可自定义，但有一些预设的字段有特殊含义和作用。


## 路由校验

页面可以通过 `definePageMeta()` 来配置一个 `validate` 属性作为校验函数。校验函数接收当前 route 作为参数，用于校验当前 route 是否可以由当前页面来渲染。如果校验函数返回 `false`，框架会继续寻找其它匹配的页面，如果找不到，则会产生一个 404 错误。

校验函数可以是异步函数。

校验函数也可以直接返回一个 `{ statusCode, statusMessage }` 对象，此时框架会直接抛错，不会再继续寻找其它匹配的页面。

***

## `<NuxtPage>`

`<NuxtPage>` 是对 Vue Router 的 `<RouterView>` 组件的包装，因此它接收相同的 `name` 和 `route` 属性（当然，Nuxt 会根据 `pages` 目录自动解析并得到 `name` 和 `route` 属性）。

### pageKey

```html
<NuxtPage page-key="static" />
```

给它一个 static 的 key，`<NuxtPage>` 组件则只会在 mounted 时渲染一次。（待确认）

除了这种方式，还可以在页面组件的 `<script setup>` 中通过 `definePageMeta()` 来指定一个 `key` 属性。

### 自定义 prop

```html
<NuxtPage :foobar="123" />
```

据说可以通过 `attrs.foobar` 来访问这个值。但实际上并没有试出来。（待确认）


## `<NuxtLink>`

根据链接是指向内部还是外部，`<NuxtLink>` 会生成 `<RouterLink>` 组件或 HTML 的 `<a>` 标签，同时会增加一些可能的优化（prefetch、默认属性等）。


***

相关链接：

* https://nuxt.com/docs/guide/directory-structure/pages
* https://nuxt.com/docs/api/components/nuxt-page
* https://nuxt.com/docs/api/components/nuxt-link
