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
    <div className="grid place-items-center bg-[radial-gradient(circle,rgba(157,120,194,1)_0%,rgba(46,6,66,1)_100%)] w-full min-h-screen">
      <div className="overflow-hidden w-11/17 h-[80%] bg-white rounded-4xl flex">
        <div className="left flex flex-col justify-center items-center tracking-wider w-[50%] rounded-4xl">
          <h1 className="mb-5 text-3xl font-bold text-zinc-800">
            Create an Account
          </h1>
          <br />
          <form onSubmit={handleSubmit} className="flex items-center flex-col">
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className=" hover:border-purple-600 border-b-2 outline-none border-zinc-500 px-4 py-1 text-zinc-900 font-semibold rounded-md w-full"
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
              className="hover:border-purple-600 border-b-2 outline-none border-zinc-500 px-4 py-1 text-zinc-900 font-semibold rounded-md w-full"
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
              className=" hover:border-purple-600  border-b-2 outline-none border-zinc-500 px-4 py-1 text-zinc-900 font-semibold rounded-md w-full"
            />
            <br />
            <br />
            <button
              type="submit"
              className=" bg-purple-700 px-12 hover:scale-106 hover:bg-purple-800 py-2 rounded-full text-white"
            >
              Signup
            </button>
            <div className="flex m-2 justify-center items-center gap-3"></div>
          </form>
        </div>
        <div className="overflow-hidden right rounded-r-4xl text-white rounded-l-[40%] w-[50%] bg-purple-900 p-4 gap-6 flex  flex-col justify-center items-center">
          <h1 className="text-4xl font-bold tracking-wide">Welcome back!</h1>
          <p className=" max-w-[280px] text-center text-zinc-300 ">
            Log in to unlock your personal password vault — safe, simple, and just a click away.
          </p>
          <button onClick={() => navigate("/login")} className="mt-4 px-12 py-2 rounded-full font-semibold bg-white text-purple-700 hover:bg-purple-300 hover:scale-106">
            Log In
          </button>
        </div>
      </div>
    </div>
  )
};

export default Signup;
