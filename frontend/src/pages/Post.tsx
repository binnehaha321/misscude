import { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { useSinglePost } from '@hooks/usePost'

const SinglePost = lazy(
	() => import('@components/Checkin/SinglePost/SinglePost')
)
import NotFound from '@components/NotFound'
import { SinglePostSkeleton } from '@components/common/Skeleton'

const Post = () => {
	const { id } = useParams()
	const { post, isLoading } = useSinglePost(id ?? '')

	if (isLoading)
		return (
			<Box
				py={3}
				bgcolor='#eee'
				minHeight='100dvh'
			>
				<SinglePostSkeleton />
			</Box>
		)
	if (!id || !post) return <NotFound />

	return (
		<Box
			py={3}
			bgcolor='#eee'
			minHeight='100dvh'
		>
			<Suspense fallback={<SinglePostSkeleton />}>
				<SinglePost {...post} />
			</Suspense>
		</Box>
	)
}

export default Post
