const jwt = require('jsonwebtoken')

const setCookie = (res, refreshToken) => {
	res.cookie('refreshToken', refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		// maxAge: 2 * 60 * 60 * 1000, // 2 hour
		maxAge: 5 * 60 * 1000, // 5 min
		secure: process.env.NODE_ENV !== 'development'
	})
}

const verify = {
	accessToken: (payload) => {
		return jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
			expiresIn: process.env.ACCESS_TOKEN_EXPIRED
		})
	},
	refreshToken: (payload) => {
		return jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
			expiresIn: process.env.REFRESH_TOKEN_EXPIRED
		})
	}
}

module.exports = {
	setCookie,
	verify
}
