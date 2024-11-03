import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import cookieParser from 'cookie-parser'
import { Server as SocketIOServer } from 'socket.io'
import connectDB from './config/db.js'
import authRoutes from './routes/Auth.route.js'
import postRoutes from './routes/Post.route.js'
import userRoutes from './routes/User.route.js'
import { authenticateToken } from './middleware/Auth.middleware.js'

dotenv.config()

connectDB()

const corsOptions = {
	origin: process.env.HOSTNAME
}

// config app
const app = express()
const server = http.createServer(app)

// create socket server
const io = new SocketIOServer(server, { cors: corsOptions })

// cookieParser middleware
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the 'public' folder
app.use(express.static('public'))

const port = process.env.PORT || 4499

// routes
app.use('/api', authRoutes)
app.use('/api/post', authenticateToken, postRoutes)
app.use('/api/user', userRoutes)

io.on('connection', (socket) => {
	console.log('a user connected')
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
