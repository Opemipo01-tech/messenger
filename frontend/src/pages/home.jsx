import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/authApi";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Hello, {user.firstName}</h1>

      <p>Welcome to the messaging app.</p>
    </main>
  );
}

export default Home;