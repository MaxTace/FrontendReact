import './FilterTabs.css';

function FilterTabs({ activeFilter, setActiveFilter, technologies }) {
  const filters = [
    { key: 'all', label: 'Все', count: technologies.length },
    { key: 'not-started', label: 'Не начато', count: technologies.filter(t => t.status === 'not-started').length },
    { key: 'in-progress', label: 'В процессе', count: technologies.filter(t => t.status === 'in-progress').length },
    { key: 'completed', label: 'Выполнено', count: technologies.filter(t => t.status === 'completed').length }
  ];

  return (
    <div className="filter-tabs">
      <h3>Фильтр по статусу:</h3>
      <div className="tab-buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`tab-button ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterTabs;