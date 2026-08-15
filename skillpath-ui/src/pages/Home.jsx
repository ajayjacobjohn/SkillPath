import {useNavigate} from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to SkillPath!</h1>
        <p>You have successfully signed in.</p>
        <p>Your learning journey starts here.</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
    );
}

export default Home;