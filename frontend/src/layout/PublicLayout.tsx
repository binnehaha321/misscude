import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { localStore } from '../utils/localStorage'

const PublicLayout = () => {
	const accessToken = localStore.get('accessToken')
	const navigate = useNavigate()

	useEffect(() => {
		if (accessToken) navigate('/')
	}, [accessToken, navigate])

	return <Outlet />
}

export default PublicLayout
