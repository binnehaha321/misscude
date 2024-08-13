import { memo, useCallback, useState } from 'react'
import { Button, Stack } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

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
	const [like, setLike] = useState(false)

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

	const likePost = () => {
		setLike((isLike) => !isLike)
	}

	return (
		<Stack
			sx={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				borderTop: '1px solid #eee',
				borderBottom: '1px solid #eee',
				paddingBlock: 0.5,
				marginInline: { xs: 1, sm: 2 },
				marginBlock: 1
			}}
		>
			<Button
				sx={{ width: '100%' }}
				startIcon={<ThumbUpIcon />}
				onClick={likePost}
				color={like ? 'primary' : 'inherit'}
			>
				Mê nha
			</Button>
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
