import Toast from './components/Toast'
import { useToast } from './context/ToastContext'

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
		</>
	)
}

export default App
