import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const [technology, setTechnology] = useState(null);
  {
    technology && (
      <div className="detail-section">
        <TechnologyResources technology={technology} />
      </div>
    );
  }

  useEffect(() => {
    const saved = localStorage.getItem("technologies");
    if (saved) {
      const technologies = JSON.parse(saved);
      const tech = technologies.find((t) => t.id === parseInt(techId));
      setTechnology(tech);
    }
  }, [techId]);

  const updateStatus = (newStatus) => {
    const saved = localStorage.getItem("technologies");
    if (saved) {
      const technologies = JSON.parse(saved);
      const progress =
        newStatus === "completed" ? 100 : newStatus === "in-progress" ? 50 : 0;
      const updated = technologies.map((tech) =>
        tech.id === parseInt(techId)
          ? { ...tech, status: newStatus, progress }
          : tech
      );
      localStorage.setItem("technologies", JSON.stringify(updated));
      setTechnology({ ...technology, status: newStatus, progress });
    }
  };

  const deleteTechnology = () => {
    const saved = localStorage.getItem("technologies");
    if (saved) {
      const technologies = JSON.parse(saved);
      const updated = technologies.filter(
        (tech) => tech.id !== parseInt(techId)
      );
      localStorage.setItem("technologies", JSON.stringify(updated));
      navigate("/technologies");
    }
  };

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {techId} не существует.</p>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <div className="header-actions">
          <button onClick={deleteTechnology} className="btn btn-danger">
            Удалить
          </button>
        </div>
      </div>

      <div className="technology-detail">
        <div className="detail-header">
          <h1>{technology.title}</h1>
          <span className={`status status-${technology.status}`}>
            {technology.status === "completed" && "Завершено"}
            {technology.status === "in-progress" && "В процессе"}
            {technology.status === "not-started" && "Не начато"}
          </span>
        </div>

        <div className="progress-section">
          <ProgressBar
            progress={technology.progress}
            label="Прогресс изучения"
            height={20}
            animated={true}
          />
        </div>

        <div className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </div>

        <div className="detail-section">
          <h3>Категория</h3>
          <p className="category-tag">{technology.category}</p>
        </div>

        <div className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            <button
              onClick={() => updateStatus("not-started")}
              className={technology.status === "not-started" ? "active" : ""}
            >
              Не начато
            </button>
            <button
              onClick={() => updateStatus("in-progress")}
              className={technology.status === "in-progress" ? "active" : ""}
            >
              В процессе
            </button>
            <button
              onClick={() => updateStatus("completed")}
              className={technology.status === "completed" ? "active" : ""}
            >
              Завершено
            </button>
          </div>
        </div>

        {technology.notes && (
          <div className="detail-section">
            <h3>Мои заметки</h3>
            <div className="notes-content">{technology.notes}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologyDetail;
