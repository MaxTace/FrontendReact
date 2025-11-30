import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
  const handleClick = () => {
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];
    
    onStatusChange(id, nextStatus);
  };

  return (
    <div 
      className={`technology-card status-${status}`}
      onClick={handleClick}
    >
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <span className={`status-badge status-${status}`}>
          {getStatusText(status)}
        </span>
      </div>
      <p className="card-description">{description}</p>
      <div className="progress-indicator">
        {renderProgressIndicator(status)}
      </div>
    </div>
  );
}

function getStatusText(status) {
  const statusMap = {
    'completed': 'Изучено',
    'in-progress': 'В процессе', 
    'not-started': 'Не начато'
  };
  return statusMap[status] || status;
}

function renderProgressIndicator(status) {
  switch(status) {
    case 'completed':
      return <div className="indicator completed">✓</div>;
    case 'in-progress':
      return <div className="indicator in-progress">⟳</div>;
    case 'not-started':
      return <div className="indicator not-started">○</div>;
    default:
      return null;
  }
}

export default TechnologyCard;