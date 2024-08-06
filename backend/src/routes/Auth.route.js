const express = require('express')
const { signIn, verifyRefreshToken } = require('../controllers/Auth.controller')

const router = express.Router()

router.post('/sign-in', signIn)
router.post('/verify-refresh-token', verifyRefreshToken)

module.exports = router
