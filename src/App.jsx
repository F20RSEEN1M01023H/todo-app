import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import './App.css';

function App() {
  // Core State
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  // UI Interactive States
  const [deleteId, setDeleteId] = useState(null); // Triggers delete modal
  const [toast, setToast] = useState(null); // Controls notification popups

  // Helper function to show notifications
  const triggerToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Dynamic Browser Document Title
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

  // Action Handlers
  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTodos((prev) => [newTodo, ...prev]);
    triggerToast('Task added successfully!', 'success');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const editTodo = (id, newTitle) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo)));
    triggerToast('Task updated!', 'info');
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setTodos((prev) => prev.filter((todo) => todo.id !== deleteId));
    setDeleteId(null);
    triggerToast('Task deleted successfully!', 'danger');
  };

  const clearCompleted = () => {
    const completedCount = todos.filter((t) => t.completed).length;
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    triggerToast(`Cleared ${completedCount} completed task(s)!`, 'info');
  };

  // Derived Values
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
      <h1 className="app-title">
        Task<span>Master</span>
      </h1>

      <TodoForm onAddTodo={addTodo} />

      <div className="stats-container">
        <div className="stat-box">
          <span className="stat-label">Total</span>
          <span className="stat-value">{totalCount}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Active</span>
          <span className="stat-value">{remainingCount}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Done</span>
          <span className="stat-value">{completedCount}</span>
        </div>
      </div>

      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        filter={filter}
        onToggle={toggleTodo}
        onRequestDelete={(id) => setDeleteId(id)}
        onEdit={editTodo}
      />

      {completedCount > 0 && (
        <div className="clear-container">
          <button className="btn-clear" onClick={clearCompleted}>
            Clear Completed ({completedCount})
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Popup Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
