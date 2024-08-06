import { Box } from '@mui/material'
import Typewriter from 'typewriter-effect'

interface IWelcome {
	onSetIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const welcomeText =
	'Happy birthday bé Cư 🌹 anh chúc em tuổi mới sẽ có nhiều cơ hội mới, đạt được các mục tiêu em đã và đang theo, quan trọng hơn hết là sức khỏe (nhớ ún nước 💦💦). Anh yêu em ❤️'

const Welcome: React.FC<IWelcome> = ({ onSetIsLoaded }) => {
	return (
		<Box
			sx={{
				backgroundColor: '#2e2e2e',
				color: '#eee',
				height: '100dvh',
				width: '100dvw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<div style={{ maxWidth: 400 }}>
				<Typewriter
					onInit={(typewriter) => {
						typewriter
							.typeString(welcomeText)
							.pauseFor(2000)
							.callFunction(() => {
								onSetIsLoaded(true)
							})
							.start()
					}}
					options={{ delay: 80 }}
				/>
			</div>
		</Box>
	)
}

export default Welcome
