import { Button, Stack, Typography } from '@mui/material'
import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined'
import PostAddIcon from '@mui/icons-material/PostAdd'

import { usePost } from '../../context/PostContext'

const NoData = () => {
	const { openNewPostModal } = usePost()

	return (
		<Stack
			direction='column'
			justifyContent='center'
			alignItems='center'
			rowGap={3}
			mt={3}
		>
			<Typography
				variant='h4'
				fontWeight={600}
			>
				Buồn quá... chưa có post nào 😭
			</Typography>
			<FolderOffOutlinedIcon sx={{ fontSize: 60 }} />
			<Button
				startIcon={<PostAddIcon />}
				onClick={openNewPostModal}
				variant='outlined'
				color='info'
				size='large'
			>
				Post ngay và luôn
			</Button>
		</Stack>
	)
}

export default NoData
