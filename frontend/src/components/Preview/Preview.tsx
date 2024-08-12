import React, { memo, useMemo } from 'react'
import { Box, IconButton, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
	images: File[]
	removeFile: (image: File) => void
	setPreview: React.Dispatch<React.SetStateAction<string | null>>
}

const PreviewList: React.FC<Props> = memo(
	({ images, removeFile, setPreview }) =>
		images.map((image, index) => {
			const src = URL.createObjectURL(image)
			return (
				<Box
					display='inline-block'
					position='relative'
					width='calc(100% / 3 - 1rem)'
					height={200}
					m={0.5}
					key={index}
				>
					<IconButton
						color='error'
						sx={{
							position: 'absolute',
							right: 0,
							top: 0,
							transform: 'translate(13px, -13px)',
							backgroundColor: '#ffbebe'
						}}
						size='small'
						onClick={() => removeFile(image)}
					>
						<CloseIcon fontSize='small' />
					</IconButton>
					<img
						src={src}
						alt={`Preview ${index}`}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							cursor: 'pointer'
						}}
						onClick={() => setPreview(src)}
					/>
				</Box>
			)
		})
)

const Preview: React.FC<Props> = (props) => {
	const imagesLength = useMemo(() => props.images.length, [props.images.length])

	return (
		<Stack
			direction='row'
			columnGap={1}
			rowGap={3}
			flexWrap={'wrap'}
			overflow='auto'
			maxHeight={300}
			py={imagesLength ? 1.5 : 0}
		>
			<PreviewList {...props} />
		</Stack>
	)
}

export default memo(Preview)
