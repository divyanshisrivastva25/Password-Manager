function PasswordItem({ pass,onDelete }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-semibold">{pass.title}</h3>
      <p>
        <strong>Username:</strong> {pass.username}
      </p>
      <p>
        <strong>Password:</strong> {pass.password}
      </p>
      <div style={{ marginTop: "10px" }}>
  
        <button
          onClick={() => onDelete(pass._id)}
          style={{
            padding: "5px 10px",
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default PasswordItem;
