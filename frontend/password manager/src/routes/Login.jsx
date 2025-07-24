import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgImg from "../Assets/bgLogin.jpg";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";


function Login() {
  const [formData, setFormData] = useState({
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
      const res = await axios.post("/login", formData);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="grid place-items-center bg-[linear-gradient(90deg,rgba(130,50,227,1)_0%,rgba(142,42,191,1)_72%,rgba(9,9,121,1)_100%,rgba(0,212,255,1)_100%)] w-full min-h-screen">
      <div className="w-[60%] bg-white h-[70%] flex rounded-2xl">
        <div className="left w-[60%] rounded-2xl overflow-hidden" >
          <img src={bgImg} alt="" className=" relative h-full overflow-hidden rounded-tl-2xl rounded-bl-2xl rounded-tr-full rounded-br-full " />
          <div className="absolute top-[25%] mt-8 p-8 tracking-wide text-white ">
            <h1 className="text-6xl font-bold font-serif">Welcome.</h1>
            <p className="mt-4 max-w-[360px] text-center font-semibold tracking-wide">
              Manage all your passwords in one safe place. Never forget a
              password again — we remember it for you.
            </p>
          </div>
        </div>
        <div className="right w-[40%] bg-white flex justify-center items-center flex-col gap-5 rounded-r-2xl">
          {/* <h1 className="mb-5 text-3xl text-purple-500 font-serif">
            User Login
          </h1> */}
          <div>
            <FaUserAlt className="text-purple-500 text-4xl" />

          </div>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5 items-center">
            <div className=" bg-zinc-300 hover:bg-zinc-400 inset-shadow-sm inset-shadow-purple-400 rounded-2xl gap-2 flex justify-center items-center px-4 py-2">
              <span>
                <MdOutlineMailOutline className="text-zinc-500 text-xl" />
              </span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="outline-none"
              />
            </div>

            <div className="bg-zinc-300 hover:bg-zinc-400 inset-shadow-sm inset-shadow-purple-400 gap-2 rounded-2xl flex justify-center items-center px-4 py-2">
              <span>
                <RiLockPasswordLine className="text-zinc-500 text-xl" />
              </span>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="outline-none"
              />
            </div>

            <button
              className="w-1/2 cursor-pointer hover:scale-105 transition border-1 rounded-2xl px-6 py-2 bg-[radial-gradient(circle,_rgba(204,47,115,1)_0%,_rgba(14,52,94,1)_100%)] font-bold tracking-wider text-white"
              type="submit"
            >
              Login
            </button>
            <p className="mt-4 p-4">
              Not a member?{" "}
              <a
                className="font-semibold hover:text-purple-950 text-purple-900 font-sans"
                href="/Signup"
              >
                Signup now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
