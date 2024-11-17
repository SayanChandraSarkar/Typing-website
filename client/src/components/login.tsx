import React, { useState } from "react";
import { auth } from "../firebase";
import "../assets/css/login.css";
import { Navigate, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form login">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="inputs">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <div className="toggle-container">
          <p>Don't have an account?</p>
          <p
            className="toggle-button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Create an Account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
