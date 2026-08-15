import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/authService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, confirmPassword);
      navigate("/login", {
        state: {
          message: "Registration successful. Please log in with your credentials.",
        },
      });
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

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Join SkillPath and start shaping a learning journey around your experience and goals.
          </p>

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
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
            </div>

            <button className="primary-button" type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-footer">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>

      <aside className="auth-visual">
        <div className="visual-content">
          <span className="visual-kicker">Your learning, personalized</span>
          <h2>Build on what you know. Focus on what comes next.</h2>
          <p>
            Create your SkillPath profile today. Soon, your skills and experience will help shape focused learning recommendations made for you.
          </p>
        </div>
      </aside>
    </main>
  );
}

export default Register;
