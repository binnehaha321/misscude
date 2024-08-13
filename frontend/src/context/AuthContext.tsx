import { createContext, useContext, useMemo, useState } from 'react'
import { localStore } from '@utils/localStorage'

interface IAuthContext {
	token: string
	setIsAuth: (token: string, refreshToken: string) => void
}

export const AuthContext = createContext<IAuthContext>({
	token: '',
	setIsAuth: () => undefined
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: React.PropsWithChildren) {
	const accessToken = useMemo(() => localStore.get('accessToken') ?? '', [])
	const [token, setToken] = useState(accessToken)

	const setIsAuth = (token: string, refreshToken: string) => {
		if (token && refreshToken) {
			setToken(token)
			localStore.set('accessToken', token)
			localStore.set('refreshToken', refreshToken)
		}
	}

	return (
		<AuthContext.Provider value={{ token, setIsAuth }}>
			{children}
		</AuthContext.Provider>
	)
}
