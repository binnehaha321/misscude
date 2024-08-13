import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { localStore } from '@utils/localStorage'

const PublicLayout = ({ children }: React.PropsWithChildren) => {
	const accessToken = localStore.get('accessToken')
	const navigate = useNavigate()

	useEffect(() => {
		if (accessToken) navigate('/')
	}, [accessToken, navigate])

	return children
}

export default PublicLayout
