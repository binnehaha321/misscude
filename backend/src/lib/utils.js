const jwt = require('jsonwebtoken')

const setCookie = (res, refreshToken) => {
	res.cookie('refreshToken', refreshToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 3 * 60 * 60 * 1000, // 3 hour
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

const getPublicId = (url) => {
	const regex = /.*\/upload\/v\d+\/(?:[^/]+\/)*([^/.]+)\.[^.]+/
	const match = url.match(regex)
	return match ? match[1] : null
}

module.exports = {
	setCookie,
	verify,
	getPublicId
}
