import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <div className="absolute top-[13%] rounded-2xl left-[39%] bg-zinc-300 px-8 py-10">
        <h1 className="mb-5 text-3xl font-bold text-zinc-800">
          Create an Account
        </h1>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border-1 rounded-2xl p-2 w-full outline-purple-700 inset-shadow-sm inset-shadow-indigo-500"
          />
          <br />
          <br />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border-1 rounded-2xl p-2 w-full outline-purple-700 inset-shadow-sm inset-shadow-indigo-500"
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
            className="border-1 rounded-2xl p-2 w-full outline-purple-700 inset-shadow-sm inset-shadow-indigo-500"
            required
          />
          <br />
          <br />
          <button type="submit">Signup</button>
          <div className="flex m-2 justify-center items-center gap-3">
            <div className="w-[40%] h-[1px] bg-black"></div>
            <div>or</div>
            <div className="w-[40%] h-[1px] bg-black"></div>
          </div>
          <button onClick={() => navigate("/login")}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
