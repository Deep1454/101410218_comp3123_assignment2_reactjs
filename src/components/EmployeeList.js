import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/employeelist.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [department, setDepartment] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://101410218-comp3123-assignment2-nodejs.vercel.app/api/v1/emp/employees', {
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://101410218-comp3123-assignment2-nodejs.vercel.app/api/v1/emp/employees/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEmployees(employees.filter(employee => employee._id !== id));
            setFilteredEmployees(filteredEmployees.filter(employee => employee._id !== id));
            alert('Employee deleted successfully');
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Error deleting employee');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (loading) {
        return <div>Loading employees...</div>;
    }

    return (
        <div className="employee-list-container">
            <h2 className="employee-list-title">Employee List</h2>

            <div className="employee-list-search">
                <input
                    type="text"
                    placeholder="Search by Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="employee-list-add">
                <Link to="/employees/add">
                    <button>Add Employee</button>
                </Link>
            </div>

            <table className="employee-list-table">
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
                                    <div className="employee-list-actions">
                                        <Link to={`/employees/${employee._id}`}>
                                            <button className="view-btn">View</button>
                                        </Link>
                                        <Link to={`/employees/edit/${employee._id}`}>
                                            <button className="edit-btn">Edit</button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(employee._id)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
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
