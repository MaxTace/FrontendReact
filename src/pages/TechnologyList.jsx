import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";

function TechnologyList() {
  const [technologies, setTechnologies] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("technologies");
    if (saved) {
      setTechnologies(JSON.parse(saved));
    }
  }, []);

  const filteredTechnologies =
    filter === "all"
      ? technologies
      : technologies.filter((tech) => tech.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#4CAF50";
      case "in-progress":
        return "#FF9800";
      case "not-started":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Все ({technologies.length})
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Завершено (
          {technologies.filter((t) => t.status === "completed").length})
        </button>
        <button
          className={filter === "in-progress" ? "active" : ""}
          onClick={() => setFilter("in-progress")}
        >
          В процессе (
          {technologies.filter((t) => t.status === "in-progress").length})
        </button>
        <button
          className={filter === "not-started" ? "active" : ""}
          onClick={() => setFilter("not-started")}
        >
          Не начато (
          {technologies.filter((t) => t.status === "not-started").length})
        </button>
      </div>

      <div className="technologies-grid">
        {filteredTechnologies.map((tech) => (
          <div key={tech.id} className="technology-item">
            <div className="tech-header">
              <h3>{tech.title}</h3>
              <span
                className="status-badge"
                style={{ backgroundColor: getStatusColor(tech.status) }}
              >
                {tech.status === "completed" && "Завершено"}
                {tech.status === "in-progress" && "В процессе"}
                {tech.status === "not-started" && "Не начато"}
              </span>
            </div>

            <p className="tech-description">{tech.description}</p>

            <div className="tech-meta">
              <span className="category">Категория: {tech.category}</span>
              <ProgressBar
                progress={tech.progress}
                height={8}
                showPercentage={false}
              />
            </div>

            <div className="tech-actions">
              <Link to={`/technology/${tech.id}`} className="btn-link">
                Подробнее →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {technologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      )}
    </div>
  );
}

export default TechnologyList;
