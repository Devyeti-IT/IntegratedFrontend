import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/yetiAirlinesLogo.png';

const LoginForm: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your login logic here
    console.log({ userId, username, password });
    // On successful login, navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-card">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <h2 className="admin-header">Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            type="text"
            placeholder="Enter your user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-aux">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
