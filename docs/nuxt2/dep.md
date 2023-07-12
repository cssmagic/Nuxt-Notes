---
id: 3
---

# 依赖

> 参见 [本仓库内的 `/example/nuxt2/package.json` 文件](https://github.com/cssmagic/Nuxt-Notes/blob/master/example/nuxt2/package.json)。

## 运行依赖

* `nuxt` —— 主框架。取 2.x 版本，内置 Vue 2。
* `element-ui` —— 组件库。取 2.x 版本，兼容 Vue 2。
* `@nuxtjs/axios` —— Nuxt 封装的 Axios，用于在服务端和客户端请求接口。
* `core-js` —— 构建 ES6+ 代码所需的 Polyfill。
* `@*******/laserbeak` —— 前端公共 SDK，用于对接 Sentry、ARMS 等基础设施。

## 开发依赖

* `cross-env` —— 命令行辅助工具。
* `@nuxt/types` —— Nuxt 为 IDE 提供的接口类型定义。
* `@babel/eslint-parser` —— ESLint 7 所需的 JS 解析器。
* `@nuxtjs/eslint-config` —— Nuxt 自带的 ESLint 配置包。
* `@nuxtjs/eslint-module` —— Nuxt 封装的 ESLint 集成包，把 ESLint 整合到 Nuxt 工作流中。
* `@nuxtjs/style-resources` —— Nuxt 自动注入样式代码的模块。具体功能可参见 “CSS 开发” 中的 “自动注入公共代码” 段落。
* `eslint` —— ESLint 7。
* `eslint-plugin-nuxt` —— ESLint 7 的 Nuxt 插件。
* `eslint-plugin-vue` —— ESLint 7 的 Vue 插件。
* `sass` —— 构建 Sass/SCSS 代码所需的 Sass 编译器。
* `sass-loader` —— 构建 Sass/SCSS 代码所需的 Webpack 插件。
* `fibers` —— sass-loader 所需的构建加速工具。
