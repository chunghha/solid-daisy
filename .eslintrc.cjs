module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: '@antfu',
	plugins: ['solid', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
