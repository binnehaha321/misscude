import { memo } from 'react'
import { Alert, AlertColor, Snackbar, SnackbarProps } from '@mui/material'

interface Props extends SnackbarProps {
	status?: AlertColor
	message: string
}

const Toast: React.FC<Props> = ({ message, status, ...props }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			autoHideDuration={3000}
			ClickAwayListenerProps={{ onClickAway: () => null }}
			{...props}
		>
			<Alert
				severity={status}
				variant='filled'
				sx={{ width: '100%' }}
			>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default memo(Toast)
