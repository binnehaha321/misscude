const express = require('express')
const { createUser } = require('../controllers/User.controller')
const { signIn } = require('../controllers/Auth.controller')

const router = express.Router()

router.post('/', createUser)

module.exports = router
