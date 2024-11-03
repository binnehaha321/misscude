import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from '../models/User.model.js'
import { generateTokens } from '../middleware/User.middleware.js'
import { setCookie } from '../lib/utils.js'

const signIn = async (req, res) => {
	const { username, password } = req.body

	try {
		const user = await UserModel.findOne({ username })
		if (!user) {
			return res.status(400).json({
				data: 'Không tìm thấy người dùng',
				status: 400
			})
		}

		const matchedUser = await bcrypt.compare(password, user.password)
		if (!matchedUser) {
			return res.status(400).json({
				data: 'Tên đăng nhập hoặc mật khẩu không chính xác',
				status: 400
			})
		}

		const { accessToken, refreshToken } = await generateTokens(res, user)
		setCookie(res, refreshToken)

		return res
			.status(200)
			.json({ data: user, accessToken, refreshToken, status: 200 })
	} catch (error) {
		return res.status(500).json({ message: 'Error ' + error })
	}
}

const verifyRefreshToken = async (req, res, next) => {
	try {
		const { refreshToken } = req.body

		if (!refreshToken) {
			return res.status(404).json({ message: 'Không tìm thấy token' })
		}

		// Verify the refresh token
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_PRIVATE_KEY,
			async (err, user) => {
				if (err) {
					return res.status(407).json({ message: 'Token không hợp lệ' })
				}

				// generate new tokens
				const { accessToken, refreshToken } = await generateTokens(res, user)
				setCookie(res, refreshToken)

				req.user = user
				next()
				return res.status(200).json({ accessToken, refreshToken })
			}
		)
	} catch (error) {
		console.error(error)
		res.clearCookie('refreshToken')
		return res
			.status(500)
			.json({ message: 'Lỗi hệ thống, vui lòng thử lại sau' })
	}
}

export { signIn, verifyRefreshToken }
