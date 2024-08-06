const User = require('../models/User.model')
const { verify } = require('../lib/utils')

exports.generateTokens = async (res, user) => {
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

exports.isExistUsername = async (username) => {
	const existedUsername = await User.findOne({ username })
	return existedUsername
}

exports.isExistEmail = async (email) => {
	const existedEmail = await User.findOne({ email })
	return existedEmail
}
