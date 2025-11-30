import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (username === "admin" && password === "password") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        if (onLogin) {
          onLogin(username);
        }

        navigate("/");
      } else {
        setError("Неверные данные для входа. Используйте admin/password");
      }
    } catch (err) {
      setError("Произошла ошибка при входе");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 Вход в систему</h1>
          <p>Введите ваши учетные данные для доступа к трекеру</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                Вход...
              </>
            ) : (
              "Войти"
            )}
          </button>
        </form>

        <div className="login-hint">
          <h3>Тестовые данные:</h3>
          <p>
            <strong>Логин:</strong> admin
          </p>
          <p>
            <strong>Пароль:</strong> password
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
