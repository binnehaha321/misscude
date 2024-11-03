import express from 'express'

import {
	createPost,
	getPosts,
	getPostById,
	deletePost,
	updatePost,
	likePost,
	unLikePost
} from '../controllers/Post.controller.js'

const router = express.Router()

router.post('/', createPost)
router.post('/like', likePost)
router.post('/unlike', unLikePost)
router.get('/', getPosts)
router.get('/:id', getPostById)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

export default router
