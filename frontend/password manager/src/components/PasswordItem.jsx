function PasswordItem({ pass }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-semibold">{pass.title}</h3>
      <p>
        <strong>Username:</strong> {pass.username}
      </p>
      <p>
        <strong>Password:</strong> {pass.password}
      </p>
    </div>
  );
}

export default PasswordItem;
