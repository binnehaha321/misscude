import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'

const NotFound = () => {
	return (
		<Stack
			sx={{
				height: '100dvh',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				rowGap: 3,
				bgcolor: '#eee'
			}}
		>
			<Typography
				sx={{ fontSize: { xs: 32, sm: 40, md: 60 } }}
				fontWeight={700}
				textAlign='center'
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
