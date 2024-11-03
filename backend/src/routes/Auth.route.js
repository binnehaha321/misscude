import express from 'express'
import { signIn, verifyRefreshToken } from '../controllers/Auth.controller.js'

const router = express.Router()

router.post('/sign-in', signIn)
router.post('/verify-refresh-token', verifyRefreshToken)

export default router
