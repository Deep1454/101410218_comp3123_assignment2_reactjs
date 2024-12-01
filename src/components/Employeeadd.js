import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Employeeadd() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [date_of_joining, setDateOfJoining] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token')); 
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (id) {
      axios
        .get(`https://101410218-comp3123-assignment2-nodejs.vercel.app/api/v1/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const employee = response.data;
          setFirstName(employee.first_name);
          setLastName(employee.last_name);
          setEmail(employee.email);
          setPosition(employee.position);
          setSalary(employee.salary);
          setDepartment(employee.department);
          setDateOfJoining(employee.date_of_joining);  
        })
        .catch((error) => {
          console.error('Error fetching employee details:', error);
        });
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      first_name,
      last_name,
      email,
      position,
      salary,
      department,
      date_of_joining, 
    };

    try {
      if (id) {
        await axios.put(`https://101410218-comp3123-assignment2-nodejs.vercel.app/api/v1/emp/employees/${id}`, employeeData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Employee updated successfully');
      } else {
        await axios.post('https://101410218-comp3123-assignment2-nodejs.vercel.app/api/v1/emp/employees', employeeData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Employee added successfully');
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {id ? 'Edit Employee' : 'Add Employee'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="wholeform">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="wholeform">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="wholeform">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="wholeform">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div className="wholeform">
          <label>Salary</label>
          <input
            type="number"
            className="form-control"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div className="wholeform">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="wholeform">
          <label>Date of Joining</label>
          <input
            type="date"
            className="form-control"
            value={date_of_joining}
            onChange={(e) => setDateOfJoining(e.target.value)}  
            required
          />
        </div>
        <div className="wholeform mt-3">
          <button type="submit" className="btn btn-primary">
            {id ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Employeeadd;
