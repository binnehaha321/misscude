import { memo, useState } from 'react'
import { IconButton } from '@mui/material'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import InsertEmotionIcon from '@mui/icons-material/InsertEmoticon'
import { MouseDownEvent } from 'emoji-picker-react/dist/config/config'

import Emoji from '../Emoji'

interface Props {
	onSetEmoji: MouseDownEvent
}

const SupportTitle: React.FC<Props> = ({ onSetEmoji }) => {
	const [openEmoji, setOpenEmoji] = useState(false)

	return (
		<>
			{!openEmoji && (
				<IconButton
					title='Mở bộ icon'
					onClick={() => setOpenEmoji(true)}
				>
					<InsertEmotionIcon />
				</IconButton>
			)}
			{openEmoji && (
				<ClickAwayListener
					onClickAway={() => {
						setOpenEmoji(false)
					}}
				>
					<Emoji onEmojiClick={onSetEmoji} />
				</ClickAwayListener>
			)}
		</>
	)
}

export default memo(SupportTitle)
