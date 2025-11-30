import { useState } from "react";
import Modal from "./Modal";

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState(technology.notes);

  const handleStatusChange = (newStatus) => {
    onStatusChange(technology.id, newStatus);
  };

  const handleSaveNotes = () => {
    onNotesChange(technology.id, notes);
    setShowNotesModal(false);
  };

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
    <div className="technology-card">
      <div className="tech-header">
        <h3>{technology.title}</h3>
        <span
          className="status-badge"
          style={{ backgroundColor: getStatusColor(technology.status) }}
        >
          {technology.status === "completed" && "Завершено"}
          {technology.status === "in-progress" && "В процессе"}
          {technology.status === "not-started" && "Не начато"}
        </span>
      </div>

      <p className="tech-description">{technology.description}</p>

      <div className="tech-category">
        Категория: <strong>{technology.category}</strong>
      </div>

      <div className="tech-actions">
        <select
          value={technology.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="status-select"
        >
          <option value="not-started">Не начато</option>
          <option value="in-progress">В процессе</option>
          <option value="completed">Завершено</option>
        </select>

        <button onClick={() => setShowNotesModal(true)} className="notes-btn">
          📝 Заметки
        </button>
      </div>

      <Modal
        isOpen={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        title={`Заметки: ${technology.title}`}
      >
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Добавьте заметки по этой технологии..."
          rows="6"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={() => setShowNotesModal(false)}>Отмена</button>
          <button
            onClick={handleSaveNotes}
            style={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            Сохранить
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TechnologyCard;
