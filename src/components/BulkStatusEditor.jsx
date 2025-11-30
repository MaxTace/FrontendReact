import { useState, useEffect } from "react";
import "./BulkStatusEditor.css";

function BulkStatusEditor({ technologies = [], onUpdate, onCancel }) {
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [updateReason, setUpdateReason] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const statusOptions = [
    { value: "not_started", label: "Не начато" },
    { value: "in_progress", label: "В процессе" },
    { value: "completed", label: "Завершено" },
    { value: "on_hold", label: "Приостановлено" },
    { value: "cancelled", label: "Отменено" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (selectedTechs.length === 0) {
      newErrors.selectedTechs = "Выберите технологии для обновления";
    }

    if (!newStatus) {
      newErrors.newStatus = "Выберите новый статус";
    }

    if (!updateReason.trim()) {
      newErrors.updateReason = "Укажите причину изменения";
    } else if (updateReason.trim().length < 5) {
      newErrors.updateReason = "Причина должна содержать минимум 5 символов";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [selectedTechs, newStatus, updateReason]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTechs(technologies.map((tech) => tech.id));
    } else {
      setSelectedTechs([]);
    }
  };

  const handleTechSelection = (techId) => {
    setSelectedTechs((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      const updateData = {
        techIds: selectedTechs,
        newStatus,
        updateReason: updateReason.trim(),
        updatedAt: new Date().toISOString(),
        updatedCount: selectedTechs.length,
      };

      onUpdate(updateData);
    }
  };

  const selectedTechnologies = technologies.filter((tech) =>
    selectedTechs.includes(tech.id)
  );

  return (
    <div className="bulk-status-editor">
      <form onSubmit={handleSubmit} noValidate>
        <h2>Массовое редактирование статусов</h2>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {selectedTechs.length > 0
            ? `Выбрано технологий: ${selectedTechs.length}`
            : "Технологии не выбраны"}
        </div>

        <div className="form-section">
          <h3>Выберите технологии</h3>

          <div className="selection-controls">
            <label className="select-all-label">
              <input
                type="checkbox"
                checked={
                  selectedTechs.length === technologies.length &&
                  technologies.length > 0
                }
                onChange={handleSelectAll}
                aria-label={
                  selectedTechs.length === technologies.length
                    ? "Снять выделение со всех"
                    : "Выделить все технологии"
                }
              />
              <span className="checkbox-custom" aria-hidden="true"></span>
              Выделить все ({technologies.length})
            </label>

            <span className="selected-count" role="status">
              Выбрано: {selectedTechs.length}
            </span>
          </div>

          <div
            className="tech-list"
            role="group"
            aria-labelledby="tech-selection-label"
          >
            <div id="tech-selection-label" className="sr-only">
              Список технологий для выбора
            </div>

            {technologies.map((tech) => (
              <label key={tech.id} className="tech-item">
                <input
                  type="checkbox"
                  checked={selectedTechs.includes(tech.id)}
                  onChange={() => handleTechSelection(tech.id)}
                  aria-describedby={`tech-${tech.id}-desc`}
                />
                <span className="checkbox-custom" aria-hidden="true"></span>

                <div className="tech-details">
                  <strong>{tech.title}</strong>
                  <div className="tech-meta">
                    <span className="tech-category">{tech.category}</span>
                    <span
                      className={`tech-status status-${
                        tech.status || "not_started"
                      }`}
                    >
                      {
                        statusOptions.find(
                          (s) => s.value === (tech.status || "not_started")
                        )?.label
                      }
                    </span>
                  </div>
                </div>

                <div id={`tech-${tech.id}-desc`} className="sr-only">
                  Категория: {tech.category}, Текущий статус:{" "}
                  {
                    statusOptions.find(
                      (s) => s.value === (tech.status || "not_started")
                    )?.label
                  }
                </div>
              </label>
            ))}
          </div>

          {errors.selectedTechs && (
            <span className="error-message" role="alert">
              {errors.selectedTechs}
            </span>
          )}
        </div>

        <div className="form-section">
          <h3>Новый статус</h3>

          <div
            className="status-options"
            role="group"
            aria-labelledby="status-options-label"
          >
            <div id="status-options-label" className="sr-only">
              Выберите новый статус для выбранных технологий
            </div>

            {statusOptions.map((option) => (
              <label key={option.value} className="status-option">
                <input
                  type="radio"
                  name="newStatus"
                  value={option.value}
                  checked={newStatus === option.value}
                  onChange={(e) => setNewStatus(e.target.value)}
                  aria-describedby={
                    errors.newStatus ? "status-error" : undefined
                  }
                />
                <span className="radio-custom" aria-hidden="true"></span>
                <span className={`status-badge status-${option.value}`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>

          {errors.newStatus && (
            <span id="status-error" className="error-message" role="alert">
              {errors.newStatus}
            </span>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="updateReason" className="required">
            Причина изменения статуса
          </label>
          <textarea
            id="updateReason"
            value={updateReason}
            onChange={(e) => setUpdateReason(e.target.value)}
            className={errors.updateReason ? "error" : ""}
            rows="3"
            placeholder="Опишите причину изменения статуса выбранных технологий..."
            aria-required="true"
            aria-invalid={!!errors.updateReason}
            aria-describedby={
              errors.updateReason ? "reason-error" : "reason-help"
            }
          />

          {errors.updateReason ? (
            <span id="reason-error" className="error-message" role="alert">
              {errors.updateReason}
            </span>
          ) : (
            <div id="reason-help" className="help-text">
              Обязательное поле. Минимум 5 символов
            </div>
          )}
        </div>

        {selectedTechnologies.length > 0 && (
          <div className="preview-section">
            <h3>Предпросмотр изменений</h3>
            <div className="preview-list">
              {selectedTechnologies.map((tech) => (
                <div key={tech.id} className="preview-item">
                  <strong>{tech.title}</strong>
                  <div className="status-change">
                    <span className="old-status">
                      {
                        statusOptions.find(
                          (s) => s.value === (tech.status || "not_started")
                        )?.label
                      }
                    </span>
                    <span className="change-arrow">→</span>
                    <span className="new-status">
                      {statusOptions.find((s) => s.value === newStatus)?.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={!isFormValid}
            aria-describedby={!isFormValid ? "submit-help" : undefined}
          >
            Применить изменения к {selectedTechs.length} технологиям
          </button>

          <button type="button" onClick={onCancel} className="btn-secondary">
            Отмена
          </button>
        </div>

        {!isFormValid && (
          <div id="submit-help" className="help-text" role="status">
            Заполните все поля корректно для применения изменений
          </div>
        )}
      </form>
    </div>
  );
}

export default BulkStatusEditor;
