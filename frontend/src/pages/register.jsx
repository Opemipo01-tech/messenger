import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../services/authApi.js";
import "../styles/login.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser(formData);

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

return (
  <main className="auth-page">
    <section className="auth-card">
      <h1>Create account</h1>

      <p className="auth-subtitle">
        Create your account to start messaging.
      </p>

      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="auth-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </section>
  </main>
);
}

export default Register;