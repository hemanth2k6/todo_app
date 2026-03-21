import dotenv from 'dotenv'
import app from './app.js'
import pool from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await pool.query('SELECT 1')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to database:', error.message)
    process.exit(1)
  }
}

startServer()
