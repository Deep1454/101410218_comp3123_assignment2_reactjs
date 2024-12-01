import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
    try {
      // Sending the POST request to the backend
      const response = await axios.post("http://localhost:1455/api/v1/user/signup", {
        username,
        email,
        password,
      });

      // Check if the status code is 201 (Created)
      if (response.status === 201) {
        alert('User created successfully!');
        navigate("/login"); // Redirect to login after successful signup
      }
    } catch (error) {
      // Log the full error object to inspect its structure
      console.error('Signup error:', error);

      // Handle the error by checking if the response exists
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Display the error message from the backend
      } else {
        setErrorMessage("Signup failed. Please try again."); // Default error message
      }
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      {/* Show error message if exists */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
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
    </div>
  );
}

export default Signup;
