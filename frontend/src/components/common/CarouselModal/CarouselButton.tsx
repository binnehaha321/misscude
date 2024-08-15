import { memo } from 'react'
import { Box, BoxProps, IconButton } from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import CloseIcon from '@mui/icons-material/Close'

import { pinkPalette } from '@config/palette'

const NextSlide: React.FC<BoxProps> = memo((props) => (
	<Box {...props}>
		<IconButton
			sx={{
				bgcolor: pinkPalette.background.default,
				'&:hover': {
					bgcolor: pinkPalette.primary.contrastText
				}
			}}
			size='large'
			aria-label='Ảnh sau'
		>
			<ArrowForwardIosRoundedIcon />
		</IconButton>
	</Box>
))

const PrevSlide: React.FC<BoxProps> = memo((props) => (
	<Box {...props}>
		<IconButton
			sx={{
				bgcolor: pinkPalette.background.default,
				'&:hover': {
					bgcolor: pinkPalette.primary.contrastText
				}
			}}
			size='large'
			aria-label='Ảnh trước'
		>
			<ArrowBackIosNewRoundedIcon />
		</IconButton>
	</Box>
))

const CloseSlide: React.FC<BoxProps> = memo((props) => (
	<Box
		bgcolor={pinkPalette.primary.contrastText}
		{...props}
	>
		<IconButton
			size='large'
			aria-label='Đóng ảnh'
		>
			<CloseIcon />
		</IconButton>
	</Box>
))

export { NextSlide, PrevSlide, CloseSlide }
