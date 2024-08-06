const bcrypt = require('bcrypt')
const { isExistUsername, isExistEmail } = require('../middleware/User.middleware')
const UserModel = require('../models/User.model')

const createUser = async (req, res) => {
	const { email, username, password, avatar } = req.body

	try {
		const existedUsername = await isExistUsername(username)
		const existedEmail = await isExistEmail(email)

		if (existedUsername) {
			return res.status(400).json({
				message: 'Tên người dùng đã tồn tại',
				status: 400
			})
		}
		if (existedEmail) {
			return res.status(400).json({
				message: 'Email đã tồn tại',
				status: 400
			})
		}

		const hashedPassword = await bcrypt.hash(password, +process.env.SALT)
		const newUser = new UserModel({
			email,
			username,
			password: hashedPassword
			// avatar: avatar || process.env.AVATAR_NO_USER
		})

		await newUser.save()
		return res.status(201).json({ data: newUser, status: 201 })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Error ' + JSON.stringify(error) })
	}
}

module.exports = {
	createUser
}
