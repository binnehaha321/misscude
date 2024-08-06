import React, { lazy, useRef } from 'react'
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'

import { ICheckinData, Image } from '../../../types'
import { formatDate } from '../../../utils/date'

const PostGallery = lazy(() => import('../PostGallery/PostGallery'))
const SubActions = lazy(() => import('./SubActions'))
const Comment = lazy(() => import('./Comment'))
const CarouselModal = lazy(
	() => import('../../common/CarouselModal/CarouselModal')
)
const MoreOptions = lazy(() => import('../MoreOptions'))

const SinglePost: React.FC<ICheckinData> = ({
	createdBy,
	date,
	location,
	title,
	images,
	_id
}) => {
	const commentRef = useRef<HTMLTextAreaElement | null>(null)

	return (
		<Paper
			elevation={6}
			sx={{ width: '100%', maxWidth: 680, p: 3, mx: 'auto' }}
			square={false}
		>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
			>
				<Stack
					direction='row'
					gap={1}
					alignItems='center'
				>
					<Box>
						<Avatar>{createdBy.slice(0, 1).toUpperCase()}</Avatar>
					</Box>
					<Stack direction='column'>
						<Typography variant='h6'>{createdBy}</Typography>
						<Typography
							variant='body2'
							color='#aaa'
						>{`${formatDate(date)} • ${location}`}</Typography>
					</Stack>
				</Stack>
				<MoreOptions postId={_id as string} />
			</Stack>
			<Typography
				variant='h5'
				lineHeight={2.5}
			>
				{title}
			</Typography>
			<Stack
				direction='row'
				columnGap={1}
				mt={1}
			>
				<PostGallery images={images as Image[]} />
			</Stack>
			<SubActions
				inputRef={commentRef as React.MutableRefObject<HTMLTextAreaElement>}
				postId={_id as string}
			/>
			<Comment ref={commentRef} />
			<CarouselModal />
		</Paper>
	)
}

export default SinglePost
