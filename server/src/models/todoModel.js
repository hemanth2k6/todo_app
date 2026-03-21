import { query } from '../config/db.js'

export async function createTodo({ userId, title }) {
  const sql = `
    INSERT INTO todos (user_id, title)
    VALUES ($1, $2)
    RETURNING id, user_id, title, completed, created_at
  `
  const result = await query(sql, [userId, title])
  return result.rows[0]
}

export async function getTodosByUserId(userId) {
  const sql = `
    SELECT id, user_id, title, completed, created_at
    FROM todos
    WHERE user_id = $1
    ORDER BY created_at DESC
  `
  const result = await query(sql, [userId])
  return result.rows
}

export async function getTodoByIdAndUserId(id, userId) {
  const sql = `
    SELECT id, user_id, title, completed, created_at
    FROM todos
    WHERE id = $1 AND user_id = $2
  `
  const result = await query(sql, [id, userId])
  return result.rows[0] || null
}

export async function updateTodo({ id, userId, title, completed }) {
  const sql = `
    UPDATE todos
    SET
      title = COALESCE($3, title),
      completed = COALESCE($4, completed)
    WHERE id = $1 AND user_id = $2
    RETURNING id, user_id, title, completed, created_at
  `
  const result = await query(sql, [id, userId, title, completed])
  return result.rows[0] || null
}

export async function deleteTodo(id, userId) {
  const sql = `
    DELETE FROM todos
    WHERE id = $1 AND user_id = $2
    RETURNING id
  `
  const result = await query(sql, [id, userId])
  return result.rows[0] || null
}
