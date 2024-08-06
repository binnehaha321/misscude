import { lazy, Suspense } from 'react'
import { Stack, Typography } from '@mui/material'

import { useAllPosts } from '../../hooks/usePost'
const SinglePost = lazy(() =>
	import('./SinglePost/SinglePost').catch(() => ({
		default: () => <p>Không thể tải các post 🥺</p>
	}))
)

const Checkin = () => {
	const { posts, isLoading, error } = useAllPosts()

	if (isLoading) {
		return <Typography>Đang tải các chuyến đi...</Typography>
	}

	if (error) {
		return (
			<Typography>
				Có lỗi xảy ra khi tải các chuyến đi: {error.message}
			</Typography>
		)
	}
	return (
		<Stack direction='column'>
			<Stack
				bgcolor='#dcdcdc'
				rowGap={2}
				py={!posts?.length ? 0 : 2}
			>
				{posts?.map((post, index) => (
					<Suspense
						fallback={<p>Đang tải các post checkin...</p>}
						key={index}
					>
						<SinglePost {...post} />
					</Suspense>
				))}
			</Stack>
		</Stack>
	)
}

export default Checkin
