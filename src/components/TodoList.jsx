import TodoItem from './TodoItem';

function TodoList({ todos, filter, onToggle, onRequestDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        {filter === 'all' && <p>No tasks yet! Create one above.</p>}
        {filter === 'active' && <p>No active tasks remaining 🎉</p>}
        {filter === 'completed' && <p>No completed tasks found.</p>}
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRequestDelete={onRequestDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
