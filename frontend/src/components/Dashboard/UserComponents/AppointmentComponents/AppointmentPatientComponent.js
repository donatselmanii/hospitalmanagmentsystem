import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function AppointmentPatientComponent() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/appointments/userappointments', {
          withCredentials: true,
        });
        if (response.data.Status === 'Successs') {
          setAppointments(response.data.appointments);
        } else {
          setAppointments([]);
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

  const handleWriteReport = (appointmentId) => {
    navigate(`/medical-report/${appointmentId}`);
  };

  return (
    <MDBContainer style={{ marginLeft: '300px', width: '1150px' }}>
      <h2 className="text-center mb-4">Your Appointments</h2>
      {isLoading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">Error: {error.message}</div>}
      {!isLoading && !error && appointments.length === 0 && (
        <p className="text-center">No appointments found.</p>
      )}
      {!isLoading && !error && appointments.length > 0 && (
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Appointment ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointmentid}>
                <td>{appointment.appointmentid}</td>
                <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                <td>{getTimeSlot(appointment.appointment_time)}</td>
                <td>{appointment.categoryname}</td>
                <td>
                  <MDBBadge color={appointment.status === 'completed' ? 'success' : 'danger'}>
                    {appointment.status}
                  </MDBBadge>
                </td>
                <td>
                <MDBBtn
                      color='info'
                      size='sm'
                      onClick={() =>
                        handleWriteReport(appointment.appointmentid)
                      }
                    >
                    View Report
                    </MDBBtn>
                  </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      )}
    </MDBContainer>
  );
}

export default AppointmentPatientComponent;
