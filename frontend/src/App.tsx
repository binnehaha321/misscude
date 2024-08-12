import { Outlet } from 'react-router-dom'
import { useToast } from '@context/ToastContext'
import Toast from '@components/Toast'

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
			<Outlet />
		</>
	)
}

export default App
