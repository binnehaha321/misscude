import { useMemo } from 'react'
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material'
import { menuItems } from '../../config/menu.ts'
import { Link } from 'react-router-dom'

const MenuList = () => {
	const topItems = useMemo(() => menuItems.slice(0, -1), [])
	const bottomItems = useMemo(() => menuItems[menuItems.length - 1], [])
	const BottomItemIcon = useMemo(() => {
		return bottomItems.icon
	}, [bottomItems.icon])

	return (
		<Box
			sx={{ width: 250 }}
			role='presentation'
		>
			<List>
				{topItems.map((item, index) => {
					const Icon = item.icon
					return (
						<Link
							to={item.path}
							key={index}
						>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<Icon />
									</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
						</Link>
					)
				})}
			</List>
			<Divider />
			<Link to={bottomItems.path}>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<BottomItemIcon />
						</ListItemIcon>
						<ListItemText primary={bottomItems.text} />
					</ListItemButton>
				</ListItem>
			</Link>
		</Box>
	)
}

export default MenuList
