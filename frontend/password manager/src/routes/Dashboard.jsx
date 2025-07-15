import { useState, useEffect } from "react";
import axios from "../utils/axios";
import PasswordItem from "../components/PasswordItem";

function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
  });

  const [passwords, setPasswords] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit (save password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/passwords", formData);
      alert(res.data.message);
      setFormData({ title: "", username: "", password: "" });
      fetchPasswords();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save password");
    }
  };

  // Fetch all passwords (on load)
  const fetchPasswords = async () => {
    try {
      const res = await axios.get("/passwords");
      setPasswords(res.data);
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`/passwords/${id}`, updatedData);
      fetchPasswords();
    } catch (err){
      console.error("Update error:", err);
      alert("Failed to update password");
    }
  };

  // Dashboard.jsx
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?"))
      return;

    try {
      const res = await axios.delete(`/passwords/${id}`);
      alert(res.data.message);
      fetchPasswords();
    } catch {
      alert("Failed to delete password");
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <h1>Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Website/App"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Save Password</button>
      </form>

      <hr />

      <h2>Saved Passwords</h2>
      <div className="grid grid-cols-4 gap-4 mt-10">
        {passwords.map((pass) => (
          <PasswordItem
            key={pass._id}
            pass={pass}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
