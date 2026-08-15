import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCurrentUser = async () => {
      const accessToken = sessionStorage.getItem("accessToken");

      if (!accessToken) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const currentUser = await getCurrentUser(accessToken);
        setUserEmail(currentUser.email);
      } catch (error) {
        sessionStorage.removeItem("accessToken");
        setError(error.message);
      }
    };

    loadCurrentUser();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <main className="home-page">
      <section className="home-card">
        <div className="brand-mark">
          <span className="brand-icon">S</span>
          <span>SkillPath</span>
        </div>

        <h1>Welcome to SkillPath!</h1>

        {userEmail && (
          <p className="signed-in-user">
            Signed in as <strong>{userEmail}</strong>
          </p>
        )}

        {error && <p className="alert alert-error">{error}</p>}

        <p>You have successfully signed in.</p>
        <p>
          Your personalized learning workspace is coming next. For now, this page confirms that the complete authentication journey is working.
        </p>

        <div className="home-actions">
          <button className="secondary-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
