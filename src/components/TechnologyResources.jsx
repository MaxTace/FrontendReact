import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import './technologyResources.css'

function TechnologyResources({ technology }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const fetchResources = async (techName) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResources = {
        'react': [
          {
            title: 'Официальная документация React',
            url: 'https://react.dev',
            type: 'documentation',
            description: 'Официальная документация на английском'
          },
          {
            title: 'React на русском',
            url: 'https://ru.reactjs.org',
            type: 'documentation',
            description: 'Перевод документации на русский'
          },
          {
            title: 'React Tutorial',
            url: 'https://react-tutorial.app',
            type: 'tutorial',
            description: 'Интерактивный учебник по React'
          }
        ],
        'node.js': [
          {
            title: 'Официальная документация Node.js',
            url: 'https://nodejs.org',
            type: 'documentation',
            description: 'Официальная документация'
          },
          {
            title: 'Node.js Guides',
            url: 'https://nodejs.org/en/docs/guides/',
            type: 'guide',
            description: 'Руководства и best practices'
          }
        ],
        'typescript': [
          {
            title: 'TypeScript Handbook',
            url: 'https://www.typescriptlang.org/docs/',
            type: 'documentation',
            description: 'Официальное руководство'
          }
        ]
      };

      const techResources = mockResources[techName.toLowerCase()] || [
        {
          title: `Ресурсы по ${techName}`,
          url: `https://google.com/search?q=${encodeURIComponent(techName + ' tutorial')}`,
          type: 'search',
          description: 'Поиск учебных материалов'
        }
      ];

      setResources(techResources);
    } catch (error) {
      console.error('Ошибка загрузки ресурсов:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (expanded && technology) {
      fetchResources(technology.title);
    }
  }, [expanded, technology]);

  const getResourceIcon = (type) => {
    const icons = {
      documentation: '📚',
      tutorial: '🎓',
      guide: '📖',
      video: '🎥',
      course: '🏫',
      search: '🔍'
    };
    return icons[type] || '📄';
  };

  return (
    <div className="technology-resources">
      <button 
        className="resources-toggle"
        onClick={() => setExpanded(!expanded)}
      >
        <span>📚 Дополнительные ресурсы</span>
        <span className={`arrow ${expanded ? 'expanded' : ''}`}>▼</span>
      </button>

      {expanded && (
        <div className="resources-content">
          {loading ? (
            <div className="resources-loading">
              <div className="spinner-small"></div>
              <p>Загрузка ресурсов...</p>
            </div>
          ) : (
            <div className="resources-list">
              {resources.map((resource, index) => (
                <div key={index} className="resource-item">
                  <div className="resource-icon">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="resource-info">
                    <h4>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="resource-link"
                      >
                        {resource.title}
                      </a>
                    </h4>
                    <p className="resource-description">
                      {resource.description}
                    </p>
                    <span className="resource-type">{resource.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && resources.length === 0 && (
            <div className="no-resources">
              <p>Ресурсы не найдены для этой технологии.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TechnologyResources;