import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTechnology() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "frontend",
    status: "not-started",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = localStorage.getItem("technologies");
    const technologies = saved ? JSON.parse(saved) : [];

    const newTechnology = {
      ...formData,
      id: Date.now(),
      progress:
        formData.status === "completed"
          ? 100
          : formData.status === "in-progress"
          ? 50
          : 0,
    };

    technologies.push(newTechnology);
    localStorage.setItem("technologies", JSON.stringify(technologies));

    navigate("/technologies");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добавить технологию</h1>
      </div>

      <form onSubmit={handleSubmit} className="tech-form">
        <div className="form-group">
          <label htmlFor="title">Название технологии *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Например: React, Node.js, MongoDB"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Опишите, что вы планируете изучить..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="frontend">Фронтенд</option>
              <option value="backend">Бэкенд</option>
              <option value="database">Базы данных</option>
              <option value="devops">DevOps</option>
              <option value="mobile">Мобильная разработка</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Статус</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="not-started">Не начато</option>
              <option value="in-progress">В процессе</option>
              <option value="completed">Завершено</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Заметки</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Дополнительные заметки..."
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/technologies")}
            className="btn btn-secondary"
          >
            Отмена
          </button>
          <button type="submit" className="btn btn-primary">
            Добавить технологию
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;
