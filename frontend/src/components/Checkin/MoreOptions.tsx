import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Fade, IconButton, Menu, MenuItem } from '@mui/material'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { MUIIconProps } from '@types'

interface IMenuItem {
	text: string
	icon: MUIIconProps
	action: () => void
}

const MoreOptions = ({ postId }: { postId: string }) => {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const MENU_ITEMS: IMenuItem[] = useMemo(
		() => [
			{
				text: 'Xem post',
				icon: InfoIcon,
				action: () => navigate(`/post/${postId}`)
			},
			{
				text: 'Chỉnh sửa',
				icon: EditIcon,
				action: () => navigate(`/post/${postId}/edit`)
			},
			{
				text: 'Xóa post',
				icon: DeleteIcon,
				action: () => navigate(`/post/${postId}/delete`)
			}
		],
		[navigate, postId]
	)

	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<IconButton onClick={handleClick}>
				<MoreHorizRoundedIcon />
			</IconButton>
			<Menu
				MenuListProps={{
					'aria-labelledby': 'more-options'
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				{MENU_ITEMS.map(({ text, icon, action }, index) => {
					const Icon = icon
					return (
						<MenuItem
							key={index}
							onClick={action}
						>
							<Icon sx={{ mr: 1 }} />
							{text}
						</MenuItem>
					)
				})}
			</Menu>
		</>
	)
}

export default MoreOptions
