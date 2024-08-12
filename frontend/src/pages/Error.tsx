import { Box, Stack } from '@mui/material'
import { useRouteError } from 'react-router-dom'

const Error = () => {
	const error = useRouteError() as {
		statusText: string
		message: string
	}

	return (
		<Box
			textAlign='center'
			bgcolor='#ddd'
			width='100vw'
		>
			<Stack
				mx='auto'
				maxWidth={400}
				height='100dvh'
				direction='column'
				rowGap={3}
				justifyContent='center'
				alignItems='center'
			>
				<h1 className='font-bold text-2xl'>Oops!</h1>
				<p>Có lỗi rùi 😅</p>
				<p>
					<i className='opacity-50'>{error.statusText || error.message}</i>
				</p>
			</Stack>
		</Box>
	)
}

export default Error
