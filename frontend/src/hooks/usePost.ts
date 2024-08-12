import { useState } from 'react'
import {
	useInfiniteQuery,
	useQuery,
	useQueryClient
} from '@tanstack/react-query'
import axios from 'axios'

import { ICheckinData } from '@types'
import { getPostById, getPosts } from '@helpers/post'
import httpRequest from '@config/httpRequest'
import { useToast } from '@context/ToastContext'
import { useAuth } from '@context/AuthContext'
import { useScroll } from './useScroll'

export const useNewPost = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { openToast } = useToast()
	const { scrollToTop } = useScroll()
	const queryClient = useQueryClient()

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
				const newPost = (await res.data) as ICheckinData

				// clear cache and refetch
				await queryClient.invalidateQueries({ queryKey: ['posts'] })

				scrollToTop()
				return { data: newPost, status: res.status }
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
	const LIMIT = 5
	const { token } = useAuth()

	const { data, ...props } = useInfiniteQuery({
		queryKey: ['posts'],
		initialPageParam: 1,
		queryFn: ({ pageParam }) => getPosts(pageParam),
		getNextPageParam: (lastPage, allPages) => {
			// Determine if there are more pages to load based on the data returned
			return lastPage.length === LIMIT ? allPages.length + 1 : undefined
		},
		staleTime: 10000,
		retryDelay: 1000,
		retry: 3,
		enabled: !!token
	})

	// Flatten the pages data into a single array
	const posts = data?.pages.flat() ?? []

	return { posts, ...props }
}

export const useSinglePost = (id: string) => {
	const { token } = useAuth()
	const { data, ...props } = useQuery({
		queryKey: ['post', id],
		queryFn: () => getPostById(id),
		enabled: !!id || !!token,
		staleTime: 10000,
		retryDelay: 1000,
		retry: 3
	})

	return { post: data, ...props }
}

export const useDeletePost = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { openToast } = useToast()
	const queryClient = useQueryClient()

	const deletePost = async (id: string) => {
		setIsLoading(true)
		try {
			const res = await httpRequest.delete(
				`${import.meta.env.VITE_API_BASE_URL}/post/${id}`
			)

			if (res.status === 200) {
				const deletedPost = await res.data
				console.log(deletePost)

				// clear cache and refetch
				await queryClient.invalidateQueries({ queryKey: ['posts'] })
				openToast({ message: deletedPost?.data?.message, status: 'success' })
				return { data: deletedPost, status: res.status }
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

	return {
		isLoading,
		deletePost
	}
}
