import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const statusCounts = { completed, 'in-progress': inProgress, 'not-started': notStarted };
  const mostPopularStatus = Object.keys(statusCounts).reduce((a, b) => 
    statusCounts[a] > statusCounts[b] ? a : b
  );

  const getStatusLabel = (status) => {
    const labels = {
      'completed': 'Изучено',
      'in-progress': 'В процессе',
      'not-started': 'Не начато'
    };
    return labels[status];
  };

  return (
    <div className="progress-header">
      <h1>Трекер изучения технологий</h1>
      
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-number total">{total}</span>
          <span className="stat-label">Всего технологий</span>
        </div>
        <div className="stat-item">
          <span className="stat-number completed">{completed}</span>
          <span className="stat-label">Изучено</span>
        </div>
        <div className="stat-item">
          <span className="stat-number in-progress">{inProgress}</span>
          <span className="stat-label">В процессе</span>
        </div>
        <div className="stat-item">
          <span className="stat-number not-started">{notStarted}</span>
          <span className="stat-label">Не начато</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-info">
          <span>Общий прогресс: {progressPercentage}%</span>
          <span>Популярный статус: {getStatusLabel(mostPopularStatus)}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressHeader;