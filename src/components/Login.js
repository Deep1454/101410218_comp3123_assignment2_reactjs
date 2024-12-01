import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login credentials to the backend
      const response = await axios.post("http://localhost:1455/api/v1/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Save the JWT token to localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to employees page after successful login
        navigate("/employees");
      }
    } catch (error) {
      // Check if the error is from the backend and show the error message
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed");
      } else {
        setErrorMessage("Login failed");
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div>
        <p>Don't have an account? <a href="/signup">Signup here</a></p>
      </div>
    </div>
  );
}

export default Login;
