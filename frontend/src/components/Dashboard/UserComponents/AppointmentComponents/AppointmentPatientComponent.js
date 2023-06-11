import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../css/Appointment/AppointmentPatient.css'

function AppointmentPatientComponent() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/appointments/userappointments', { withCredentials: true });
        if (response.data.Status === 'Successs') {
          setAppointments(response.data.appointments);
          console.log("Appointments:", response.data.appointments);
        } else {
          setAppointments([]);
          console.log("Appointments:", response.data.appointments);
        }
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const getTimeSlot = (timeSlot) => {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeSlot.split(':');
  
    // Format the hours and minutes with leading zeros if needed
    const formattedHours = parseInt(hours, 10).toString().padStart(2, '0');
    const formattedMinutes = parseInt(minutes, 10).toString().padStart(2, '0');
  
    // Return the formatted time slot
    return `${formattedHours}:${formattedMinutes}`;
  };
  
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='appointment-container'>
      <h2 className='appointment-heading'>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className='appointment-message'>No appointments found.</p>
      ) : (
        <ul className='appointment-list'>
          {appointments.map((appointment) => (
            <li className='appointment-item' key={appointment.appointmentid}>
              <p className='appointment-info'>Appointment ID: {appointment.appointmentid}</p>
              <p className='appointment-info'>Date: {new Date(appointment.appointment_date).toDateString()}</p>
              <p className='appointment-info'>Time: {getTimeSlot(appointment.appointment_time)}</p>
              <p className='appointment-info'>Category: {appointment.categoryname}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentPatientComponent;
