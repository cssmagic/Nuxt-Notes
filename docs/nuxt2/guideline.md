---
id: 1
---

# 规范

## 编辑器配置

### 识别路径别名

不论是 Vue CLI 还是 Nuxt，都定义了一些路径别名，可用于以下四种场景：

```html
<template>
	<img src="@/assets/img/logo.png">
</template>

<script>
import * as util from '@/assets/js/util'
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
.bg {
  background-image: url("~@/assets/img/bg.png");
}
</style>
```

路径别名可以帮助我们简化模块的引用路径，省去无数的 `../../`。但编辑器往往无法识别，不仅无法在输入路径时弹出自动补全的建议菜单，也无法 Ctrl + 点击跳转到对应模块。这个问题是必须解决的。

* WebStorm 配置方法：

	让 WebStorm 读取 Nuxt 的 Webpack 配置，就可以实现对路径别名的识别。

	打开配置界面，进入 “Languages & Frameworks > JavaScript > Webpack”，选择 “Manually”，填入 `{project_root}/node_modules/nuxt/webpack.config.js`（这里的 `{project_root}` 是你的项目目录）。点 “OK” 保存配置，稍等片刻就可以生效了。

* VS Code 配置方法：

	在项目根目录创建一个 `jsconfig.json` 文件（参考 [本仓库内的 `/example/nuxt2/jsconfig.json` 文件](https://github.com/cssmagic/Nuxt-Notes/blob/master/example/nuxt2/jsconfig.json)），手动写入路径别名配置，这样 VS Code 就可以识别路径别名了。

	不过这种方法只能让 VS Code 识别 JS 中的路径别名，对于模板、CSS `@import`、CSS `url()` 内的路径别名是无效的（待确认）。

### 支持 EditorConfig

EditorConfig 是一项关于编辑器配置的第三方标准，对于支持此标准的编辑器，可以识别特定的配置文件并相应地调整自身行为。

WebStorm 原生支持 EditorConfig，运行完美。

VS Code 在安装第三方插件之后，可以实现 EditorConfig 的基本功能。安装步骤如下：

1. 安装 [EditorConfig 插件](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)。
1. 在本机全局安装依赖包：`npm i -g editorconfig`。
1. 重启生效。


## 编码规范

### 基本规范

1. 首先，请务必遵守 [前端代码通用规范](https://gitlab.****.**/pub/ued/guideline/issues/1)。
1. 其次，请参考 [JavaScript](https://gitlab.****.**/pub/ued/guideline/issues/4)、[Vue.js 组件](https://gitlab.****.**/pub/ued/guideline/issues/10)、[HTML](https://gitlab.****.**/pub/ued/guideline/issues/2)、[CSS/Sass](https://gitlab.****.**/pub/ued/guideline/issues/13) 等各语言编码规范。

注意：受限于 Nuxt 2 的内部设计，对于 `@/layouts` 目录下的布局组件和 `@/pages` 目录下的页面级组件，文件名采用 “全小写 + 连字符” 拼写形式（比如 `foo-bar.vue`）；除此以外，其它所有 Vue 组件文件名采用 “大驼峰” 拼写形式（比如 `FooBar.vue`）。

### 代码风格

项目根目录需要放置一个 `.editorconfig` 文件（文件内容参考 [本仓库内的 `/.editorconfig` 文件](https://github.com/cssmagic/Nuxt-Notes/blob/master/.editorconfig)），定义了一些基础的代码风格规则，包括：

* 文件编码格式（Charset）
* 缩进格式
* 缩进大小
* 换行符格式
* ……

当编辑器保存文件或格式化代码时，会应用这些规则，从而实现不同开发者、不同编辑器所产生的代码风格保持一致。

### JS 校验

Nuxt 默认使用的 ESLint 版本已经升级到了 7.x，因此本人整理的 ESLint 配置包 `@cmcm/eslint-config` 已经不再适用，有待升级。在此空白期内，可以采用 Nuxt 提供的配置包。

ESLint 的配置文件 `.eslintrc.js` 放置于项目根目录（文件内容参考 [本仓库内的 `/example/nuxt2/eslintrc.js` 文件](https://github.com/cssmagic/Nuxt-Notes/blob/master/example/nuxt2/eslintrc.js)）。可以在此文件内指定配置包、屏蔽部分规则、排除部分目录。
