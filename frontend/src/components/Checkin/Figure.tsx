import { Image } from '@types'

const Figure: React.FC<Image & React.ImgHTMLAttributes<HTMLImageElement>> = ({
	url,
	filename,
	...props
}) => {
	return (
		<img
			src={url}
			loading='lazy'
			className='w-full max-w-[500px] h-full aspect-square object-cover object-center cursor-pointer mx-auto'
			alt={filename}
			{...props}
		/>
	)
}

export default Figure
