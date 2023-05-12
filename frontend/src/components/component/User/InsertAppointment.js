import axios from 'axios';
import React, { useState, useEffect } from 'react';

function InsertAppointment() {
  const [DateTimeReg, setDateTimeReg] = useState('');
  const [CityCategoryReg, setCityCategoryReg] = useState('');
  const [CityCategories, setCityCategories] = useState([]);
  const [userIdNum, setUserIdNum] = useState('');

  const insertAppointment = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      // Make API call to retrieve the userIdNum
      const response = await axios.post('/decode', { token });
      const userIdNum = response.data.userIdNum;

      // Make API call to insert the appointment
      const appointmentResponse = await axios.post(
        'http://localhost:8081/appointments',
        {
          useridnum: userIdNum,
          datetime: DateTimeReg,
          categoryname: CityCategoryReg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      console.log(appointmentResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8081/citycategory');
      setCityCategories(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="group">
        <input
          placeholder=""
          type="datetime-local"
          onChange={(e) => {
            setDateTimeReg(e.target.value);
          }}
        />
        <label>Date</label>
      </div>
      <div className="group">
        <select
          value={CityCategoryReg}
          onChange={(e) => setCityCategoryReg(e.target.value)}
        >
          <option value="">Select a city category</option>
          {CityCategories.map((citycategory) => (
            <option key={citycategory.id} value={citycategory.categoryname}>
              {citycategory.categoryname}
            </option>
          ))}
        </select>
      </div>

      <br />
      <br />
      <br />
      <br />
      <button onClick={insertAppointment}>Select an appointment</button>
    </div>
  );
}

export default InsertAppointment;
