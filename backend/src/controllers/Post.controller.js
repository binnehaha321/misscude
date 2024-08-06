const multer = require('multer')
const cloudinary = require('../config/cloudinary')
const PostModel = require('../models/Post.model')
const { upload } = require('../middleware/storage')

const createPost = async (req, res) => {
	upload(req, res, async (err) => {
		if (err instanceof multer.MulterError) {
			if (err.code === 'LIMIT_UNEXPECTED_FILE') {
				return res
					.status(400)
					.json({ text: 'Một post chứa tối đa 15 ảnh', status: 400 })
			}

			return res
				.status(500)
				.json({ message: 'Có lỗi từ hệ thống, hãy thử lại sau', status: 500 })
		} else {
			const { title, date, location, createdBy } = req.body
			try {
				if (!req.files || !req.files.length) {
					return res.status(400).json({ message: 'Chưa có files được upload' })
				}

				// Upload files to Cloudinary
				const uploadPromises = req.files.map((file) => {
					return cloudinary.uploader.upload(file.path, {
						folder: process.env.CLOUDINARY_ASSET_FOLDER,
						transformation: [
							{ width: 900, crop: 'scale' },
							{ quality: 'auto:best' },
							{ fetch_format: 'auto' }
						]
					})
				})

				const uploadResults = await Promise.all(uploadPromises)

				const images = uploadResults.map((result) => ({
					filename: result.original_filename,
					url: result.secure_url
				}))

				const newPost = new PostModel({
					title,
					date,
					location,
					images,
					createdBy
				})

				await newPost.save()
				return res.status(201).json(newPost)
			} catch (err) {
				return res.status(500).json({ message: err.message })
			}
		}
	})
}

const getPosts = async (req, res) => {
	try {
		const posts = await PostModel.find().sort({ updatedAt: -1 })
		return res.status(200).json(posts)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

const getPostById = async (req, res) => {
	const { id } = req.params

	try {
		if (!id)
			return res.status(400).json({
				message: 'Không tìm thấy bài post'
			})
		const post = await PostModel.findById(id)
		return res.status(200).json(post)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

const updatePost = async (req, res) => {
	const { id } = req.params
	const { title, date, location, images, createdBy } = req.body

	try {
		const updatedPost = await PostModel.findByIdAndUpdate(
			id,
			{ title, date, location, images, createdBy },
			{ new: true, runValidators: true }
		)

		if (!updatedPost) {
			return res.status(404).json({ message: 'Post not found' })
		}

		return res.status(200).json(updatedPost)
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

const deletePost = async (req, res) => {
	const { id } = req.params

	try {
		const deletedPost = await PostModel.findByIdAndDelete(id)

		if (!deletedPost) {
			return res.status(404).json({ message: 'Post not found' })
		}

		return res.status(200).json({ message: 'Post deleted successfully' })
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

module.exports = {
	createPost,
	getPosts,
	getPostById,
	updatePost,
	deletePost
}
