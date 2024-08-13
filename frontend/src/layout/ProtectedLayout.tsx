import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { localStore } from '@utils/localStorage'
import { useApp } from '@context/AppContext'

import Navbar from '@components/common/Navbar'
import Menu from '@components/Menu/Menu'

const ProtectedLayout = () => {
	const accessToken = localStore.get('accessToken')
	const navigate = useNavigate()

	const { openSidebar } = useApp()

	useEffect(() => {
		if (!accessToken) navigate('/sign-in')
	}, [accessToken, navigate])

	return (
		<>
			<Navbar toggleOpenMenu={openSidebar} />
			<Menu />
			<Outlet />
		</>
	)
}

export default ProtectedLayout
