import { Person, PostAdd, Logout } from '@mui/icons-material'

import { IMenuItem } from '../types'

export const menuItems: IMenuItem[] = [
	{
		text: 'Thông tin cá nhân',
		icon: Person
	},
	{
		text: 'Bài đăng',
		icon: PostAdd
	},
	{ text: 'Đăng xuất', icon: Logout }
]
