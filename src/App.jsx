import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import TechnologyList from "./pages/TechnologyList";
import TechnologyDetail from "./pages/TechnologyDetail";
import AddTechnology from "./pages/AddTechnology";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import useTechnologiesApi from "./hooks/useTechnologiesApi";
import TechnologySearch from "./components/TechnologySearch";
import RoadmapImporter from "./components/RoadmapImporter";
import StudyDeadlineForm from "./components/StudyDeadlineForm";
import BulkStatusEditor from "./components/BulkStatusEditor";
import ImportExportTester from "./components/ImportExportTester";
import NotificationDemo from "./components/NotificationDemo";
import ResponsiveTestSuite from "./components/ResponsiveTestSuite";
import { createAppTheme } from "./themes/theme";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const {
    technologies,
    loading,
    error,
    refetch,
    addTechnology,
    updateTechnology,
    deleteTechnology,
  } = useTechnologiesApi();

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const user = localStorage.getItem("username") || "";
      const savedDarkMode = localStorage.getItem("darkMode") === "true";

      setIsLoggedIn(loggedIn);
      setUsername(user);
      setDarkMode(savedDarkMode);
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const theme = useMemo(() => createAppTheme(darkMode), [darkMode]);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleAddTechnology = async (techData) => {
    try {
      await addTechnology(techData);
    } catch (err) {
      alert("Ошибка при добавлении технологии: " + err.message);
    }
  };

  const handleImportRoadmap = async (techData) => {
    try {
      await addTechnology(techData);
    } catch (err) {
      alert("Ошибка при импорте технологии: " + err.message);
    }
  };

  const handleSaveDeadlines = (deadlineData) => {
    console.log("Сохранение сроков изучения:", deadlineData);
    alert(
      `Сроки изучения сохранены для ${deadlineData.technologies.length} технологий`
    );
  };

  const handleBulkStatusUpdate = (updateData) => {
    console.log("Массовое обновление статусов:", updateData);
    updateData.techIds.forEach((techId) => {
      updateTechnology(techId, {
        status: updateData.newStatus,
        lastUpdated: updateData.updatedAt,
      });
    });
    alert(`Статусы обновлены для ${updateData.updatedCount} технологий`);
  };

  if (!authChecked) {
    return (
      <div className="app-loading">
        <div className="spinner-large"></div>
        <p>Загрузка приложения...</p>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navigation
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={handleLogout}
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
          />

          <main className="main-content">
            <Routes>
              {/* Публичные маршруты */}
              <Route
                path="/"
                element={
                  <Home
                    technologies={technologies}
                    loading={loading}
                    error={error}
                    onRefresh={refetch}
                  />
                }
              />

              <Route path="/login" element={<Login onLogin={handleLogin} />} />

              <Route
                path="/technologies"
                element={
                  <TechnologyList
                    technologies={technologies}
                    onUpdateTechnology={updateTechnology}
                    onDeleteTechnology={deleteTechnology}
                    loading={loading}
                  />
                }
              />

              <Route
                path="/technology/:techId"
                element={
                  <TechnologyDetail
                    technologies={technologies}
                    onUpdateTechnology={updateTechnology}
                    onDeleteTechnology={deleteTechnology}
                  />
                }
              />

              <Route
                path="/statistics"
                element={<Statistics technologies={technologies} />}
              />

              <Route
                path="/study-deadlines"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <StudyDeadlineForm
                      technologies={technologies}
                      onSave={handleSaveDeadlines}
                      onCancel={() => window.history.back()}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/bulk-status-edit"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <BulkStatusEditor
                      technologies={technologies}
                      onUpdate={handleBulkStatusUpdate}
                      onCancel={() => window.history.back()}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/import-export-test"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <ImportExportTester />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/notification-demo"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <NotificationDemo />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/responsive-test"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <ResponsiveTestSuite />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-technology"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <AddTechnology onAddTechnology={handleAddTechnology} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Settings technologies={technologies} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="*"
                element={
                  <div
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      minHeight: "60vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "4rem",
                        marginBottom: "1rem",
                        background: "linear-gradient(45deg, #1976d2, #dc004e)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      404
                    </h1>
                    <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
                      Запрошенная страница не существует.
                    </p>
                    <a
                      href="/"
                      style={{
                        background: "linear-gradient(135deg, #1976d2, #1565c0)",
                        color: "white",
                        padding: "12px 32px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "600",
                        boxShadow: "0 4px 14px rgba(25, 118, 210, 0.3)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Вернуться на главную
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
