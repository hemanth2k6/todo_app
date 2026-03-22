import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js'
import dotenv from "dotenv";

dotenv.config();

const app = express()

// middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json())


app.get('/', (req, res) => {
  res.send('API is running 🚀');
})

// existing health route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running.' })
})

// routes
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

// error handlers
app.use(notFoundHandler)
app.use(errorHandler)

export default app