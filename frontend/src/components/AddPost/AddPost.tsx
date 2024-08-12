import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { usePost } from '@context/PostContext'

import styles from './style.module.css'

const AddPost = () => {
	const { isOpenNewPostModal, openNewPostModal } = usePost()

	return (
		<Box
			position='fixed'
			bottom={10}
			right={10}
			zIndex={1}
		>
			<Fab
				color='primary'
				aria-label='add-post'
				title='Checkin mới'
				onClick={openNewPostModal}
				className={styles.addBtn}
				variant='extended'
				size='medium'
			>
				<AddIcon
					sx={{
						transform: `rotate(${isOpenNewPostModal ? 45 : 0}deg)`,
						transition: 'transform 250ms ease-in-out'
					}}
				/>
				Check in
			</Fab>
		</Box>
	)
}

export default AddPost
