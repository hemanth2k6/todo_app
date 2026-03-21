import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onUpdate, loading }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const handleSave = () => {
    const trimmedTitle = editTitle.trim()
    if (!trimmedTitle) return
    onUpdate(todo.id, trimmedTitle)
    setIsEditing(false)
  }

  return (
    <li className="todo-item">
      <div className="todo-main">
        {isEditing ? (
          <input
            className="todo-edit-input"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            maxLength={200}
          />
        ) : (
          <span className={todo.completed ? 'todo-text done' : 'todo-text'}>
            {todo.title}
          </span>
        )}

        <div className="todo-actions">
          {isEditing ? (
            <>
              <button className="btn btn-small" onClick={handleSave} disabled={loading}>
                Save
              </button>
              <button
                className="btn btn-secondary btn-small"
                onClick={() => {
                  setEditTitle(todo.title)
                  setIsEditing(false)
                }}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-secondary btn-small"
              onClick={() => setIsEditing(true)}
              disabled={loading}
            >
              Edit
            </button>
          )}
          <button
            className="btn btn-danger btn-small"
            onClick={() => onDelete(todo.id)}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>

      <input
        className="todo-checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        disabled={loading}
      />
    </li>
  )
}

export default TodoItem
