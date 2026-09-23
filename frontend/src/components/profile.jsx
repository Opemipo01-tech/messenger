import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getCurrentUser } from "../services/authApi";
import { updateProfile } from "../services/profileApi";
import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

        setFormData({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          username: data.user.username || "",
          bio: data.user.bio || "",
        });
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = await updateProfile(formData, token);

      setUser(data.user);

      setFormData({
        firstName: data.user.firstName || "",
        lastName: data.user.lastName || "",
        username: data.user.username || "",
        bio: data.user.bio || "",
      });

      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <section className="profile">
      <h2>Profile</h2>

      {error && (
        <p className="profile-error">{error}</p>
      )}

      {success && (
        <p className="profile-success">{success}</p>
      )}

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >
        <div className="profile-field">
          <label htmlFor="firstName">
            First name
          </label>

          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="lastName">
            Last name
          </label>

          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="bio">
            Bio
          </label>

          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <button
          className="profile-save"
          type="submit"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>

      <Link className="profile-back" to="/">
        Back to home
      </Link>
    </section>
  );
}

export default Profile;