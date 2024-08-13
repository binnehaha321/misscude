import { Home, PostAdd, ThumbUp, Draw } from '@mui/icons-material'

import { IMenuItem } from '@types'

export const menuItems: IMenuItem[] = [
	{
		text: 'Trang chủ',
		icon: Home,
		path: '/'
	},
	{
		text: 'Bài đăng của tui',
		icon: PostAdd,
		path: '/me/posts'
	},
	{
		text: 'Yêu thích',
		icon: ThumbUp,
		path: '/me/favorites'
	},
	{ text: 'Custome ảnh', icon: Draw, path: '' }
]
