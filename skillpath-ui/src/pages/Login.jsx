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
    <div>
      <h1>SkillPath Login</h1>

      <p>Welcome back!</p>

      <form onSubmit={handleSubmit}>
        <div>
            {registrationMessage && (
                <p>{registrationMessage}</p>
            )}
          <label>Email Address</label>
          <input type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)} />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
           />
        </div>
        
        {error && <p>{error}</p>}
        <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>
      <p>
        New User? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;