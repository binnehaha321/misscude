import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { localStore } from '../utils/localStorage'
import Navbar from '../components/common/Navbar'
import Menu from '../components/Menu/Menu'

const ProtectedLayout = () => {
	const accessToken = localStore.get('accessToken')
	const navigate = useNavigate()
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		if (!accessToken) navigate('/sign-in')
	}, [accessToken, navigate])

	return (
		<>
			<Navbar toggleOpenMenu={() => setMenuOpen(true)} />
			<Menu
				open={menuOpen}
				onCloseMenu={() => setMenuOpen(false)}
			/>
			<Outlet />
		</>
	)
}

export default ProtectedLayout
