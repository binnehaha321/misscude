import { createContext, useContext, useState } from 'react'
import { IToastContent } from '../types'

interface IToast {
	toast: IToastContent
	openToast: ({ message, status }: Omit<IToastContent, 'isOpen'>) => void
	resetToast: () => void
	closeToast: () => void
}

export const useToast = () => useContext(ToastContext)

export const ToastContext = createContext<IToast>({
	toast: {
		message: '',
		status: 'error',
		isOpen: false
	},
	openToast: () => {},
	resetToast: () => {},
	closeToast: () => {}
})

export default function ToastProvider({ children }: React.PropsWithChildren) {
	const [toast, setToast] = useState<IToastContent>({
		message: '',
		status: 'error',
		isOpen: false
	})

	const openToast = ({ message, status }: Omit<IToastContent, 'isOpen'>) => {
		setToast({
			isOpen: true,
			message,
			status
		})
	}

	const closeToast = () => {
		setToast((prev) => ({
			...prev,
			isOpen: false
		}))
	}

	const resetToast = () => {
		setToast({
			message: '',
			status: 'error',
			isOpen: false
		})
	}

	return (
		<ToastContext.Provider value={{ toast, openToast, resetToast, closeToast }}>
			{children}
		</ToastContext.Provider>
	)
}
