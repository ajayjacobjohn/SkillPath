import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
