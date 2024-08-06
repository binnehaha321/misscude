import { IUser } from '../types'
import { localStore } from './localStorage'

export const storeUser = (user: IUser) => {
	localStore.set('user', user)
}

export const getUser = () => {
	return localStore.get('user')
}

export const logout = () => {
	localStore.removeAll()
	window.location.href = '/'
}
