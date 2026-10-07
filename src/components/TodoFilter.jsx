function TodoFilter({ currentFilter, onFilterChange }) {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="filter-container">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
