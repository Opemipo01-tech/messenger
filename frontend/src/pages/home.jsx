import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/authApi";
import Sidebar from "../components/sidebar";
import Chat from "../components/chat";

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
    <main>
      <Sidebar onSelectUser={handleSelectUser}
        token={localStorage.getItem("token")}
      />

      <section>
        <h1>Hello, {user.firstName}</h1>

        <Chat selectedUser={selectedUser} />

        <button onClick={handleLogout}>
          Logout
        </button>
      </section>
    </main>
  );
}

export default Home;