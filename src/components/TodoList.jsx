import TodoItem from './TodoItem';

function TodoList({ todos, filter, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        {filter === 'all' && <p>No tasks yet! Add your first task above.</p>}
        {filter === 'active' && <p>No active tasks remaining.</p>}
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
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;
