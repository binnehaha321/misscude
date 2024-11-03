import { memo, useCallback, useMemo, useState } from 'react'
import { Button, Stack } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

import { useLocalStorage } from '@hooks/useLocalStorage'
import { copyToClipboard } from '@utils/copyToClipboard'
import { parseJwt } from '@utils/parseJwt'
import { useToast } from '@context/ToastContext'
import { likePost, unLikePost } from '@data/post'

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
		return parsedJwtToken._id
	}, [getItem])

	const [like, setLike] = useState({
		postId,
		liked: likeBy?.includes(userId) || false
	})

	const focusComment = useCallback(() => {
		inputRef?.current?.focus()
	}, [inputRef])

	const sharePost = useCallback(async () => {
		if (!postId) return

		const postLink = `${import.meta.env.VITE_HOSTNAME}/post/${postId}`
		await copyToClipboard(postLink)
		openToast({
			status: 'success',
			message: 'Đã sao chép liên kết'
		})
	}, [postId, openToast])

	const handleLikePost = useCallback(async () => {
		const updatedLikeStatus = !like.liked
		setLike((prevPost) => ({ ...prevPost, liked: updatedLikeStatus }))
		await (updatedLikeStatus ? likePost : unLikePost)({ postId, userId })
	}, [postId, userId, like.liked])

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
				color={like.liked ? 'primary' : 'inherit'}
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
