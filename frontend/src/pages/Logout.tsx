import { logout } from '@utils/auth'
import { useEffect } from 'react'

const Logout = () => {
	useEffect(() => {
		logout()
	}, [logout])

	return <></>
}

export default Logout
