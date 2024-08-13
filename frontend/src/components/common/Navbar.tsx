import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AccountCircle } from '@mui/icons-material'

import { logout } from '@utils/auth'

const Navbar = ({
	toggleOpenMenu
}: {
	toggleOpenMenu: (open: boolean) => void
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<AppBar
			position='sticky'
			color='default'
			enableColorOnDark
			sx={{ zIndex: 5 }}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<IconButton
					size='large'
					edge='end'
					color='inherit'
					aria-label='menu'
					sx={{ mr: 2 }}
					onClick={() => toggleOpenMenu(true)}
				>
					<MenuIcon />
				</IconButton>
				<div>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						onClick={handleMenu}
						color='inherit'
					>
						<AccountCircle />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>
							<Link to='/me'>Thông tin cá nhân</Link>
						</MenuItem>
						<MenuItem onClick={logout}>Đăng xuất</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
