import { memo, useCallback, useMemo, useState } from 'react'
import { Button, Stack } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

import { copyToClipboard } from '@utils/copyToClipboard'
import { useToast } from '@context/ToastContext'
import { likePost, unLikePost } from '@data/post'
import { parseJwt } from '@utils/parseJwt'
import { useLocalStorage } from '@hooks/useLocalStorage'

const SubActions = ({
	inputRef,
	postId,
	likeBy
}: {
	inputRef: React.MutableRefObject<HTMLTextAreaElement> | null
	postId: string
	likeBy?: string[]
}) => {
	const { getItem } = useLocalStorage()
	const { openToast } = useToast()
	const userId = useMemo(() => {
		const jwtToken = getItem('accessToken')
		const parsedJwtToken = parseJwt(jwtToken)
		const userId = parsedJwtToken._id
		return userId
	}, [])

	const [like, setLike] = useState(likeBy?.includes(userId))

	const focusComment = useCallback(() => {
		if (!inputRef?.current) return
		inputRef.current.focus()
	}, [inputRef])

	const sharePost = useCallback(async () => {
		const postLink = `${import.meta.env.VITE_HOSTNAME}/post/${postId}`
		if (!postId) return

		await copyToClipboard(postLink)
		openToast({
			status: 'success',
			message: 'Đã sao chép liên kết'
		})
	}, [postId, openToast])

	const handleLikePost = useCallback(async () => {
		if (like) {
			await unLikePost({
				postId,
				userId
			})
			setLike(false)
		} else {
			await likePost({
				postId,
				userId
			})
			setLike(true)
		}
	}, [postId])

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
				onClick={handleLikePost}
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
