import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getCurrentUser } from "../services/authApi";
import Sidebar from "../components/sidebar";
import Chat from "../components/chat";
import "../styles/home.css";
import { socket } from "../services/socket";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mobileView, setMobileView] = useState("users");
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

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  // Send the JWT during the Socket.IO handshake.
  socket.auth = { token };

  function handleConnect() {
    console.log("Socket connected:", socket.id);
  }

  function handleConnectError(error) {
    console.error("Socket connection failed:", error.message);
  }

  socket.on("connect", handleConnect);
  socket.on("connect_error", handleConnectError);

  socket.connect();

  return () => {
    socket.off("connect", handleConnect);
    socket.off("connect_error", handleConnectError);
    socket.disconnect();
  };
}, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleSelectUser(user) {
    setSelectedUser(user);
    setMobileView("chat");
  }

  function handleBackToUsers() {
    setMobileView("users");
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="home-page">
      <div
        className={`mobile-view ${
          mobileView === "users"
            ? "mobile-view--active"
            : ""
        }`}
      >
        <Sidebar
          onSelectUser={handleSelectUser}
          selectedUser={selectedUser}
          token={localStorage.getItem("token")}
        />
      </div>

      <section
        className={`home-main ${
          mobileView === "chat"
            ? "home-main--mobile-active"
            : ""
        }`}
      >
        <header className="home-header">
          <h1>Hello, {user.firstName}</h1>

          <div className="home-header-actions">
            <Link
              to="/profile"
              className="profile-button"
            >
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
          <Chat
            selectedUser={selectedUser}
            currentUser={user}
            onBack={handleBackToUsers}
          />
        </div>
      </section>
    </main>
  );
}

export default Home;