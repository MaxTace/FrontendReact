import './App.css';
import { useState } from 'react';
import ProgressHeader from './components/ProgressHeader';
import TechnologyCard from './components/TechnologyCard';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';

function App() {
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение функциональных и классовых компонентов, их жизненного цикла и особенностей', 
      status: 'not-started' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, работа с выражениями JavaScript в разметке', 
      status: 'not-started' 
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов, изучение хуков useState и useEffect', 
      status: 'not-started' 
    },
    { 
      id: 4, 
      title: 'Props and Data Flow', 
      description: 'Передача данных между компонентами через props, однонаправленный поток данных', 
      status: 'not-started' 
    },
    { 
      id: 5, 
      title: 'Event Handling', 
      description: 'Обработка событий в React, работа с формами и пользовательским вводом', 
      status: 'not-started' 
    },
    { 
      id: 6, 
      title: 'React Router', 
      description: 'Настройка маршрутизации в React-приложениях, создание SPA', 
      status: 'not-started' 
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => 
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const filteredTechnologies = technologies.filter(tech => {
    switch(activeFilter) {
      case 'completed':
        return tech.status === 'completed';
      case 'in-progress':
        return tech.status === 'in-progress';
      case 'not-started':
        return tech.status === 'not-started';
      default:
        return true; // 'all' - показываем все
    }
  });

  return (
    <div className="App">
      <ProgressHeader technologies={technologies} />
      
      <QuickActions 
        technologies={technologies}
        setTechnologies={setTechnologies}
      />
      
      <FilterTabs 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        technologies={technologies}
      />
      
      <div className="technologies-container">
        <h2>Дорожная карта изучения</h2>
        <div className="technologies-list">
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;