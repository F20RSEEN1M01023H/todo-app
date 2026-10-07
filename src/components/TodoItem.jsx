import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.title);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button className="btn-action btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="btn-action btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className={`todo-text ${todo.completed ? 'completed-text' : ''}`}>
              {todo.title}
            </span>
            <span className="todo-date">({todo.createdAt})</span>
          </div>

          <div className="actions">
            <button className="btn-action btn-edit" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn-action btn-delete" onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
