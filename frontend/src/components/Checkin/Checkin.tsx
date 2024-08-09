import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { Stack } from '@mui/material'

import { useAllPosts } from '../../hooks/usePost'

import { SinglePostSkeleton } from '../common/Skeleton'
import ErrorText from '../common/ErrorText'
const SinglePost = lazy(() =>
	import('./SinglePost/SinglePost').catch(() => ({
		default: () => <ErrorText text='Không thể tải các post 🥺' />
	}))
)

const Checkin = () => {
	const observer = useRef<IntersectionObserver | null>(null)
	const [page, setPage] = useState(1)
	const { posts, isLoading, error } = useAllPosts(page)

	const lastPostRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLoading) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(
				([target]) => {
					if (target.isIntersecting) {
						setPage((prevPageNumber) => prevPageNumber + 1)
					}
				},
				{
					threshold: 1,
					rootMargin: '300px'
				}
			)
			if (node) {
				observer.current.observe(node)
			}
		},
		[isLoading]
	)

	if (isLoading) {
		return <SinglePostSkeleton />
	}

	if (error) {
		return <ErrorText text='Có lỗi xảy ra khi tải các chuyến đi' />
	}

	return (
		<>
			<Stack direction='column'>
				<Stack
					bgcolor='#dcdcdc'
					rowGap={2}
					py={!posts?.length ? 0 : 2}
				>
					{posts?.map((post, index) => (
						<Suspense
							fallback={<SinglePostSkeleton />}
							key={index}
						>
							<SinglePost {...post} />
						</Suspense>
					))}
				</Stack>
			</Stack>
			<div ref={lastPostRef} />
		</>
	)
}
export default Checkin
