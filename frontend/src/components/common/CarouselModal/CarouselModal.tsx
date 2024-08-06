import { useCallback, useEffect, useMemo } from 'react'
import { Box, Modal, Stack } from '@mui/material'

import { usePost } from '../../../context/PostContext'

import { CloseSlide, NextSlide, PrevSlide } from './CarouselButton'

const CarouselModal = () => {
	const {
		isOpenPostGallery,
		crrentImages,
		currentIndex,
		setCurrentIndex,
		closeGallery
	} = usePost()

	const MAX_INDEX = useMemo(
		() => crrentImages.length - 1,
		[crrentImages.length]
	)

	const nextSlide = useCallback(
		(e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e?.stopPropagation()
			setCurrentIndex((prev) => (prev >= MAX_INDEX ? 0 : prev + 1))
		},
		[MAX_INDEX, setCurrentIndex]
	)

	const prevSlide = useCallback(
		(e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e?.stopPropagation()
			setCurrentIndex((prev) => (prev <= 0 ? MAX_INDEX : prev - 1))
		},
		[MAX_INDEX, setCurrentIndex]
	)

	useEffect(() => {
		const body = document.body
		const onKeyPress = ({ key }: KeyboardEvent) => {
			switch (key) {
				case 'Escape':
					closeGallery()
					break
				case 'ArrowRight':
					nextSlide()
					break
				case 'ArrowLeft':
					prevSlide()
					break
				default:
					return
			}
		}
		body.addEventListener('keydown', onKeyPress)

		return () => body.removeEventListener('keydown', onKeyPress)
	}, [closeGallery, nextSlide, prevSlide])

	return (
		<Modal
			key='carousel-post'
			open={isOpenPostGallery}
			onClose={closeGallery}
			sx={{ userSelect: 'none' }}
		>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					background: 'rgba(0,0,0, 0.8)'
				}}
				position='relative'
			>
				<Stack
					direction='row'
					justifyContent='center'
					alignItems='center'
					position='absolute'
					top='50%'
					left='50%'
					sx={{ outline: 'none', transform: 'translate(-50%, -50%)' }}
					width='80dvw'
					height='80dvh'
				>
					<img
						src={crrentImages[currentIndex]?.url}
						alt={crrentImages[currentIndex]?.filename}
						loading='lazy'
						style={{ objectFit: 'contain' }}
						width='100%'
						height='100%'
					/>
				</Stack>
				<CloseSlide
					position='absolute'
					top='0%'
					right='0%'
					onClick={closeGallery}
				/>
				{crrentImages.length > 1 && (
					<>
						<PrevSlide
							position='absolute'
							top='50%'
							left='5%'
							sx={{ transform: 'translateY(-50%)' }}
							onClick={prevSlide}
						/>
						<NextSlide
							position='absolute'
							top='50%'
							right='5%'
							sx={{ transform: 'translateY(-50%)' }}
							onClick={nextSlide}
						/>
					</>
				)}
			</Box>
		</Modal>
	)
}

export default CarouselModal
