import { useLocalStorage } from '@hooks/useLocalStorage'
import { parseJwt } from './parseJwt'

export const getMyId = () => {
	const { getItem } = useLocalStorage()
	const jwtToken = getItem('accessToken')
	const parsedJwtToken = parseJwt(jwtToken)
	const userId = parsedJwtToken._id
	return userId as string
}
