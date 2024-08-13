import { Grid, Paper } from '@mui/material'
import PublicLayout from './PublicLayout'
import { Outlet } from 'react-router-dom'

const AuthenLayout = () => {
	return (
		<PublicLayout>
			<Grid
				container
				sx={{
					width: '100dvw',
					minWidth: '100%',
					height: '100dvh',
					minHeight: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					bgcolor: '#eee'
				}}
			>
				<Paper
					elevation={4}
					sx={{ p: 2, mx: 1, width: 400, maxWidth: 400 }}
				>
					<Outlet />
				</Paper>
			</Grid>
		</PublicLayout>
	)
}

export default AuthenLayout
