import { Button, Stack } from '@mui/material'

interface IErrorText {
	text: string
}

const ErrorText: React.FC<IErrorText> = ({ text }) => {
	const reloadPage = () => {
		window.location.reload()
	}

	return (
		<Stack
			direction='column'
			rowGap={0.5}
		>
			<p className='text-red-600 text-center font-semibold my-3 w-full'>
				{text}
			</p>
			<Button
				type='button'
				variant='contained'
				color='error'
				onClick={reloadPage}
				sx={{ width: 'fit-content', mx: 'auto' }}
			>
				Tải lại
			</Button>
		</Stack>
	)
}

export default ErrorText
