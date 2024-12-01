import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');

     
      if (!token) {
        setError('Please login first.');
        setLoading(false);
        return;
      }

      try {
     
        const response = await axios.get('http://localhost:1455/api/v1/emp/employees', {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });

        setEmployees(response.data); 
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Failed to fetch employees. Please try again later.');
      } finally {
        setLoading(false);  
      }
    };

    fetchEmployees();  
  }, []); 

  if (loading) {
    return <div>Loading employees...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Employee List</h2>

      
      <div>
        <Link to="/employees/add">
          <button className="btn btn-success">Add Employee</button>
        </Link>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.first_name} {employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
                <td>
                  <Link to={`/employees/${employee._id}`}>
                    <button className="btn btn-info">View</button>
                  </Link>
                  <button onClick={() => alert('Edit functionality to be implemented')}>Edit</button>
                  <button onClick={() => alert('Delete functionality to be implemented')}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
