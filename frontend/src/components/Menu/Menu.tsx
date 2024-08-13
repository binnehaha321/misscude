import { Drawer } from '@mui/material'

import { useApp } from '@context/AppContext'
import MenuList from './MenuList'

const Menu = () => {
	const { isSidebarOpen, closeSidebar } = useApp()

	return (
		<Drawer
			open={isSidebarOpen}
			onClose={closeSidebar}
		>
			<MenuList />
		</Drawer>
	)
}

export default Menu
