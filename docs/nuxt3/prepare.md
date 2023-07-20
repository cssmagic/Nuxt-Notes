---
id: 8
tags: [Nuxt3]
---

# 准备工作与初步认识

## 初始化

1. 创建项目（会创建一个子目录）：

	```sh
	npx nuxi init {my-project}
	```

	> `nuxi` 是 Nuxt 官方的命令行工具。

	期间不会提示任何问题，直接生成项目文件。

1. 安装依赖 `npm i`。（实际上更推荐用 yarn 作为包管理工具。）

1. 运行 `npm run dev` 启动，打开 http://localhost:3000/ 可以看到一个最简化的项目首页。



## 完善

1. 根据官方的目录结构，创建一级目录。

1. 修改 `app.vue` 的内容，把 `<NuxtWelcome>` 改为 `<NuxtPage>`，表示引用 `pages` 目录下的文件（并启用约定式路由）。

1. 在 `pages` 目录下创建 `index.vue` 和 `memo/index.vue` 等文件，以便响应 `/` 和 `/memo/` 等地址的请求。如果不生效或提示 404，可以尝试重启 Nuxt 开发服务。

	> 根据上面的文件设置，`/memo/` 和 `/memo` 可以得到相同的结果。

1. 在 `index.vue` 中可以通过 `<NuxtLink to='/memo/'>...</NuxtLink>` 来链向其他页面。

1. 设置动态路由对应的文件，比如 `/post/[slug].html.vue` 可以响应 `/post/:slug.html`。



## 升级

升级命令如下：

```sh
npx nuxi upgrade --force
```

> `--force` 是强制模式，会把 `node_modules` 和 lock 文件删除之后再进行升级。

### 问题

* 可能会报错 `Cannot detect Package Manager`。

	解决方案：在仓库根目录创建一个空的 `package-lock.json` 文件即可。这样 nuxi 就知道我们使用的包管理工具是 NPM 了。

	```sh
	echo '{}' > package-lock.json
	```

* 用了 `--force` 以后似乎并没有更新 nuxt 的版本。

	解决方案：先在 `package.json` 中手动更新 nuxt 的版本，再运行升级命令。



## 常规要素

### Layout

* 在 `/layouts` 目录中添加 Layout 组件 `default.vue`（或别的文件名），需要有 `<slot />`，否则内容无处安放。

* 在 `app.vue` 中需要通过 `<NuxtLayout>...</NuxtLayout>` 来使 Layout 生效，可以通过 `name` 属性来指定非 default 的 Layout。

* Layout 看起来就是个普通的带 slot 的组件，然后是通过 NuxtLayout 来引用的。其他特殊之处待发现。

* 可以通过 `setPageLayout()` 来动态地切换 Layout。不过这个方法只能在组件的 setup 阶段、插件、路由中间件中调用。

* 待确认：在开发阶段，服务端输出的 HTML 只包含 Layout 内部的代码，不包含 Layout 本身的结构。当然浏览器在页面水合之后得到的结构是完整的。

### 组件

* `components` 目录中的所有组件会自动导入。子目录中的组件在自动导入时会把所在路径拼入组件名中，比如 `foo/bar/abc.vue` 在自动导入后需要以 `<FooBarAbc>` 的名称来使用。

* 内置组件 `<ClientOnly>` 用来包裹只在客户端渲染的组件。它在服务端只会生成一个空的 `<span></span>` 标签。

### Hook / Composable

> 我们俗称的 “Hook” 在 Vue 生态中严格来说应该叫 “Composable”（组合式函数）。

* `composables` 目录中的所有 Hook 会自动导入。

  > 可以关闭 IDE 的自动导入功能，以免生成不必要的代码。

* Hook 文件需要具名导出函数。`export const useFoo = () => {}`

* 内置 Hook（也已自动导入）：
  * `useAppConfig()` 获取 Nuxt 配置
  * `useAsyncData()` 用于请求异步数据
  * `useFecth()` 是对 `useAsyncData()` 的封装，更易用。
  * `useCookie()` 读写 cookie
  * `useHead()` 自定义页面的头部标签（比如元标记、`<title>` 标签等，以及 `<html>` 和 `<body>` 标签的属性等）。
  * `useRoute()` 返回当前路由的一些数据；并且必须在 setup 函数、插件或路由中间件中调用。
  * `useRouter()` 返回路由器的实例；并且必须在 setup 函数、插件或路由中间件中调用。

### Store / 状态管理

1. 安装：

	```
	npm i pinia @pinia/nuxt --force
	```

	* 一开始只安装了 `@pinia/nuxt`，启动时有个库提示找不到 `pinia/dist/*`，发现 `@pinia/nuxt` 并没有提升到顶部（可能此时已经出现依赖冲突了，参见下面一条），所以还是要显式安装一下。
	* 用 `--force` 是因为 [某个未安装的可选依赖与其他依赖发生依赖冲突](https://github.com/vuejs/pinia/issues/1033)（这似乎是 npm 的 bug，Yarn 就没问题）。

1. 加载模块。`nuxt.config.ts` 中添加 `modules: ['@pinia/nuxt']`。

2. 使用：（待补充）

### VueUse

1. 安装 `npm i @vueuse/nuxt`。

1. 加载模块。`nuxt.config.ts` 中添加 `modules: ['@vueuse/nuxt']`。

1. 因为有自动加载，在组件中直接使用即可。比如 `const { x, y } = useMouse()`。


***

## 待研究的问题

* 生命周期
* 水合与 payload `useHydration()` / `nuxtApp.payload`
* Pinia
* PostCSS / autoprefixer / cssnano
