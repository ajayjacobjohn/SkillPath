import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const registrationMessage = location.state?.message;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);
      sessionStorage.setItem("accessToken", result.access_token);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-card">
          <div className="brand-mark">
            <span className="brand-icon">S</span>
            <span>SkillPath</span>
          </div>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Sign in to continue building your personalized learning path.
          </p>

          {registrationMessage && (
            <p className="alert alert-success">{registrationMessage}</p>
          )}

          {error && <p className="alert alert-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            <button className="primary-button" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="auth-footer">
            New to SkillPath? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>

      <aside className="auth-visual">
        <div className="visual-content">
          <span className="visual-kicker">Learn with direction</span>
          <h2>Turn your experience into your next skill.</h2>
          <p>
            SkillPath helps technology professionals organize their skills and build focused learning journeys around what they want to learn next.
          </p>
        </div>
      </aside>
    </main>
  );
}

export default Login;
