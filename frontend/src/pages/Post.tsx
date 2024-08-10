import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { useSinglePost } from '../hooks/usePost'

import { SinglePost } from '../components/Checkin/SinglePost'
import NotFound from '../components/NotFound'
import { SinglePostSkeleton } from '../components/common/Skeleton'

const Post = () => {
	const { id } = useParams()
	const { post, isLoading } = useSinglePost(id as string)

	if (isLoading) return <SinglePostSkeleton />
	if (!id || !post) return <NotFound />

	return (
		<Box
			py={3}
			bgcolor='#eee'
			minHeight='100dvh'
		>
			<SinglePost {...post} />
		</Box>
	)
}

export default Post
