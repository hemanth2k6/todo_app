import {
  createTodo,
  deleteTodo,
  getTodoByIdAndUserId,
  getTodosByUserId,
  updateTodo,
} from '../models/todoModel.js'

export async function createTodoHandler(req, res, next) {
  try {
    const { title } = req.body
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Todo title is required.' })
    }

    const todo = await createTodo({
      userId: req.user.id,
      title: title.trim(),
    })

    return res.status(201).json({ todo })
  } catch (error) {
    next(error)
  }
}

export async function getTodosHandler(req, res, next) {
  try {
    const todos = await getTodosByUserId(req.user.id)
    return res.status(200).json({ todos })
  } catch (error) {
    next(error)
  }
}

export async function updateTodoHandler(req, res, next) {
  try {
    const { id } = req.params
    const { title, completed } = req.body

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: 'Title cannot be empty.' })
    }

    const existingTodo = await getTodoByIdAndUserId(id, req.user.id)
    if (!existingTodo) {
      return res.status(404).json({ message: 'Todo not found.' })
    }

    const todo = await updateTodo({
      id,
      userId: req.user.id,
      title: title === undefined ? undefined : title.trim(),
      completed,
    })

    return res.status(200).json({ todo })
  } catch (error) {
    next(error)
  }
}

export async function deleteTodoHandler(req, res, next) {
  try {
    const { id } = req.params

    const removedTodo = await deleteTodo(id, req.user.id)
    if (!removedTodo) {
      return res.status(404).json({ message: 'Todo not found.' })
    }

    return res.status(200).json({ message: 'Todo deleted successfully.' })
  } catch (error) {
    next(error)
  }
}
