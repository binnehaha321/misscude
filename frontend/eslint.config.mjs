// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		files: ['**/*.js'],
		...tseslint.configs.disableTypeChecked
	},
	{
		rules: {
			'@typescript-eslint/no-misused-promises': 0,
			'@typescript-eslint/no-unsafe-assignment': 0,
			'@typescript-eslint/no-unsafe-member-access': 0,
			'@typescript-eslint/no-unsafe-argument': 0,
			'@typescript-eslint/prefer-nullish-coalescing': 0,
			'@typescript-eslint/no-redundant-type-constituents': 0,
			'@typescript-eslint/no-unsafe-call': 0,
			'@typescript-eslint/no-explicit-any': 0,
			'@typescript-eslint/no-unnecessary-type-assertion': 0,
			'@typescript-eslint/no-unsafe-return': 0,
			'@typescript-eslint/prefer-promise-reject-errors': 0
		}
	}
)
