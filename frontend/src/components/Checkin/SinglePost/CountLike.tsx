import { useMemo } from 'react'
import { Stack, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const CountLike = ({ likeBy }: { likeBy?: string[] }) => {
	const likeCount = useMemo(() => likeBy?.length || 0, [likeBy])

	return (
		<Stack
			mx={4}
			mt={1}
			flexDirection='row'
			columnGap={1}
			alignItems='center'
		>
			{likeCount > 0 && (
				<>
					<div
						style={{
							backgroundColor: 'whitesmoke',
							borderRadius: '50%',
							width: 24,
							height: 24,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							border: '0.5px solid #ec407a'
						}}
					>
						<ThumbUpIcon
							color='primary'
							sx={{ fontSize: 12 }}
						/>
					</div>
					<Typography
						fontSize={14}
						fontWeight={500}
						color='GrayText'
					>
						{`${likeCount} người thích`}
					</Typography>
				</>
			)}
		</Stack>
	)
}

export default CountLike
