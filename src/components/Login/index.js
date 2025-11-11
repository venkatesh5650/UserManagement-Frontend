import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // custom CSS file

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ NEW
  const [error, setError] = useState("");

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  // ✅ Demo Login Autofill
  const fillDemoCredentials = () => {
    setEmail("demo@taskApp.com");
    setPassword("demo5650");
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="login-form p-4 rounded shadow">
        <h2 className="text-center mb-4 loginHead">Welcome Back</h2>

        {error && <p className="text-danger text-center">{error}</p>}

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <input
            type={showPassword ? "text" : "password"} // ✅ Toggle visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        {/* ✅ Show Password Checkbox */}
        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="showPassCheckLogin"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label className="form-check-label" htmlFor="showPassCheckLogin">
            Show Password
          </label>
        </div>

        <button type="submit" className="btn btn-success w-100 mb-2">
          Login
        </button>

        <button
          type="button"
          onClick={fillDemoCredentials}
          className="btn btn-outline-secondary w-100 mb-3"
        >
          Use Demo Account
        </button>

        <p className="text-center">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
} 
