import { Drawer } from '@mui/material'

import MenuList from './MenuList'

interface MenuProps {
	onCloseMenu: (open: boolean) => void
	open: boolean
}

const Menu: React.FC<MenuProps> = ({ open, onCloseMenu }) => {
	return (
		<Drawer
			open={open}
			onClose={onCloseMenu}
		>
			<MenuList />
		</Drawer>
	)
}

export default Menu
