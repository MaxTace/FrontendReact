import { useState } from "react";
import "./RoadmapImporter.css";

function RoadmapImporter({ onImport }) {
  const [importing, setImporting] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState("");

  const roadmapTemplates = {
    frontend: {
      name: "Frontend Development",
      technologies: [
        {
          title: "HTML5",
          description: "Семантическая верстка и современные возможности HTML",
          category: "frontend",
          status: "not-started",
        },
        {
          title: "CSS3",
          description: "Современные стили, Flexbox, Grid, анимации",
          category: "frontend",
          status: "not-started",
        },
        {
          title: "JavaScript ES6+",
          description: "Современный JavaScript с новыми возможностями",
          category: "frontend",
          status: "not-started",
        },
        {
          title: "React",
          description: "Библиотека для создания пользовательских интерфейсов",
          category: "frontend",
          status: "not-started",
        },
        {
          title: "Vue.js",
          description: "Прогрессивный фреймворк для создания интерфейсов",
          category: "frontend",
          status: "not-started",
        },
      ],
    },
    backend: {
      name: "Backend Development",
      technologies: [
        {
          title: "Node.js",
          description: "Среда выполнения JavaScript на сервере",
          category: "backend",
          status: "not-started",
        },
        {
          title: "Express.js",
          description: "Веб-фреймворк для Node.js",
          category: "backend",
          status: "not-started",
        },
        {
          title: "Python",
          description: "Универсальный язык программирования",
          category: "backend",
          status: "not-started",
        },
        {
          title: "Django",
          description: "Высокоуровневый Python фреймворк",
          category: "backend",
          status: "not-started",
        },
        {
          title: "REST API",
          description: "Проектирование и разработка RESTful API",
          category: "backend",
          status: "not-started",
        },
      ],
    },
    fullstack: {
      name: "Fullstack Development",
      technologies: [
        {
          title: "MERN Stack",
          description: "MongoDB, Express, React, Node.js",
          category: "fullstack",
          status: "not-started",
        },
        {
          title: "Authentication",
          description: "JWT, OAuth, сессии и безопасность",
          category: "fullstack",
          status: "not-started",
        },
        {
          title: "Deployment",
          description: "Деплой приложений на сервер",
          category: "fullstack",
          status: "not-started",
        },
      ],
    },
  };

  const handleImport = async (roadmapKey) => {
    setImporting(true);
    try {
      const roadmap = roadmapTemplates[roadmapKey];

      await new Promise((resolve) => setTimeout(resolve, 1500));

      for (const tech of roadmap.technologies) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        onImport(tech);
      }

      alert(
        `✅ Успешно импортировано ${roadmap.technologies.length} технологий из "${roadmap.name}"`
      );
    } catch (error) {
      alert(`❌ Ошибка импорта: ${error.message}`);
    } finally {
      setImporting(false);
      setSelectedRoadmap("");
    }
  };

  return (
    <div className="roadmap-importer">
      <h3>🗺️ Импорт дорожных карт</h3>
      <p className="importer-description">
        Выберите готовую дорожную карту для быстрого добавления технологий
      </p>

      <div className="roadmap-options">
        {Object.entries(roadmapTemplates).map(([key, roadmap]) => (
          <div key={key} className="roadmap-option">
            <h4>{roadmap.name}</h4>
            <p>{roadmap.technologies.length} технологий</p>
            <button
              onClick={() => handleImport(key)}
              disabled={importing}
              className={`import-btn ${importing ? "loading" : ""}`}
            >
              {importing && selectedRoadmap === key ? (
                <>
                  <div className="spinner-small"></div>
                  Импорт...
                </>
              ) : (
                `Импорт дорожной карты`
              )}
            </button>
          </div>
        ))}
      </div>

      {importing && (
        <div className="import-progress">
          <p>Импортируем технологии...</p>
        </div>
      )}
    </div>
  );
}

export default RoadmapImporter;
