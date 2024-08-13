import { lazy, Suspense, useCallback, useRef } from 'react'
import { Stack } from '@mui/material'

import { useAllPosts } from '@hooks/usePost'

import { SinglePostSkeleton } from '@common/Skeleton'
import ErrorText from '@common/ErrorText'
import NoData from '@common/NoData'
const SinglePost = lazy(() =>
	import('./SinglePost/SinglePost').catch(() => ({
		default: () => <ErrorText text='Không thể tải các post 🥺' />
	}))
)

const Checkin = () => {
	const observer = useRef<IntersectionObserver | null>(null)
	const {
		posts,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = useAllPosts()

	const lastPostRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLoading || isFetchingNextPage) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(
				async ([target]) => {
					if (target.isIntersecting && hasNextPage) {
						await fetchNextPage()
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
		[isLoading, fetchNextPage, hasNextPage, isFetchingNextPage]
	)

	if (isLoading) {
		return <SinglePostSkeleton />
	}

	if (error) {
		return <ErrorText text='Có lỗi xảy ra khi tải các chuyến đi' />
	}

	if (!posts?.length) return <NoData />

	return (
		<>
			<Stack
				height='100%'
				minHeight='100dvh'
				bgcolor='#dcdcdc'
				rowGap={2}
				py={!posts?.length ? 0 : 2}
				direction='column'
			>
				{posts.map((post, index) => (
					<Suspense
						fallback={<SinglePostSkeleton />}
						key={index}
					>
						<SinglePost {...post} />
					</Suspense>
				))}
			</Stack>
			<div ref={lastPostRef} />
		</>
	)
}
export default Checkin
