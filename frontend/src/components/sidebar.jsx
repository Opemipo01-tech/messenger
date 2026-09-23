import { useEffect, useState } from "react";
import { getUsers } from "../services/userApi";
import "../styles/sidebar.css";

function Sidebar({
  token,
  onSelectUser,
  selectedUser,
}) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const data = await getUsers(token, search);
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [token, search]);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Messages</h2>

        <input
          className="sidebar-search"
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading && (
        <p className="sidebar-message">
          Loading users...
        </p>
      )}

      {error && (
        <p className="sidebar-message">
          {error}
        </p>
      )}

      {!loading && !error && users.length === 0 && (
        <p className="sidebar-message">
          No users found.
        </p>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="user-list">
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              className={`user-button ${
                selectedUser?.id === user.id
                  ? "user-button--active"
                  : ""
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div className="user-avatar">
                {user.firstName.charAt(0).toUpperCase()}
              </div>

              <div className="user-name">
                <strong>
                  {user.firstName} {user.lastName}
                </strong>

                <span>@{user.username}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
