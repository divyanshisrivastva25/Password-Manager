import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">
          Your Passwords.Secured Forever.
        </h1>

        <div>
          <Link to="/login" className="bg-yellow-300">Login</Link>
          <Link to="/signup" className="bg-pink-400">Signup</Link>
        </div>
        <p>
          A powerful password manager built with zero-knowledge encryption and
          full privacy.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
