import { useState, useEffect, useRef } from "react";
import useApi from "../hooks/useApi";
import "./TechnologySearch.css";

function TechnologySearch({ onTechnologySelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [localResults, setLocalResults] = useState([]);
  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const localTechnologies = [
    {
      name: "React",
      category: "frontend",
      description: "JavaScript библиотека для UI",
    },
    {
      name: "Vue",
      category: "frontend",
      description: "Прогрессивный фреймворк",
    },
    {
      name: "Angular",
      category: "frontend",
      description: "Фреймворк от Google",
    },
    {
      name: "Node.js",
      category: "backend",
      description: "JavaScript на сервере",
    },
    {
      name: "Express",
      category: "backend",
      description: "Фреймворк для Node.js",
    },
    { name: "Django", category: "backend", description: "Python фреймворк" },
    { name: "MySQL", category: "database", description: "Реляционная БД" },
    { name: "MongoDB", category: "database", description: "NoSQL база данных" },
    {
      name: "PostgreSQL",
      category: "database",
      description: "Продвинутая SQL БД",
    },
    {
      name: "Docker",
      category: "devops",
      description: "Контейнеризация приложений",
    },
    {
      name: "Kubernetes",
      category: "devops",
      description: "Оркестрация контейнеров",
    },
    {
      name: "AWS",
      category: "devops",
      description: "Облачная платформа Amazon",
    },
    {
      name: "TypeScript",
      category: "language",
      description: "Типизированный JavaScript",
    },
    {
      name: "Python",
      category: "language",
      description: "Высокоуровневый язык",
    },
    { name: "Go", category: "language", description: "Язык от Google" },
  ];

  const searchLocal = (query) => {
    if (!query.trim()) {
      setLocalResults([]);
      return;
    }

    const results = localTechnologies.filter(
      (tech) =>
        tech.name.toLowerCase().includes(query.toLowerCase()) ||
        tech.description.toLowerCase().includes(query.toLowerCase()) ||
        tech.category.toLowerCase().includes(query.toLowerCase())
    );

    setLocalResults(results);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchLocal(value);
    }, 400);
  };

  const handleSelectTechnology = (tech) => {
    const newTech = {
      title: tech.name,
      description: tech.description,
      category: tech.category,
      status: "not-started",
      notes: `Добавлено из поиска: ${tech.name}`,
    };

    onTechnologySelect(newTech);
    setSearchTerm("");
    setLocalResults([]);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="technology-search">
      <h3>🔍 Поиск технологий</h3>

      <div className="search-container">
        <input
          type="text"
          placeholder="Введите название технологии..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setLocalResults([]);
            }}
            className="clear-search"
          >
            ✕
          </button>
        )}
      </div>

      {localResults.length > 0 && (
        <div className="search-results">
          <h4>Найдено технологий: {localResults.length}</h4>
          <div className="results-list">
            {localResults.map((tech, index) => (
              <div
                key={index}
                className="result-item"
                onClick={() => handleSelectTechnology(tech)}
              >
                <div className="result-header">
                  <span className="tech-name">{tech.name}</span>
                  <span className={`tech-category ${tech.category}`}>
                    {tech.category}
                  </span>
                </div>
                <p className="tech-description">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchTerm && localResults.length === 0 && (
        <div className="no-results">
          <p>Технологии не найдены. Попробуйте другой запрос.</p>
        </div>
      )}
    </div>
  );
}

export default TechnologySearch;
