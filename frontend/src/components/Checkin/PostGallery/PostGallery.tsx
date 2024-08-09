import { lazy, useEffect, useState } from 'react'
import { Grid } from '@mui/material'

import { Image } from '../../../types'
import { usePost } from '../../../context/PostContext'

const Figure = lazy(() => import('../Figure'))

import styles from './style.module.css'

const PostGallery = ({ images }: { images: Image[] }) => {
	const { openGallery } = usePost()

	const [slicedImgs, setSlicedImgs] = useState<Image[]>([] || images)
	const [restQuantityOfImgs, setRestQuantityOfImgs] = useState(0)

	useEffect(() => {
		if (images.length >= 4) {
			setSlicedImgs(images.slice(0, 4))
			const restQuantity = images.length - 4
			setRestQuantityOfImgs(restQuantity)
		}
	}, [images])

	if (!images.length) {
		return null
	} else if (images.length === 1) {
		const thisImage = images[0]
		return (
			<Figure
				{...thisImage}
				onClick={(e) => {
					e.stopPropagation()
					openGallery(images, 0)
				}}
			/>
		)
	} else {
		return (
			<Grid
				spacing={0.5}
				container
			>
				{(images.length > 4 ? slicedImgs : images).map((src, index) => {
					const props = src as Image
					return (
						<Grid
							item
							key={index}
							xs={6}
						>
							{index === 3 && restQuantityOfImgs ? (
								<div
									className={styles.backdrop}
									onClick={(e) => {
										e.stopPropagation()
										openGallery(images, index)
									}}
								>
									<span className={styles.restQuantity}>
										+{restQuantityOfImgs} ảnh
									</span>
									<Figure {...props} />
								</div>
							) : (
								<Figure
									onClick={(e) => {
										e.stopPropagation()
										openGallery(images, index)
									}}
									{...props}
								/>
							)}
						</Grid>
					)
				})}
			</Grid>
		)
	}
}

export default PostGallery
