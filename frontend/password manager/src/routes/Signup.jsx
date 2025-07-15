import { useState } from "react";
import axios from "../utils/axios";

const Signup = () => {
const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
});
const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/signup", formData);
    alert(res.data.message); 
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create your account</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
