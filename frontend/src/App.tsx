import { Outlet } from 'react-router-dom'
import { useToast } from '@context/ToastContext'
import Toast from '@components/Toast'
// import LikeEffect from '@components/LikeEffect'

function App() {
	const { toast, closeToast } = useToast()

	return (
		<>
			<Toast
				message={toast.message || ''}
				status={toast.status}
				open={toast.isOpen}
				onClose={closeToast}
			/>
			{/* <LikeEffect /> */}
			<Outlet />
		</>
	)
}

export default App
