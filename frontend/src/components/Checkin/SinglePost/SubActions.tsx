import { memo, useCallback } from 'react'
import { Button, Stack } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'

import { copyToClipboard } from '@utils/copyToClipboard'
import { useToast } from '@context/ToastContext'

const SubActions = ({
	inputRef,
	postId
}: {
	inputRef: React.MutableRefObject<HTMLTextAreaElement> | null
	postId: string
}) => {
	const { openToast } = useToast()

	const focusComment = useCallback(() => {
		if (!inputRef?.current) return
		inputRef.current.focus()
	}, [inputRef])

	const sharePost = useCallback(async () => {
		const postLink = `${import.meta.env.VITE_HOSTNAME}/post/${postId}`
		if (postId) {
			await copyToClipboard(postLink)
			openToast({
				status: 'success',
				message: 'Đã sao chép liên kết'
			})
		} else {
			return
		}
	}, [postId, openToast])

	return (
		<Stack
			direction='row'
			justifyContent='space-evenly'
			borderTop='1px solid #eee'
			borderBottom='1px solid #eee'
			py={0.5}
			my={1.5}
			mx={3}
		>
			<Button
				sx={{ width: '100%' }}
				startIcon={<CommentIcon />}
				onClick={focusComment}
			>
				Bình luận
			</Button>
			<Button
				sx={{ width: '100%' }}
				startIcon={<ShareIcon />}
				onClick={sharePost}
			>
				Chia sẻ
			</Button>
		</Stack>
	)
}

export default memo(SubActions)
