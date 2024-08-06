import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import httpRequest from '../config/httpRequest'
import { useToast } from '../context/ToastContext'
import { SignUpValueProps } from '../types'

export const useSignup = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const { openToast } = useToast()

	const onSignUp = async (values: SignUpValueProps) => {
		setIsLoading(true)
		try {
			const res = await httpRequest.post('user', values)
			if (res.status !== 200) {
				openToast({
					message: res.data.message,
					status: 'error'
				})
			}

			openToast({
				message: 'Tạo tài khoản thành công',
				status: 'success'
			})
			navigate('/sign-in')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				// Type guard for AxiosError
				openToast({ message: error.response?.data?.message, status: 'error' })
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
		isLoading,
		onSignUp
	}
}
