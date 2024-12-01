import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/style.css'; 

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    try {
      const response = await axios.post("http://localhost:1455/api/v1/user/signup", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        alert('User created successfully!');
        navigate("/"); 
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className>
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>
          {errorMessage && <div>{errorMessage}</div>}
          <div className="wholeform">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="wholeform">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="wholeform">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
        <div className="signup-link">
          <p>Already have an account? <a href="/">Login here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
