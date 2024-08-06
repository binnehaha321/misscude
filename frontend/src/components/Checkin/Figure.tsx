import { Image } from '../../types'

const Figure: React.FC<Image & React.ImgHTMLAttributes<HTMLImageElement>> = ({
	url,
	filename,
	_id,
	...props
}) => {
	return (
		<img
			src={url}
			loading='lazy'
			style={{
				width: '100%',
				height: '100%',
				aspectRatio: '1/1',
				objectFit: 'cover',
				objectPosition: 'center',
				cursor: 'pointer'
			}}
			alt={filename}
			{...props}
		/>
	)
}

export default Figure
