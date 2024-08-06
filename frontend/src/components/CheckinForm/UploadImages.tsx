import React, { forwardRef, memo } from 'react'
import { Button, styled } from '@mui/material'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1
})

type Props = React.ComponentPropsWithRef<'input'>

const UploadImages = forwardRef<HTMLInputElement, Props>((props, ref) => {
	return (
		<Button
			component='label'
			role={undefined}
			tabIndex={-1}
			title='Tải hình ảnh lên'
		>
			<AddPhotoAlternateOutlinedIcon />
			<VisuallyHiddenInput
				type='file'
				multiple
				accept='image/*'
				ref={ref}
				{...props}
			/>
		</Button>
	)
})

export default memo(UploadImages)
