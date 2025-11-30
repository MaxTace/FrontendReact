import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import "./Home.css";

function Home() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("technologies");
    if (saved) {
      const technologies = JSON.parse(saved);
      setStats({
        total: technologies.length,
        completed: technologies.filter((t) => t.status === "completed").length,
        inProgress: technologies.filter((t) => t.status === "in-progress")
          .length,
        notStarted: technologies.filter((t) => t.status === "not-started")
          .length,
      });
    }
  }, []);

  const overallProgress =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="page">
      <div className="hero-section">
        <h1>Добро пожаловать в Трекер технологий!</h1>
        <p>Отслеживайте ваш прогресс в изучении новых технологий</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>Общий прогресс</h3>
          <ProgressBar progress={overallProgress} height={20} animated={true} />
          <span className="stat-number">{overallProgress}%</span>
        </div>

        <div className="stat-card">
          <h3>Всего технологий</h3>
          <span className="stat-number">{stats.total}</span>
        </div>

        <div className="stat-card">
          <h3>Завершено</h3>
          <span className="stat-number completed">{stats.completed}</span>
        </div>

        <div className="stat-card">
          <h3>В процессе</h3>
          <span className="stat-number in-progress">{stats.inProgress}</span>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/technologies" className="action-btn primary">
          📚 Все технологии
        </Link>
        <Link to="/add-technology" className="action-btn secondary">
          ➕ Добавить технологию
        </Link>
        <Link to="/statistics" className="action-btn tertiary">
          📊 Статистика
        </Link>
      </div>

      <div className="features">
        <h2>Возможности приложения:</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>📝 Учет технологий</h3>
            <p>Добавляйте и отслеживайте технологии, которые хотите изучить</p>
          </div>
          <div className="feature">
            <h3>📈 Отслеживание прогресса</h3>
            <p>
              Наблюдайте за вашим прогрессом с помощью визуальных индикаторов
            </p>
          </div>
          <div className="feature">
            <h3>🗂️ Категоризация</h3>
            <p>
              Организуйте технологии по категориям: фронтенд, бэкенд, базы
              данных
            </p>
          </div>
          <div className="feature">
            <h3>📊 Аналитика</h3>
            <p>Получайте подробную статистику по вашему обучению</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
