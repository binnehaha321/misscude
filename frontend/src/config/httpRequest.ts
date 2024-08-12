import axios from 'axios'
import { localStore } from '@utils/localStorage'
import { logout } from '@utils/auth'

const httpRequest = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 30000
})

httpRequest.defaults.headers.common['Content-Type'] = 'application/json'

// Add a request interceptor
httpRequest.interceptors.request.use(
	(config) => {
		const controller = new AbortController()
		const token = localStore.get('accessToken')
		if (!token) {
			controller.abort()
			return config
		}
		config.headers.Authorization = `Bearer ${token}`
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(new Error(JSON.stringify(error)))
	}
)

// Add a response interceptor
httpRequest.interceptors.response.use(
	(response) => response,
	async (error) => {
		const errorStatus = error.response.status
		const originalRequest = error.config
		const rfToken = localStore.get('refreshToken')

		// if ([401, 404, 407].includes(errorStatus)) {
		// 	logout()
		// }

		if (errorStatus === 403 && !originalRequest._retry) {
			originalRequest._retry = true // Mark the request as retried to avoid infinite loops
			try {
				const response = await httpRequest.post('/verify-refresh-token', {
					refreshToken: rfToken
				})
				const { accessToken, refreshToken } = response.data

				localStore.set('accessToken', String(accessToken))
				localStore.set('refreshToken', String(refreshToken))

				// Retry the original request with the new token
				error.config.headers.Authorization = `Bearer ${accessToken}`
				return httpRequest.request(error.config)
			} catch (error) {
				console.log('interceptor error >>', error)
				// Handle refresh token error or redirect to login
				logout()
			}
		}

		return Promise.reject(new Error(JSON.stringify(error)))
	}
)

export default httpRequest
