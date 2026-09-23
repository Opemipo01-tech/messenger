import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../services/authApi.js";
import "../styles/login.css"

function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        identifier,
        password,
      });

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

 return (
  <main className="auth-page">
    <section className="auth-card">
      <h1>Welcome back</h1>

      <p className="auth-subtitle">
        Login to continue messaging.
      </p>

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or email"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          className="auth-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </section>
  </main>
);
}

export default Login;