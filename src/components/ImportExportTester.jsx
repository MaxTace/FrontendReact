import { useState, useEffect } from "react";
import "./ImportExportTester.css";

function ImportExportTester() {
  const [technologies, setTechnologies] = useState([]);
  const [testResults, setTestResults] = useState({
    export: { success: false, message: "" },
    import: { success: false, message: "" },
    validation: { success: false, message: "" },
  });
  const [importedData, setImportedData] = useState(null);

  const sampleTechnologies = [
    {
      id: 1,
      title: "React Hooks",
      description: "Изучение хуков useState и useEffect",
      category: "frontend",
      difficulty: "intermediate",
      status: "in_progress",
      deadline: "2024-12-31",
      resources: ["https://react.dev", "https://example.com/tutorial"],
    },
    {
      id: 2,
      title: "Node.js Express",
      description: "Создание серверных приложений на Express",
      category: "backend",
      difficulty: "beginner",
      status: "not_started",
      deadline: "2024-11-30",
      resources: ["https://expressjs.com"],
    },
    {
      id: 3,
      title: "MongoDB Aggregation",
      description: "Сложные запросы с использованием агрегации",
      category: "database",
      difficulty: "advanced",
      status: "completed",
      deadline: "2024-10-15",
      resources: ["https://docs.mongodb.com", "https://university.mongodb.com"],
    },
  ];

  useEffect(() => {
    setTechnologies(sampleTechnologies);
  }, []);

  const testExport = () => {
    try {
      const dataStr = JSON.stringify(technologies, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      JSON.parse(dataStr);

      if (dataBlob.type !== "application/json") {
        throw new Error("Неверный MIME тип");
      }

      if (dataBlob.size === 0) {
        throw new Error("Пустой файл");
      }

      setTestResults((prev) => ({
        ...prev,
        export: {
          success: true,
          message: `Экспорт успешен: ${dataBlob.size} байт, валидный JSON`,
        },
      }));

      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "test_export_technologies.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        export: {
          success: false,
          message: `Ошибка экспорта: ${error.message}`,
        },
      }));
    }
  };

  const testValidImport = () => {
    const validData = JSON.stringify(sampleTechnologies, null, 2);
    testImportImplementation(validData, true);
  };

  const testInvalidImport = () => {
    const invalidData = '{ "invalid": "json", missingBracket: ';
    testImportImplementation(invalidData, false);
  };

  const testMalformedImport = () => {
    const malformedData = JSON.stringify({
      notAnArray: true,
      wrongStructure: "Это не массив технологий",
    });
    testImportImplementation(malformedData, false);
  };

  const testImportImplementation = (data, shouldSucceed) => {
    try {
      const file = new Blob([data], { type: "application/json" });
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);

          if (!Array.isArray(imported)) {
            throw new Error("Данные должны быть массивом");
          }

          const hasRequiredFields = imported.every(
            (item) =>
              item &&
              typeof item.title === "string" &&
              typeof item.category === "string"
          );

          if (!hasRequiredFields && shouldSucceed) {
            throw new Error("Отсутствуют обязательные поля");
          }

          if (shouldSucceed) {
            setImportedData(imported);
            setTestResults((prev) => ({
              ...prev,
              import: {
                success: true,
                message: `Импорт успешен: ${imported.length} технологий, структура корректна`,
              },
              validation: {
                success: true,
                message: "Валидация данных пройдена",
              },
            }));
          } else {
            throw new Error("Ожидалась ошибка, но импорт прошел успешно");
          }
        } catch (error) {
          if (!shouldSucceed) {
            setTestResults((prev) => ({
              ...prev,
              import: {
                success: false,
                message: `Импорт отклонен (ожидаемо): ${error.message}`,
              },
              validation: {
                success: true,
                message: "Валидация корректно обнаружила ошибку",
              },
            }));
          } else {
            throw error;
          }
        }
      };

      reader.onerror = () => {
        throw new Error("Ошибка чтения файла");
      };

      reader.readAsText(file);
    } catch (error) {
      if (shouldSucceed) {
        setTestResults((prev) => ({
          ...prev,
          import: {
            success: false,
            message: `Ошибка импорта: ${error.message}`,
          },
          validation: {
            success: false,
            message: "Валидация не пройдена",
          },
        }));
      }
    }
  };

  const testLargeDataImport = () => {
    const largeData = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      title: `Технология ${i + 1}`,
      description: `Описание технологии ${i + 1}`,
      category: i % 2 === 0 ? "frontend" : "backend",
      difficulty: ["beginner", "intermediate", "advanced"][i % 3],
      status: ["not_started", "in_progress", "completed"][i % 3],
      resources: [`https://example.com/tech${i + 1}`],
    }));

    testImportImplementation(JSON.stringify(largeData), true);
  };

  const handleManualImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setTestResults((prev) => ({
        ...prev,
        import: {
          success: false,
          message: "Файл слишком большой (максимум 5MB)",
        },
      }));
      return;
    }

    if (file.type !== "application/json") {
      setTestResults((prev) => ({
        ...prev,
        import: {
          success: false,
          message: "Неверный тип файла. Требуется JSON",
        },
      }));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);

        const validationErrors = validateImportedData(imported);

        if (validationErrors.length > 0) {
          throw new Error(validationErrors.join(", "));
        }

        setImportedData(imported);
        setTechnologies(imported);

        setTestResults((prev) => ({
          ...prev,
          import: {
            success: true,
            message: `Ручной импорт успешен: ${imported.length} технологий`,
          },
          validation: {
            success: true,
            message: "Расширенная валидация пройдена",
          },
        }));
      } catch (error) {
        setTestResults((prev) => ({
          ...prev,
          import: {
            success: false,
            message: `Ошибка ручного импорта: ${error.message}`,
          },
          validation: {
            success: false,
            message: "Валидация не пройдена",
          },
        }));
      }
    };

    reader.readAsText(file);
    event.target.value = "";
  };

  const validateImportedData = (data) => {
    const errors = [];

    if (!Array.isArray(data)) {
      errors.push("Данные должны быть массивом");
      return errors;
    }

    data.forEach((item, index) => {
      if (!item || typeof item !== "object") {
        errors.push(`Элемент ${index}: не объект`);
        return;
      }

      if (!item.title || typeof item.title !== "string") {
        errors.push(`Элемент ${index}: некорректное название`);
      }

      if (!item.category || typeof item.category !== "string") {
        errors.push(`Элемент ${index}: некорректная категория`);
      }

      if (item.resources && !Array.isArray(item.resources)) {
        errors.push(`Элемент ${index}: ресурсы должны быть массивом`);
      }

      if (item.resources) {
        item.resources.forEach((resource, resIndex) => {
          if (resource && typeof resource === "string") {
            try {
              new URL(resource);
            } catch {
              errors.push(
                `Элемент ${index}, ресурс ${resIndex}: некорректный URL`
              );
            }
          }
        });
      }
    });

    return errors;
  };

  const resetTests = () => {
    setTestResults({
      export: { success: false, message: "" },
      import: { success: false, message: "" },
      validation: { success: false, message: "" },
    });
    setImportedData(null);
    setTechnologies(sampleTechnologies);
  };

  return (
    <div className="import-export-tester">
      <h1>Тестирование экспорта и импорта данных</h1>

      <div className="test-status">
        <div
          className={`status-item ${
            testResults.export.success ? "success" : "error"
          }`}
        >
          <strong>Экспорт:</strong>{" "}
          {testResults.export.message || "Не тестировался"}
        </div>
        <div
          className={`status-item ${
            testResults.import.success ? "success" : "error"
          }`}
        >
          <strong>Импорт:</strong>{" "}
          {testResults.import.message || "Не тестировался"}
        </div>
        <div
          className={`status-item ${
            testResults.validation.success ? "success" : "error"
          }`}
        >
          <strong>Валидация:</strong>{" "}
          {testResults.validation.message || "Не тестировалась"}
        </div>
      </div>

      <div className="test-section">
        <h2>Тесты экспорта</h2>
        <div className="test-buttons">
          <button onClick={testExport} className="btn-test">
            Тест экспорта JSON
          </button>
        </div>
      </div>

      <div className="test-section">
        <h2>Тесты импорта</h2>
        <div className="test-buttons">
          <button onClick={testValidImport} className="btn-test">
            Тест с валидными данными
          </button>
          <button onClick={testInvalidImport} className="btn-test">
            Тест с невалидным JSON
          </button>
          <button onClick={testMalformedImport} className="btn-test">
            Тест с некорректной структурой
          </button>
          <button onClick={testLargeDataImport} className="btn-test">
            Тест с большими данными
          </button>
        </div>

        <div className="manual-import">
          <h3>Ручной импорт файла</h3>
          <label className="file-input-label">
            Выберите JSON файл
            <input type="file" accept=".json" onChange={handleManualImport} />
          </label>
        </div>
      </div>

      {importedData && (
        <div className="import-results">
          <h2>Результаты импорта</h2>
          <div className="results-info">
            <p>
              Импортировано технологий: <strong>{importedData.length}</strong>
            </p>
            <div className="categories-breakdown">
              <h4>Распределение по категориям:</h4>
              {Object.entries(
                importedData.reduce((acc, tech) => {
                  acc[tech.category] = (acc[tech.category] || 0) + 1;
                  return acc;
                }, {})
              ).map(([category, count]) => (
                <span key={category} className="category-tag">
                  {category}: {count}
                </span>
              ))}
            </div>
          </div>

          <div className="imported-list">
            <h4>Импортированные технологии:</h4>
            {importedData.slice(0, 10).map((tech) => (
              <div key={tech.id} className="imported-item">
                <strong>{tech.title}</strong> - {tech.category}
                {tech.difficulty && ` (${tech.difficulty})`}
              </div>
            ))}
            {importedData.length > 10 && (
              <p>... и еще {importedData.length - 10} технологий</p>
            )}
          </div>
        </div>
      )}

      <div className="source-data">
        <h2>Исходные тестовые данные</h2>
        <div className="data-preview">
          <pre>{JSON.stringify(technologies, null, 2)}</pre>
        </div>
      </div>

      <div className="test-controls">
        <button onClick={resetTests} className="btn-reset">
          Сбросить все тесты
        </button>
      </div>
    </div>
  );
}

export default ImportExportTester;
