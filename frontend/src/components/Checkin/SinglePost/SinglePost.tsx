import React, { lazy, useRef } from 'react'
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'

import { ICheckinData, Image } from '@types'
import { formatDate } from '@utils/date'

import { CarouselModal } from '@common/CarouselModal'
const PostGallery = lazy(() => import('../PostGallery/PostGallery'))
const SubActions = lazy(() => import('./SubActions'))
const Comment = lazy(() => import('./Comment'))
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
			sx={{
				width: '100%',
				maxWidth: 680,
				mx: 'auto',
				my: 2,
				display: 'flex',
				flexDirection: 'column'
			}}
			square={false}
		>
			<Stack
				pb={0}
				sx={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					margin: { xs: 1, sm: 2 },
					mb: 0
				}}
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
				<MoreOptions postId={_id!} />
			</Stack>
			<Typography
				variant='h5'
				className='text-balance'
				sx={{
					lineHeight: 2,
					marginInline: { xs: 1, sm: 2 },
					marginBottom: { xs: 0, sm: 1 }
				}}
			>
				{title}
			</Typography>
			<Stack
				direction='row'
				columnGap={1}
				bgcolor='#efefef'
			>
				<PostGallery images={images as Image[]} />
			</Stack>
			<SubActions
				inputRef={commentRef as React.MutableRefObject<HTMLTextAreaElement>}
				postId={_id!}
			/>
			<Comment ref={commentRef} />
			<CarouselModal />
		</Paper>
	)
}

export default SinglePost
