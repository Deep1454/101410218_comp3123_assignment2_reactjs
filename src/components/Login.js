import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/style.css'
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:1455/api/v1/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        
        localStorage.setItem("token", response.data.token);

        
        navigate("/employees");
      }
    } catch (error) {
     
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed");
      } else {
        setErrorMessage("Login failed");
      }
    }
  };

  return (
    <div className="container">
    
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
        {errorMessage && <div>{errorMessage}</div>}
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
