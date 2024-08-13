import { createContext, useContext, useState } from 'react'

interface IAppContext {
	isSidebarOpen: boolean
	openSidebar: () => void
	closeSidebar: () => void
}

export const AppContext = createContext<IAppContext>({
	isSidebarOpen: false,
	openSidebar: () => undefined,
	closeSidebar: () => undefined
})

export const useApp = () => useContext(AppContext)

export default function AppProvider({ children }: React.PropsWithChildren) {
	const [isSidebarOpen, setOpenSidebar] = useState(false)

	const openSidebar = () => {
		setOpenSidebar(true)
	}

	const closeSidebar = () => {
		setOpenSidebar(false)
	}

	return (
		<AppContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>
			{children}
		</AppContext.Provider>
	)
}
