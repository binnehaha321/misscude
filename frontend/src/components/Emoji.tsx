import { forwardRef } from 'react'
import { Box, BoxProps } from '@mui/material'
import EmojiPicker, { PickerProps } from 'emoji-picker-react'

const Emoji = forwardRef<BoxProps, PickerProps>((props, ref) => {
	return (
		<Box
			ref={ref}
			position='absolute'
			top='50%'
			left='50%'
			zIndex={1}
			sx={{ transform: 'translateX(-50%)' }}
		>
			<EmojiPicker
				height={300}
				{...props}
			/>
		</Box>
	)
})

export default Emoji
