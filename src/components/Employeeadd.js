import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Employeeadd() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [date_of_joining, setDateOfJoining] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    };

    try {
     
      const token = localStorage.getItem('token');

     
      if (!token) {
        alert('You must be logged in to create an employee.');
        navigate('/login'); 
        return;
      }

     
      const response = await axios.post('http://localhost:1455/api/v1/emp/employees', employeeData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

     
      alert('Employee created successfully!');
      navigate('/employees'); 
    } catch (error) {
      
      alert('Error creating employee');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Joining:</label>
          <input
            type="date"
            value={date_of_joining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
}

export default Employeeadd;
