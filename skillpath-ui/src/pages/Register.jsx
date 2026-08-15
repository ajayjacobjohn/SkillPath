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
    <div>
      <h1>Create your SkillPath account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}    />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;