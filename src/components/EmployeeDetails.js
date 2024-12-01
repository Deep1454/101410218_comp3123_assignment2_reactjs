import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeDetails() {
  const { id } = useParams(); 
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`https://101410218-comp3123-assignment2-nodejs.vercel.app/api/v1/emp/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    } else {
      console.error('No Employee ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading employee details...</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Salary:</strong> {employee.salary}</p>
      <p><strong>Date of Joining:</strong> {employee.date_of_joining}</p>
      <p><strong>Department:</strong> {employee.department}</p>
    </div>
  );
}

export default EmployeeDetails;
