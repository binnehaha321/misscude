import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { useSinglePost } from '../hooks/usePost'

import { SinglePost } from '../components/Checkin/SinglePost'

const Post = () => {
	const { id } = useParams()
	const { post } = useSinglePost(id as string)

	if (!id || !post) return null
	return (
		<Box
			py={3}
			bgcolor='#eee'
		>
			<SinglePost {...post} />
		</Box>
	)
}

export default Post
