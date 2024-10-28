const express = require('express')

const {
	createPost,
	getPosts,
	getPostById,
	deletePost,
	updatePost,
	likePost,
	unLikePost
} = require('../controllers/Post.controller')

const router = express.Router()

router.post('/', createPost)
router.post('/like', likePost)
router.post('/unlike', unLikePost)
router.get('/', getPosts)
router.get('/:id', getPostById)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

module.exports = router
