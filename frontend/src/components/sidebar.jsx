import { useEffect, useState } from "react";
import { getUsers } from "../services/userApi";

function Sidebar({ token, onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [token]);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <aside>
      <h2>Users</h2>

      <input type="text" placeholder="Search users..." />

      <div>
        {users.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => onSelectUser(user)}
          >
            {user.firstName} {user.lastName}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;