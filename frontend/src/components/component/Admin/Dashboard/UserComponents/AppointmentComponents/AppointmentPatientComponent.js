import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AppointmentPatientComponent() {
  const [idnum, setIdnum] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Inside useEffect');
        const response = await axios.get('http://localhost:8081/appointments/userappointments', { withCredentials : true });
        if (response.data.Status === 'Successs') {
          setAppointments(response.data.appointments);
          console.log("Appointments:", response.data.appointments);
        } else {
          setAppointments([]); // Set empty array when no appointments found
          console.log("Appointments:", response.data.appointments);
        }
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);
  
  

  useEffect(() => {
    axios.get('http://localhost:8081/login', { withCredentials: true })
      .then(res => {
        if (res.data.Status === 'Success') {
          setIdnum(res.data.idnum);
          console.log("Okay");
        } else {
          console.log("Not okay");
        }
      })
      .catch(err => console.log(err));
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

 

  return (
    <>
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.appointmentid}>
              <p>Appointment ID: {appointment.appointmentid}</p>
              <p>Date & Time: {new Date(appointment.appointment_date).toDateString()}</p>
              <p>Category: {appointment.categoryname}</p> {/* Use categoryname instead of city */}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default AppointmentPatientComponent;
