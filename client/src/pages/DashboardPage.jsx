import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'
import api from '../services/api'

function DashboardPage() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await api.get('/todos')
      setTodos(response.data.todos)
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Failed to load todos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (title) => {
    try {
      setLoading(true)
      const response = await api.post('/todos', { title })
      setTodos((prev) => [response.data.todo, ...prev])
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Could not add todo.')
    } finally {
      setLoading(false)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      setLoading(true)
      const response = await api.put(`/todos/${id}`, { completed })
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? response.data.todo : todo)),
      )
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Could not update todo.')
    } finally {
      setLoading(false)
    }
  }

  const updateTitle = async (id, title) => {
    try {
      setLoading(true)
      const response = await api.put(`/todos/${id}`, { title })
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? response.data.todo : todo)),
      )
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Could not edit todo.')
    } finally {
      setLoading(false)
    }
  }

  const deleteTodo = async (id) => {
    try {
      setLoading(true)
      await api.delete(`/todos/${id}`)
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Could not delete todo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="dashboard-page">
      <div className="card">
        <Navbar />
        {error && <p className="error-text">{error}</p>}
        <TodoForm onAdd={addTodo} loading={loading} />

        {loading && todos.length === 0 ? (
          <p className="muted-text">Loading your tasks...</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTitle}
                loading={loading}
              />
            ))}
            {todos.length === 0 && (
              <li className="empty-text">No tasks yet. Add your first one above.</li>
            )}
          </ul>
        )}
      </div>
    </main>
  )
}

export default DashboardPage
