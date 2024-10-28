import httpRequest from '@config/httpRequest'
import { ICheckinData } from '@types'

export const getPosts = async (page: number) => {
	const res = await httpRequest(
		`${import.meta.env.VITE_API_BASE_URL}/post?page=${page}`
	)

	if (res.status !== 200) {
		throw new Error(`Error ${res.status}: ${res.statusText}`)
	}

	const data = (await res.data) as ICheckinData[]

	return data
}

export const getPostById = async (id: string) => {
	const res = await httpRequest(`/post/${id}`)

	if (res.status !== 200) {
		throw new Error(`Error ${res.status}: ${res.statusText}`)
	}

	const data = (await res.data) as ICheckinData

	return data
}

export const likePost = async ({
	postId,
	userId
}: {
	postId: string
	userId: string
}) => {
	const res = await httpRequest('post/like', {
		method: 'POST',
		data: {
			postId,
			userId
		}
	})

	if (res.status !== 200) {
		throw new Error(`Error ${res.status}: ${res.statusText}`)
	}

	const data = (await res.data) as ICheckinData

	return data
}

export const unLikePost = async ({
	postId,
	userId
}: {
	postId: string
	userId: string
}) => {
	const res = await httpRequest('post/unlike', {
		method: 'POST',
		data: {
			postId,
			userId
		}
	})

	if (res.status !== 200) {
		throw new Error(`Error ${res.status}: ${res.statusText}`)
	}

	const data = (await res.data) as ICheckinData

	return data
}
