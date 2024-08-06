import { IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import styles from './style.module.css'

interface Props {
	image: string
	openPreview: boolean
	closePreview: React.Dispatch<React.SetStateAction<string | boolean>>
}

const PreviewModal: React.FC<Props> = ({
	image,
	openPreview,
	closePreview
}) => {
	return (
		<Modal
			open={openPreview}
			onClose={closePreview}
			aria-labelledby='image-preview'
			aria-describedby='image-preview-show-on'
		>
			<div className={styles.frame}>
				<IconButton
					sx={{
						position: 'absolute',
						right: '5px',
						top: '5px',
						zIndex: 2,
						bgcolor: '#ff8999'
					}}
					color='error'
					onClick={() => closePreview(false)}
				>
					<CloseIcon />
				</IconButton>

				<img
					className={styles['preview-img']}
					src={image}
					alt='image-preview'
					width={500}
					style={{
						maxHeight: '90dvh',
						maxWidth: '100%',
						objectFit: 'contain',
						border: 'solid 2px',
						borderBottomColor: '#ffe',
						borderLeftColor: '#eed',
						borderRightColor: '#eed',
						borderTopColor: '#ccb'
					}}
				/>
			</div>
		</Modal>
	)
}

export default PreviewModal
