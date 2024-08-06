import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { localStore } from '../utils/localStorage'
import Navbar from '../components/common/Navbar'

const ProtectedLayout = ({ children }: React.PropsWithChildren) => {
	const accessToken = localStore.get('accessToken')
	const navigate = useNavigate()

	useEffect(() => {
		if (!accessToken) navigate('/sign-in')
	}, [accessToken, navigate])

	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

export default ProtectedLayout
