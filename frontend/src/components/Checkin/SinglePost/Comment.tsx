import React, { forwardRef, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import SendRoundedIcon from '@mui/icons-material/SendRounded'

import { Textarea } from '../../common/Textarea'

type Props = React.ComponentPropsWithRef<'textarea'>

const Comment = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
	const [comment, setComment] = useState('')

	return (
		<Box
			border='1px solid #eee'
			borderRadius={2}
			p={1}
			bgcolor='#eee'
			position='relative'
		>
			<Textarea
				{...props}
				ref={ref}
				placeholder='Nhập bình luận ...'
				rows={2}
				value={comment}
				onChange={(e) => setComment(e.currentTarget.value)}
			/>
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
