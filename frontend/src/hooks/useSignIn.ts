import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { IUser } from '../types'
import httpRequest from '../config/httpRequest'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { localStore } from '../utils/localStorage'

export const useSignIn = () => {
	const [data, setData] = useState<Partial<IUser>>({})
	const [isLoading, setIsLoading] = useState(false)
	const { openToast, resetToast } = useToast()
	const { setIsAuth } = useAuth()
	const navigate = useNavigate()

	const onSignIn = async ({ username, password }: Partial<IUser>) => {
		setIsLoading(true)
		resetToast() // Clear previous error

		try {
			const res = await httpRequest.post('/sign-in', {
				username,
				password
			})

			if (res.status !== 200) {
				openToast({
					message: res.data,
					status: 'error'
				})
			} else {
				const accessToken = res?.data?.accessToken
				const refreshToken = res?.data?.refreshToken
				setIsAuth(accessToken, refreshToken)
				setData(res?.data as Partial<IUser>)

				// store user to local storage
				localStore.set('user', {
					username: res?.data?.data?.username,
					email: res?.data?.data?.email,
					avatar: res?.data?.data?.avatar || ''
				})
				navigate('/')
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				// Type guard for AxiosError
				openToast({ message: error.response?.data?.data, status: 'error' })
			} else {
				openToast({
					message: 'Có lỗi gì lạ lắm',
					status: 'error'
				})
			}
		} finally {
			setIsLoading(false)
		}
	}

	return {
		data,
		isLoading,
		onSignIn
	}
}
