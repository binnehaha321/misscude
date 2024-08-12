import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { LoadingButton } from '@mui/lab'

import { useDeletePost } from '@hooks/usePost'

const PostDelete = () => {
	const { id } = useParams()
	const [open, setOpen] = useState(true)
	const navigate = useNavigate()
	const { deletePost, isLoading } = useDeletePost()

	const handleClose = useCallback(() => {
		setOpen(false)
		navigate('/')
	}, [navigate])

	const handleDelete = useCallback(async () => {
		if (!id) return
		await deletePost(id)
		handleClose()
	}, [id, deletePost, handleClose])

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle>Định xóa post này luôn hả 😩</DialogTitle>
			<DialogContent>
				<DialogContentText>See you never 🥺</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					variant='outlined'
					onClick={handleClose}
				>
					Thôi... không xóa
				</Button>
				<LoadingButton
					loading={isLoading}
					variant='contained'
					color='error'
					onClick={handleDelete}
					autoFocus
				>
					Xóa luôn!
				</LoadingButton>
			</DialogActions>
		</Dialog>
	)
}

export default PostDelete
