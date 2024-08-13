import { memo } from 'react'
import { Box, BoxProps, IconButton } from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import CloseIcon from '@mui/icons-material/Close'

const NextSlide: React.FC<BoxProps> = memo((props) => (
	<Box {...props}>
		<IconButton
			sx={[
				{
					bgcolor: '#ddd'
				},
				{
					'&:hover': {
						bgcolor: '#ddd'
					}
				}
			]}
			size='large'
			color='info'
			aria-label='Ảnh sau'
		>
			<ArrowForwardIosRoundedIcon />
		</IconButton>
	</Box>
))

const PrevSlide: React.FC<BoxProps> = memo((props) => (
	<Box {...props}>
		<IconButton
			sx={[
				{
					bgcolor: '#ddd'
				},
				{
					'&:hover': {
						bgcolor: '#ddd'
					}
				}
			]}
			size='large'
			color='info'
			aria-label='Ảnh trước'
		>
			<ArrowBackIosNewRoundedIcon />
		</IconButton>
	</Box>
))

const CloseSlide: React.FC<BoxProps> = memo((props) => (
	<Box
		{...props}
		bgcolor='#d6d6d6'
	>
		<IconButton
			size='large'
			color='error'
			aria-label='Đóng ảnh'
		>
			<CloseIcon />
		</IconButton>
	</Box>
))

export { NextSlide, PrevSlide, CloseSlide }
