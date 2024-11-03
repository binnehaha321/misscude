import express from 'express'
import { createUser } from '../controllers/User.controller.js'
import { signIn } from '../controllers/Auth.controller.js'

const router = express.Router()

router.post('/', createUser)

export default router
