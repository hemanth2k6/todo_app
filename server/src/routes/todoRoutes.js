import express from 'express'
import {
  createTodoHandler,
  deleteTodoHandler,
  getTodosHandler,
  updateTodoHandler,
} from '../controllers/todoController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/', getTodosHandler)
router.post('/', createTodoHandler)
router.put('/:id', updateTodoHandler)
router.delete('/:id', deleteTodoHandler)

export default router
