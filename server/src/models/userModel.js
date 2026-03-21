import { query } from '../config/db.js'

export async function createUser({ name, email, password }) {
  const sql = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
  `
  const result = await query(sql, [name, email, password])
  return result.rows[0]
}

export async function findUserByEmail(email) {
  const sql = `
    SELECT id, name, email, password, created_at
    FROM users
    WHERE email = $1
  `
  const result = await query(sql, [email])
  return result.rows[0] || null
}

export async function findUserById(id) {
  const sql = `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = $1
  `
  const result = await query(sql, [id])
  return result.rows[0] || null
}
