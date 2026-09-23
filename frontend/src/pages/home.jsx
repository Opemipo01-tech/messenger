import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getCurrentUser } from "../services/authApi";
import Sidebar from "../components/sidebar";
import Chat from "../components/chat";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await getCurrentUser(token);

        setUser(data.user);
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleSelectUser(user) {
    setSelectedUser(user);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="home-page">
      <Sidebar
        onSelectUser={handleSelectUser}
        selectedUser={selectedUser}
        token={localStorage.getItem("token")}
      />

      <section className="home-main">
        <header className="home-header">
          <h1>Hello, {user.firstName}</h1>

          <div className="home-header-actions">
            <Link to="/profile" className="profile-button">
              Profile
            </Link>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="home-content">
          <Chat selectedUser={selectedUser} 
                currentUser={user}
          />
        </div>
      </section>
    </main>
  );
}

export default Home;