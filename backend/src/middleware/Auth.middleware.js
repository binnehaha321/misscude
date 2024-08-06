const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) return res.status(401).json({ data: 'Vui lòng đăng nhập' })

	// verify access token
	jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, user) => {
		if (err)
			return res.status(403).json({ data: 'Bạn không được cấp quyền truy cập' })

		req.user = user
		next()
	})
}

module.exports = {
	authenticateToken
}
