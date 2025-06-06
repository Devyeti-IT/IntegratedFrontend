import React, { useState } from "react";
import "../styles/login.css";
import logo from "../assets/yetiAirlinesLogo.png";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual auth logic
    if (userId && username && password) {
      navigate("/dashboard");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="card">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            placeholder="e.g., AG001"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="admin_user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-aux">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="btn">Login</button>
      </form>

      <div className="footer">
        Need help? <a href="#">Contact support</a>
      </div>
    </div>
  );
};

export default LoginForm;
