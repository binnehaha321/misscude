import User from '../models/User.model.js'
import { verify } from '../lib/utils.js'

export const generateTokens = async (res, user) => {
	try {
		const payload = {
			_id: user._id,
			email: user.email,
			username: user.username,
			avatar: user?.avatar || ''
		}

		const accessToken = verify.accessToken(payload)
		const refreshToken = verify.refreshToken(payload)

		return Promise.resolve({ accessToken, refreshToken })
	} catch (err) {
		return Promise.reject(err)
	}
}

export const isExistUsername = async (username) => {
	const existedUsername = await User.findOne({ username })
	return existedUsername
}

export const isExistEmail = async (email) => {
	const existedEmail = await User.findOne({ email })
	return existedEmail
}
