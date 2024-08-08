import { useToast } from './context/ToastContext'
import Toast from './components/Toast'
import Home from './pages/Home'

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
			<Home />
		</>
	)
}

export default App
