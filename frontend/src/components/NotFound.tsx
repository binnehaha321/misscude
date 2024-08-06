import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'

const NotFound = () => {
	return (
		<Stack
			height='100dvh'
			direction='column'
			alignItems='center'
			justifyContent='center'
			rowGap={4}
		>
			<Typography
				variant='h2'
				fontWeight={700}
			>
				Đi lạc rồi babi 😏
			</Typography>
			<Link to='/'>
				<Button
					size='large'
					variant='contained'
				>
					Sợ thì đi về 🥳
				</Button>
			</Link>
		</Stack>
	)
}

export default NotFound
