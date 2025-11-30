import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";

function Statistics() {
  const [stats, setStats] = useState({
    technologies: [],
    categoryStats: {},
    statusStats: {},
    overallProgress: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("technologies");
    if (saved) {
      const technologies = JSON.parse(saved);

      const categoryStats = technologies.reduce((acc, tech) => {
        acc[tech.category] = (acc[tech.category] || 0) + 1;
        return acc;
      }, {});

      const statusStats = technologies.reduce((acc, tech) => {
        acc[tech.status] = (acc[tech.status] || 0) + 1;
        return acc;
      }, {});

      const overallProgress =
        technologies.length > 0
          ? Math.round(
              technologies.reduce((sum, tech) => sum + tech.progress, 0) /
                technologies.length
            )
          : 0;

      setStats({
        technologies,
        categoryStats,
        statusStats,
        overallProgress,
      });
    }
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      frontend: "#2196F3",
      backend: "#4CAF50",
      database: "#FF9800",
      devops: "#9C27B0",
      mobile: "#F44336",
      other: "#607D8B",
    };
    return colors[category] || "#607D8B";
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Статистика</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card large">
          <h3>Общий прогресс</h3>
          <ProgressBar
            progress={stats.overallProgress}
            height={30}
            animated={true}
            color="#4CAF50"
          />
          <div className="stat-number">{stats.overallProgress}%</div>
        </div>

        <div className="stat-card">
          <h3>Всего технологий</h3>
          <div className="stat-number">{stats.technologies.length}</div>
        </div>

        <div className="stat-card">
          <h3>Завершено</h3>
          <div className="stat-number completed">
            {stats.statusStats.completed || 0}
          </div>
        </div>

        <div className="stat-card">
          <h3>В процессе</h3>
          <div className="stat-number in-progress">
            {stats.statusStats["in-progress"] || 0}
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Распределение по категориям</h3>
          <div className="chart">
            {Object.entries(stats.categoryStats).map(([category, count]) => (
              <div key={category} className="chart-item">
                <div className="chart-label">
                  <span
                    className="color-dot"
                    style={{ backgroundColor: getCategoryColor(category) }}
                  ></span>
                  {category}
                  <span className="count">({count})</span>
                </div>
                <div className="chart-bar">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(count / stats.technologies.length) * 100}%`,
                      backgroundColor: getCategoryColor(category),
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <h3>Статусы изучения</h3>
          <div className="status-chart">
            {Object.entries(stats.statusStats).map(([status, count]) => (
              <div key={status} className="status-item">
                <div className="status-info">
                  <span className="status-name">
                    {status === "completed" && "Завершено"}
                    {status === "in-progress" && "В процессе"}
                    {status === "not-started" && "Не начато"}
                  </span>
                  <span className="status-count">{count}</span>
                </div>
                <ProgressBar
                  progress={(count / stats.technologies.length) * 100}
                  height={12}
                  showPercentage={false}
                  color={
                    status === "completed"
                      ? "#4CAF50"
                      : status === "in-progress"
                      ? "#FF9800"
                      : "#F44336"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {stats.technologies.length === 0 && (
        <div className="empty-state">
          <p>Нет данных для отображения статистики.</p>
          <p>Добавьте технологии, чтобы увидеть статистику.</p>
        </div>
      )}
    </div>
  );
}

export default Statistics;
