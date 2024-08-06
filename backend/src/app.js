const express = require('express')
const dotenv = require('dotenv').config()
// const bodyParser = require('body-parser') // no need anymore, it has been included in express
const cors = require('cors')
const cookieParser = require('cookie-parser')

// connect database
const connectDB = require('./config/db')

// routes
const authRoutes = require('./routes/Auth.route')
const postRoutes = require('./routes/Post.route')
const userRoutes = require('./routes/User.route')

// utils
const { authenticateToken } = require('./middleware/Auth.middleware')

connectDB()

const corsOptions = {
	origin: 'http://localhost:5173'
}

// config app
const app = express()
// cookieParser middleware
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 4499

// routes
app.use('/api', authRoutes)
app.use('/api/post', authenticateToken, postRoutes)
app.use('/api/user', userRoutes)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
