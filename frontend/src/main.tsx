import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { theme } from '@config/theme.ts'
import { router } from '@config/routes.tsx'
import PostProvider from '@context/PostContext.tsx'
import ToastProvider from '@context/ToastContext.tsx'
import AuthProvider from '@context/AuthContext.tsx'
import AppProvider from '@context/AppContext'

import '@fontsource/be-vietnam-pro/300.css'
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/500.css'
import '@fontsource/be-vietnam-pro/700.css'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<AppProvider>
					<AuthProvider>
						<ToastProvider>
							<PostProvider>
								<RouterProvider router={router} />
							</PostProvider>
						</ToastProvider>
					</AuthProvider>
				</AppProvider>
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
)
