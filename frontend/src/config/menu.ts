import { Person, PostAdd, Logout } from '@mui/icons-material'

import { IMenuItem } from '../types'

export const menuItems: IMenuItem[] = [
	{
		text: 'Thông tin cá nhân',
		icon: Person,
		path: '/me'
	},
	{
		text: 'Bài đăng của tui',
		icon: PostAdd,
		path: '/me/posts'
	},
	{ text: 'Đăng xuất', icon: Logout, path: '/logout' }
]
