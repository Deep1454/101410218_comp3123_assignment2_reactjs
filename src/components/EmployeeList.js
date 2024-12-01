import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState(''); 
  const [token, setToken] = useState(localStorage.getItem('token')); 


  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:1455/api/v1/emp/employees', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data); 
      setFilteredEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const searchTerm = department.toLowerCase();
    const filtered = employees.filter((employee) =>
      employee.department.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(filtered);
  };


  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Loading employees...</div>;
  }

  return (
    <div>
      <h2>Employee List</h2>

      <div className="search">
        <input
          type="text"
          placeholder="Search by Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

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
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.first_name} {employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
                <td>{employee.department}</td>
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
              <td colSpan="6">No employees found for this department.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
