import { useState, useEffect } from "react";
import axios from "../utils/axios";
import PasswordItem from "../components/PasswordItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// function Dashboard() {
import { RiShieldCheckFill } from "react-icons/ri";
import { BiSolidLock } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoMdAddCircle } from "react-icons/io";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
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
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-indigo-100">
      {showForm && (
        <div
          className="fixed inset-0  flex items-center justify-center backdrop-blur bg-black/40"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white py-4 px-8 rounded-2xl shadow-lg w-[30%] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => setShowForm(false)}
              className="flex justify-end cursor-pointer"
            >
              <RxCross2 className="hover:text-red-600 " />
            </div>

            <h2 className="text-xl font-bold mb-4 text-center text-purple-800">
              Add New Password
            </h2>
            <form
              onSubmit={handleSubmit}
              className=" flex items-center justify-center p-2  flex-col gap-4"
            >
              <input
                name="title"
                placeholder="Website/App"
                value={formData.title}
                onChange={handleChange}
                required
                className=" rounded-xl p-2 w-full bg-zinc-200 border-none outline-none inset-shadow-sm inset-shadow-purple-400 "
              />
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className=" rounded-xl p-2 w-full bg-zinc-200 border-none outline-none inset-shadow-sm inset-shadow-purple-400 "
              />
              <input
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className=" rounded-xl p-2 w-full bg-zinc-200 border-none outline-none inset-shadow-sm inset-shadow-purple-400 "
              />
              <button
                type="submit"
                className="bg-purple-700 cursor-pointer w-1/2 font-semibold tracking-wide text-white px-4 py-2 rounded-xl hover:bg-purple-800"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0  flex min-w-full justify-between bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-400 px-5 py-3 text-white text-2xl">
        <div className="flex justify-center gap-2 items-center text-yellow-400 tracking-wider">
          <span>
            <RiShieldCheckFill />
          </span>
          <span className=" font-bold ">MyPassword</span>
        </div>
        <button
          className="bg-yellow-100 text-blue-700 text-sm font-bold cursor-pointer tracking-wider hover:bg-yellow-200 px-4 py-1 rounded-2xl"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="w-11/12 px-15 py-6 flex gap-20 mt-20  rounded-2xl shadow-lg  bg-white">
        <div className="bg-zinc-300  p-12 text-purple-600 rounded-full grid place-items-center text-9xl">
          <BiSolidLock />
        </div>
        <div className="max-w-[70%]">
          <h2 className="text-3xl font-bold">Welcome!</h2>
          <p className="text-gray-500 mt-3 text-lg">
            Welcome back to your Password Vault! <br />
            All your credentials are securely stored and encrypted using the
            latest standards. Only you have access to your data — not even we
            can see it!
          </p>
          <p className="text-gray-500 mt-3 text-lg">
            Stay organized, stay safe. You can add, update, and manage all your
            passwords from here with complete confidence. Your digital life is
            just a few clicks away from being safer and stress-free.
          </p>
        </div>
      </div>

      <div className="w-11/12 px-15 py-6 flex flex-col gap-10 mt-8 rounded-2xl shadow-lg mb-8 bg-white">
        <div className="flex justify-between font-bold text-[20px] font-fraunces tracking-wide">
          <span>Saved Password({passwords.length})</span>
          <input
            type="text"
            placeholder="Search saved passwords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-200 px-4 rounded-md w-1/4 text-sm outline-purple-700"
          />
          <button
            onClick={() => setShowForm(true)}
            className="flex gap-2 items-center text-white cursor-pointer bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-400 px-4 py-1 rounded-2xl"
          >
            <IoMdAddCircle className="text-xl" /> New Password
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {passwords
            .filter((pass) =>
              pass.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((pass) => (
              <PasswordItem
                key={pass._id}
                pass={pass}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
