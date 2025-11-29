import './App.css';
import ProgressHeader from './components/ProgressHeader';
import TechnologyCard from './components/TechnologyCard';

function App() {
  // Тестовые данные
  const technologies = [
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение функциональных и классовых компонентов, их жизненного цикла и особенностей', 
      status: 'completed' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, работа с выражениями JavaScript в разметке', 
      status: 'in-progress' 
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
      status: 'completed' 
    },
    { 
      id: 5, 
      title: 'Event Handling', 
      description: 'Обработка событий в React, работа с формами и пользовательским вводом', 
      status: 'in-progress' 
    },
    { 
      id: 6, 
      title: 'React Router', 
      description: 'Настройка маршрутизации в React-приложениях, создание SPA', 
      status: 'not-started' 
    }
  ];

  return (
    <div className="App">
      <ProgressHeader technologies={technologies} />
      
      <div className="technologies-container">
        <h2>Дорожная карта изучения</h2>
        <div className="technologies-list">
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;