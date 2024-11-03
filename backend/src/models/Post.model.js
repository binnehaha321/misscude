import mongoose from 'mongoose'

const { Schema } = mongoose

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Vui lòng nhập tiêu đề']
		},
		date: {
			type: Date,
			required: [true, 'Vui lòng nhập ngày của sự kiện'],
			default: Date.now
		},
		location: String,
		images: [
			{
				filename: String,
				url: String
			}
		],
		createdBy: {
			type: String,
			required: [true, 'Vui lòng nhập tên người đăng bài']
		},
		likeBy: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'User',
			default: []
		}
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				delete ret['__v']
				return ret
			}
		}
	}
)

const PostModel = mongoose.model('Post', postSchema)

export default PostModel
