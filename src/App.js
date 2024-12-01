import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import Employeeadd from './components/Employeeadd';
import EmployeeDetails from './components/EmployeeDetails';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<Employeeadd />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/employees/edit/:id" element={<Employeeadd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;