import httpRequest from '../config/httpRequest'
import { ICheckinData } from '../types'

export const getPosts = async () => {
	const res = await httpRequest(`${import.meta.env.VITE_API_BASE_URL}/post`)

	if (res.status !== 200) {
		throw new Error(`Error ${res.status}: ${res.statusText}`)
	}

	const data = (await res.data) as ICheckinData[]

	return data
}

export const getPostById = async (id: string) => {
	const res = await httpRequest(
		`${import.meta.env.VITE_API_BASE_URL}/post/${id}`
	)

	if (res.status !== 200) {
		throw new Error(`Error ${res.status}: ${res.statusText}`)
	}

	const data = (await res.data) as ICheckinData

	return data
}
