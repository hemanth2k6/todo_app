import { useState } from 'react'

function TodoForm({ onAdd, loading }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return
    onAdd(trimmedTitle)
    setTitle('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
        disabled={loading}
        maxLength={200}
      />
      <button className="btn" disabled={loading}>
        {loading ? 'Adding task...' : 'Add task'}
      </button>
    </form>
  )
}

export default TodoForm
