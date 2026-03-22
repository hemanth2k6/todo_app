import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js'
import dotenv from "dotenv";
dotenv.config();
const app = express()
import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const cors = require("cors");

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running.' })
})

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
