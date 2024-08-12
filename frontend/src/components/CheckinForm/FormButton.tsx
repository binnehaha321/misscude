import { memo } from 'react'
import { LoadingButton } from '@mui/lab'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { Button } from '@mui/material'

interface Props {
	formStep: number
	isLoading: boolean
	onSubmitNewPost: React.MouseEventHandler<HTMLButtonElement> | undefined
	onNext: () => void
}

const FormButton: React.FC<Props> = ({
	formStep,
	isLoading,
	onSubmitNewPost,
	onNext
}) => {
	return formStep === 3 ? (
		<LoadingButton
			variant='contained'
			color='primary'
			type='button'
			fullWidth
			title='Đăng bài'
			loadingPosition='start'
			startIcon={<SendOutlinedIcon />}
			loading={isLoading}
			onClick={onSubmitNewPost}
		>
			Đăng bài
		</LoadingButton>
	) : (
		<Button
			variant='contained'
			color='primary'
			type='button'
			fullWidth
			title='Tiếp tục'
			onClick={onNext}
		>
			Tiếp tục
		</Button>
	)
}

export default memo(FormButton)
