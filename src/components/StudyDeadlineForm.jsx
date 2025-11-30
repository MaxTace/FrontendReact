import { useState, useEffect } from "react";
import "./StudyDeadlineForm.css";

function StudyDeadlineForm({ technologies = [], onSave, onCancel }) {
  const [formData, setFormData] = useState({
    selectedTechs: [],
    deadline: "",
    priority: "medium",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (formData.selectedTechs.length === 0) {
      newErrors.selectedTechs = "Выберите хотя бы одну технологию";
    }

    if (!formData.deadline.trim()) {
      newErrors.deadline = "Укажите срок изучения";
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (deadlineDate < today) {
        newErrors.deadline = "Срок изучения не может быть в прошлом";
      }
    }

    if (!formData.priority) {
      newErrors.priority = "Укажите приоритет изучения";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechSelection = (techId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedTechs.includes(techId);
      const newSelectedTechs = isSelected
        ? prev.selectedTechs.filter((id) => id !== techId)
        : [...prev.selectedTechs, techId];

      return {
        ...prev,
        selectedTechs: newSelectedTechs,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      const selectedTechnologies = technologies.filter((tech) =>
        formData.selectedTechs.includes(tech.id)
      );

      const submissionData = {
        ...formData,
        technologies: selectedTechnologies,
        createdAt: new Date().toISOString(),
      };

      onSave(submissionData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="study-deadline-form" noValidate>
      <h2>Установка сроков изучения технологий</h2>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {Object.keys(errors).length > 0 && "В форме есть ошибки"}
      </div>

      <div className="form-group">
        <fieldset>
          <legend className="required">Выберите технологии для изучения</legend>

          {technologies.length === 0 ? (
            <p>Нет доступных технологий</p>
          ) : (
            <div
              className="tech-selection-grid"
              role="group"
              aria-describedby={
                errors.selectedTechs ? "techs-error" : undefined
              }
            >
              {technologies.map((tech) => (
                <label key={tech.id} className="tech-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.selectedTechs.includes(tech.id)}
                    onChange={() => handleTechSelection(tech.id)}
                    className="sr-only"
                  />
                  <span
                    className={`custom-checkbox ${
                      formData.selectedTechs.includes(tech.id) ? "checked" : ""
                    }`}
                    aria-hidden="true"
                  />
                  <span className="tech-info">
                    <strong>{tech.title}</strong>
                    <span className="tech-category">{tech.category}</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </fieldset>

        {errors.selectedTechs && (
          <span
            id="techs-error"
            className="error-message"
            role="alert"
            aria-live="assertive"
          >
            {errors.selectedTechs}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="deadline" className="required">
          Срок изучения
        </label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          className={errors.deadline ? "error" : ""}
          aria-required="true"
          aria-invalid={!!errors.deadline}
          aria-describedby={errors.deadline ? "deadline-error" : undefined}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.deadline && (
          <span id="deadline-error" className="error-message" role="alert">
            {errors.deadline}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="priority" className="required">
          Приоритет изучения
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={errors.priority ? "error" : ""}
          aria-required="true"
          aria-invalid={!!errors.priority}
          aria-describedby={errors.priority ? "priority-error" : undefined}
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
          <option value="critical">Критический</option>
        </select>
        {errors.priority && (
          <span id="priority-error" className="error-message" role="alert">
            {errors.priority}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Дополнительные заметки</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Укажите дополнительные требования или комментарии..."
          aria-describedby="notes-help"
        />
        <small id="notes-help" className="help-text">
          Необязательное поле для дополнительной информации
        </small>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn-primary"
          disabled={!isFormValid}
          aria-describedby={!isFormValid ? "submit-help" : undefined}
        >
          Сохранить сроки
        </button>

        <button type="button" onClick={onCancel} className="btn-secondary">
          Отмена
        </button>
      </div>

      {!isFormValid && (
        <div
          id="submit-help"
          className="help-text"
          role="status"
          aria-live="polite"
        >
          Заполните все обязательные поля корректно, чтобы сохранить
        </div>
      )}
    </form>
  );
}

export default StudyDeadlineForm;
