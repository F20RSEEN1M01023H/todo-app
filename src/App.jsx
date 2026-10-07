import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const remainingCount = todos.filter((todo) => !todo.completed).length;

    if (todos.length === 0) {
      document.title = 'No tasks yet';
    } else if (remainingCount === 0) {
      document.title = 'All tasks completed 🎉';
    } else {
      document.title = `${remainingCount} task${remainingCount > 1 ? 's' : ''} remaining`;
    }
  }, [todos]);

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newTitle) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo)),
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const remainingCount = totalCount - completedCount;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1 className="app-title">My Todo List</h1>

      <TodoForm onAddTodo={addTodo} />

      <div className="stats-container">
        <span>Total: {totalCount}</span>
        <span>Remaining: {remainingCount}</span>
        <span>Completed: {completedCount}</span>
      </div>

      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      {completedCount > 0 && (
        <div className="clear-container">
          <button className="btn-clear" onClick={clearCompleted}>
            Clear Completed ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
