import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

function PasswordItem({ pass, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: pass.title,
    username: pass.username,
    password: pass.password,
  });

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
    <div className="border rounded-lg p-4 shadow-md bg-white">
      {editing ? (
        <>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            ref={inputRef}
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold">{pass.title}</h3>
          <p>
            <strong>Username:</strong> {pass.username}
          </p>
          <p>
            <strong>Password:</strong> {pass.password}
          </p>
        </>
      )}
      <p className="text-xs text-gray-400 mt-2">Saved on: {formattedDate}</p>{" "}
      <br />
      <div className="mt-4 ">
        <button
          className="border border-none bg-[#4CAF50] text-white px-4"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Done" : "Edit"}
        </button>
        <button
          className="border border-none bg-[#f44336] text-white px-4 ml-2"
          onClick={() => onDelete(pass._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PasswordItem;
