import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { IoMdCloudDone } from "react-icons/io";

function PasswordItem({ pass, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: pass.title,
    username: pass.username,
    password: pass.password,
  });

  const bgColors = ["bg-purple-200", "bg-violet-200", "bg-blue-100", "bg-yellow-100"];
  const [randomColor] = useState(
    bgColors[Math.floor(Math.random() * bgColors.length)]
  );

  const formattedDate = new Date(pass.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    try {
      await onUpdate(pass._id, updated);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className={`flex flex-col gap-4 items-center rounded-lg p-4 shadow-md shadow-zinc-700 ${randomColor}`}>
      {/* add dynamic logo. */}
      <div className="w-20 h-20 rounded-full">
        <img
          src={`https://logo.clearbit.com/${pass.title}`}
          alt="Website Logo"
          className="w-full h-full object-contain rounded-full"
          onError={(e) => {
            // e.target.onerror = null;
            e.target.src = "/default-logo.png";
          }}
        />
      </div>

      {/* add details     */}
      <div className="flex flex-col items-center w-full">
        {editing ? (
          <>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              ref={inputRef}
              className="outline-none text-zinc-500 px-2 border-b-1 border-purple-500  shadow-md"
            />
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="outline-none text-zinc-500 px-2  border-b-1 border-purple-500  shadow-md"
            />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="outline-none text-zinc-500 px-2 border-b-1 border-purple-500 shadow-md"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-blue-800">
              {pass.title}
            </h3>
            <p>
              <strong>Username:</strong> {pass.username}
            </p>
            <p>
              <strong>Password:</strong> {pass.password}
            </p>
          </>
        )}
        <p className="text-xs text-zinc-500 mt-2">Saved on: {formattedDate}</p>

        <div className="mt-4 flex justify-between w-full">
          <button
            className=" cursor-pointer text-black text-2xl hover:shadow-lg shadow-black w-[30px] h-[30px] flex justify-center items-center rounded-full"
            onClick={() => setEditing(!editing)}
          >
            {editing ? <IoMdCloudDone /> : <MdEditSquare />}
          </button>
          <button
            className=" cursor-pointer text-black text-2xl hover:shadow-lg shadow-black w-[30px] h-[30px] flex justify-center items-center rounded-full"
            onClick={() => onDelete(pass._id)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordItem;
