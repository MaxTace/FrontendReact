import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    theme: "light",
    language: "ru",
    notifications: true,
    autoSave: true,
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("appSettings", JSON.stringify(newSettings));
  };

  const exportData = () => {
    const technologies = localStorage.getItem("technologies");
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies ? JSON.parse(technologies) : [],
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `technologies-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.technologies) {
            localStorage.setItem(
              "technologies",
              JSON.stringify(data.technologies)
            );
            alert("Данные успешно импортированы!");
            window.location.reload();
          }
        } catch (error) {
          alert("Ошибка при импорте данных: неверный формат файла");
        }
      };
      reader.readAsText(file);
    }
  };

  const resetData = () => {
    if (
      window.confirm(
        "Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить."
      )
    ) {
      localStorage.removeItem("technologies");
      alert("Данные сброшены");
      window.location.reload();
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Настройки</h1>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h3>Внешний вид</h3>
          <div className="setting-item">
            <label>Тема оформления</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange("theme", e.target.value)}
            >
              <option value="light">Светлая</option>
              <option value="dark">Темная</option>
              <option value="auto">Авто</option>
            </select>
          </div>

          <div className="setting-item">
            <label>Язык интерфейса</label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>Уведомления</h3>
          <div className="setting-item toggle">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) =>
                  handleSettingChange("notifications", e.target.checked)
                }
              />
              Включить уведомления
            </label>
          </div>

          <div className="setting-item toggle">
            <label>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) =>
                  handleSettingChange("autoSave", e.target.checked)
                }
              />
              Автосохранение
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Управление данными</h3>
          <div className="setting-item">
            <button onClick={exportData} className="btn btn-primary">
              Экспорт данных
            </button>
            <p className="setting-description">
              Скачайте резервную копию ваших технологий
            </p>
          </div>

          <div className="setting-item">
            <label className="file-input-label">
              Импорт данных
              <input
                type="file"
                accept=".json"
                onChange={importData}
                style={{ display: "none" }}
              />
              <span className="btn btn-secondary">Выбрать файл</span>
            </label>
            <p className="setting-description">
              Загрузите ранее экспортированные данные
            </p>
          </div>

          <div className="setting-item">
            <button onClick={resetData} className="btn btn-danger">
              Сбросить все данные
            </button>
            <p className="setting-description warning">
              Внимание: это действие нельзя отменить!
            </p>
          </div>
        </div>

        <div className="settings-section">
          <h3>О приложении</h3>
          <div className="about-info">
            <p>
              <strong>Версия:</strong> 1.0.0
            </p>
            <p>
              <strong>Разработчик:</strong> Трекер технологий
            </p>
            <p>
              <strong>Описание:</strong> Приложение для отслеживания прогресса
              изучения технологий
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
