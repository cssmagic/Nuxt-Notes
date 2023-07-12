---
id: 2
---

# 文件组织

## 目录结构

* `layouts/` —— 应用的布局组件。
* `pages/` —— 页面级组件。Nuxt 会根据其内部结构来生成路由，即传说中的 “约定式路由”。
* `components/` —— 应用的非页面级组件。所有组件会被 Nuxt 自动注册为全局组件，可以在任意组件的模板中直接使用。
* `assets/` —— 待编译的静态资源。在 JS 代码中可通过 `@/assets/` 来引用此目录中的资源；在 CSS 代码中通过 `~@/assets/` 来引用。
* `static/` —— 无需编译或不想编译的静态资源。在代码中可直接通过 `/` 来引用此目录中的资源。
* `plugins/` —— 插件目录。插件的作用是在 Vue 根应用实例化之前运行特定的 JS 脚本。
* `store/` —— 用于存放 Vuex 相关文件。
* `middleware/` —— 用于存放中间件 JS 文件。



## 根目录文件

* `README.md` —— 本项目的 README 文件。
* `README.nuxt.md` —— Nuxt 项目的默认 README 文件。
* `nuxt.config.js` —— Nuxt 的核心配置文件。
* `.editorconfig` —— 编辑器配置文件，包含基础的代码风格约定。
* `.eslintrc.js` —— ESLint 配置文件，可用于屏蔽不想要的规则，或屏蔽不想被扫描的文件。
* `.gitignore` —— 用于指定 Git 版本控制的排除范围。
* `jsconfig.json` —— 用于声明路径别名，便于 VS Code 解析代码中的路径。（WebStorm 也可识别此文件。）
