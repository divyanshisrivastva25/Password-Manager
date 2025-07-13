import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">🔐 Welcome to Password Manager</h1>
      <p className="mb-6 text-lg">Store your passwords securely.</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
        <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Signup</Link>
      </div>
    </div>
  );
}

export default LandingPage;
