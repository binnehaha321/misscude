const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Vui lòng nhập email'],
			unique: true
		},
		username: {
			type: String,
			required: [true, 'Vui lòng nhập username'],
			unique: true
		},
		password: {
			type: String,
			required: [true, 'Vui lòng nhập mật khẩu']
		},
		location: String,
		avatar: {
			filename: String,
			url: String
		},
		accessToken: String,
		refreshToken: String
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				delete ret['password']
				delete ret['__v']
				return ret
			}
		}
	}
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
