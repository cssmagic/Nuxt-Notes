module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false,
	},
	extends: [
		// '@nuxtjs',
		// 'plugin:nuxt/recommended'
	],
	rules: {},
	ignorePatterns: [
		'.nuxt/',
		'output_scm/',
		'*.vue',  // 临时禁用对 Vue 组件的校验
		'*.js',  // 临时禁用对 JS 文件的校验
	],
}
