import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/authApi";
import Sidebar from "../components/sidebar";

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

      <section>
        <h1>Hello, {user.firstName}</h1>

        <p>Welcome to the messaging app.</p>

        {selectedUser && (
          <div>
            <h2>
              Selected user: {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </h2>

            <p>@{selectedUser.username}</p>
          </div>
        )}
        
      <Sidebar 
       token={localStorage.getItem("token")}
      onSelectUser={handleSelectUser} />

        <button onClick={handleLogout}>
          Logout
        </button>
      </section>
    </main>
  );
}

export default Home;