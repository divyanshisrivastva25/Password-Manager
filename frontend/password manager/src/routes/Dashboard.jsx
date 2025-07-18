import { useState, useEffect } from "react";
import axios from "../utils/axios";
import PasswordItem from "../components/PasswordItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
  });

  const [passwords, setPasswords] = useState([]);
  const navigate = useNavigate();

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
      toast.success(res.data.message);
      setFormData({ title: "", username: "", password: "" });
      fetchPasswords();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save password");
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
    } catch {
      toast.error("Failed to update password");
    }
  };

  // Dashboard.jsx
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?"))
      return;

    try {
      const res = await axios.delete(`/passwords/${id}`);
      toast.success(res.data.message);
      fetchPasswords();
    } catch {
      alert("Failed to delete password");
    }
  };

  const logout = async () => {
    const res = await axios.post("/logout");
    setPasswords(res.data);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <button
        className="border-1 rounded-2xl px-6 py-2 bg-yellow-600 text-white"
        onClick={logout}
      >
        Logout
      </button>
      <h1 className="mb-5 text-3xl mt-4">Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Website/App"
          value={formData.title}
          onChange={handleChange}
          required
          className="border-1 rounded-2xl p-2"
        />
        <br />
        <br />
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border-1 rounded-2xl p-2"
        />
        <br />
        <br />
        <input
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border-1 rounded-2xl p-2"
        />
        <br />
        <br />
        <button
          className="border-1 rounded-2xl px-6 py-2 bg-amber-950 text-white"
          type="submit"
        >
          Save Password
        </button>
      </form>
      <br />

      <hr />

      <h2 className="text-4xl mt-4">Saved Passwords</h2>
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
