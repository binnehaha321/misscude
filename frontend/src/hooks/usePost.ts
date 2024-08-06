import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { ICheckinData } from '../types'
import { getPostById, getPosts } from '../helpers/post'
import httpRequest from '../config/httpRequest'
import { useToast } from '../context/ToastContext'

export const useNewPost = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { openToast } = useToast()

	const addNewPost = async (postData: FormData) => {
		setIsLoading(true)

		try {
			const res = await httpRequest.post(
				`${import.meta.env.VITE_API_BASE_URL}/post`,
				postData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)

			if (res.status === 201) {
				const response = (await res.data) as ICheckinData
				return { data: response, status: res.status }
			}
			openToast({
				message: 'Có lỗi, vui lòng thử lại',
				status: 'error'
			})
		} catch (error) {
			if (axios.isAxiosError(error)) {
				openToast({
					message: error?.response?.data?.message || 'Lỗi không xác định',
					status: 'error'
				})
			}
		} finally {
			setIsLoading(false)
		}
	}

	return { addNewPost, isLoading }
}

export const useAllPosts = () => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
		staleTime: 10000,
		retryDelay: 1000,
		retry: 3
	})

	return { isLoading, error, posts: data, refetch }
}

export const useSinglePost = (id: string) => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['post', id],
		queryFn: () => getPostById(id),
		enabled: !!id,
		staleTime: 10000,
		retryDelay: 1000,
		retry: 3
	})

	return { isLoading, error, post: data, refetch }
}
