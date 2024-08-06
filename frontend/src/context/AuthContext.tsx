import { createContext, useContext, useMemo, useState } from 'react'
import { localStore } from '../utils/localStorage'

interface IAuth {
	token: string
	isAuth: boolean
	setIsAuth: (token: string, refreshToken: string) => void
}

export const AuthContext = createContext<IAuth>({
	token: '',
	isAuth: false,
	setIsAuth: () => {}
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: React.PropsWithChildren) {
	const accessToken = useMemo(() => localStore.get('accessToken') || '', [])
	const [token, setToken] = useState(accessToken)
	const [isAuth, _setIsAuth] = useState(!!accessToken)

	const setIsAuth = (token: string, refreshToken: string) => {
		if (token && refreshToken) {
			setToken(token)
			localStore.set('accessToken', token)
			localStore.set('refreshToken', refreshToken)
		}
	}

	return (
		<AuthContext.Provider value={{ token, isAuth, setIsAuth }}>
			{children}
		</AuthContext.Provider>
	)
}
