import React, { forwardRef, lazy, Suspense, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import SendRoundedIcon from '@mui/icons-material/SendRounded'

const Textarea = lazy(() => import('@common/Textarea/Textarea'))

type Props = React.ComponentPropsWithRef<'textarea'>

const Comment = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
	const [comment, setComment] = useState('')

	return (
		<Box
			sx={{
				border: '1px solid #eee',
				borderRadius: 1,
				bgcolor: '#eee',
				position: 'relative',
				margin: { xs: 1, sm: 2 },
				marginTop: '0!important',
				padding: 1
			}}
		>
			<Suspense fallback={<p>Loading...</p>}>
				<Textarea
					{...props}
					ref={ref}
					placeholder='Nhập bình luận ...'
					rows={2}
					value={comment}
					onChange={(e) => setComment(e.currentTarget.value)}
				/>
			</Suspense>
			{comment.trim() && (
				<IconButton
					sx={{ position: 'absolute', right: 6, bottom: 6 }}
					color='primary'
				>
					<SendRoundedIcon />
				</IconButton>
			)}
		</Box>
	)
})

export default Comment
