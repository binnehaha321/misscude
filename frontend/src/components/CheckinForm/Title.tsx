import { memo } from 'react'
import { Box } from '@mui/material'

import { Textarea } from '@common/Textarea'

interface Props extends React.ComponentPropsWithRef<'textarea'> {
	textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>
}

const Title: React.FC<Props> = ({ textareaRef, ...props }) => {
	return (
		<Box>
			<Textarea
				placeholder='VD: Tụi mình lên kế hoạch đi Đà Lạt, và sau hơn 6 tháng chở đợi, cuối cùng 2 đứa đã có mặt tại Thái Lan 🇹🇭'
				autoFocus
				ref={textareaRef}
				rows={7}
				{...props}
			/>
		</Box>
	)
}

export default memo(Title)
