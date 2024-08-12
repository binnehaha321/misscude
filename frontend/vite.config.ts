import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@pages': path.resolve(__dirname, './src/pages'),
			'@layout': path.resolve(__dirname, './src/layout'),
			'@components': path.resolve(__dirname, './src/components'),
			'@common': path.resolve(__dirname, './src/components/common'),
			'@types': `${path.resolve(__dirname, './src/types/index.ts')}`,
			'@hooks': `${path.resolve(__dirname, './src/hooks')}`,
			'@utils': `${path.resolve(__dirname, './src/utils')}`,
			'@config': `${path.resolve(__dirname, './src/config')}`,
			'@context': `${path.resolve(__dirname, './src/context')}`,
			'@constants': `${path.resolve(__dirname, './src/constants/index.ts')}`,
			'@helpers': `${path.resolve(__dirname, './src/helpers')}`,
			'@assets': `${path.resolve(__dirname, './src/assets')}`
		}
	},
	optimizeDeps: {
		exclude: ['js-big-decimal']
	}
})
