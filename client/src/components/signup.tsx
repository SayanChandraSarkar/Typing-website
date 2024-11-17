import React, { useState } from "react";
import { auth } from "../firebase";
import "../assets/css/signup.css";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      navigate("/login");
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form signup">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <div className="toggle-container">
          <p>Already have an account? </p>
          <p
            className="toggle-button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
