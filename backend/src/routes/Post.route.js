const express = require('express')

const {
	createPost,
	getPosts,
	getPostById,
	deletePost,
	updatePost
} = require('../controllers/Post.controller')

const router = express.Router()

router.post('/', createPost)
router.get('/', getPosts)
router.get('/:id', getPostById)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

module.exports = router
