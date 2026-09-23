import { useEffect, useState } from "react";
import { getUsers } from "../services/userApi";
import "../styles/sidebar.css";

function Sidebar({ token, onSelectUser, selectedUser }) {
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
    return (
      <aside className="sidebar">
        <p className="sidebar-message">Loading users...</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="sidebar">
        <p className="sidebar-message">{error}</p>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Messages</h2>

        <input
          className="sidebar-search"
          type="text"
          placeholder="Search users..."
        />
      </div>

      <div className="user-list">
        {users.map((user) => (
          <button
            className={`user-button ${
              selectedUser?.id === user.id ? "active" : ""
            }`}
            key={user.id}
            type="button"
            onClick={() => onSelectUser(user)}
          >
            <span className="user-avatar">
              {user.firstName.charAt(0)}
            </span>

            <span className="user-name">
              {user.firstName} {user.lastName}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;