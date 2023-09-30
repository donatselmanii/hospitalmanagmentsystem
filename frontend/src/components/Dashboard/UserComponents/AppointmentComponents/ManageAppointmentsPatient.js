import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../../css/Appointment/ManageAppointmentsPatient.css';

function ManageAppointmentsPatient() {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [unfinishedAppointments, setUnfinishedAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompletedAppointments();
    fetchUnfinishedAppointments();
  }, []);

  async function fetchCompletedAppointments() {
    try {
      const response = await axios.get('http://localhost:8081/appointments/completedappointments', {
        withCredentials: true,
      });
      if (response.data.Status === 'Success') {
        setCompletedAppointments(response.data.appointments);
        console.log('Completed Appointments:', response.data.appointments);
      } else {
        setCompletedAppointments([]);
        console.log('No completed appointments found.');
      }
    } catch (error) {
      setError(error);
    }
  }

  async function fetchUnfinishedAppointments() {
    try {
      const response = await axios.get('http://localhost:8081/appointments/unfinishedappointments', {
        withCredentials: true,
      });
      if (response.data.Status === 'Success') {
        setUnfinishedAppointments(response.data.appointments);
        console.log('Unfinished Appointments:', response.data.appointments);
      } else {
        setUnfinishedAppointments([]);
        console.log('No unfinished appointments found.');
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }

  const handleViewMedicalReport = (appointmentId) => {
    navigate(`/medical-report/${appointmentId}`);
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(`http://localhost:8081/appointments/cancel/${appointmentId}`, {
        withCredentials: true,
      });
      if (response.data.Status === 'Success') {
        // Appointment cancellation successful, perform necessary updates
        // For example, remove the cancelled appointment from the list
        setUnfinishedAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.appointmentid !== appointmentId)
        );
        console.log('Appointment cancelled successfully.');
      } else {
        console.log('Failed to cancel the appointment.');
      }
    } catch (error) {
      console.log('An error occurred while cancelling the appointment:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="appointment-container">
      <div className="left-section">
        <h2 className="ManageAppointmentsPatient-h">Unfinished Appointments</h2>
        {unfinishedAppointments.length === 0 ? (
          <p className="ManageAppointmentsPatient-p">No unfinished appointments found.</p>
        ) : (
          <>
            <ul className="appointment-list">
              {unfinishedAppointments.map((appointment) => (
                <li className="appointment-item unfinished" key={appointment.appointmentid}>
                  <p className="ManageAppointmentsPatient-p">Appointment ID: {appointment.appointmentid}</p>
                  <p className="ManageAppointmentsPatient-p">Appointment Date: {new Date(appointment.appointment_date).toDateString()}</p>
                  <p className="ManageAppointmentsPatient-p">Appointment Time: {appointment.appointment_time}</p>
                  <p className="ManageAppointmentsPatient-p">Category Name: {appointment.categoryname}</p>
                  <p className="ManageAppointmentsPatient-p">Status: {appointment.status}</p>
                  <button className="ManageAppointmentsPatient-button-cancel" onClick={() => handleCancelAppointment(appointment.appointmentid)}>
                    Cancel Appointment
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="right-section">
        <h2 className="ManageAppointmentsPatient-h">Completed Appointments</h2>
        {completedAppointments.length === 0 ? (
          <p className="ManageAppointmentsPatient-p">No completed appointments found.</p>
        ) : (
          <ul className="appointment-list">
            {completedAppointments.map((appointment) => (
              <li className="appointment-item completed" key={appointment.appointmentid}>
                <p className="ManageAppointmentsPatient-p">Appointment ID: {appointment.appointmentid}</p>
                <p className="ManageAppointmentsPatient-p">Appointment Date: {new Date(appointment.appointment_date).toDateString()}</p>
                <p className="ManageAppointmentsPatient-p">Appointment Time: {appointment.appointment_time}</p>
                <p className="ManageAppointmentsPatient-p">Category Name: {appointment.categoryname}</p>
                <p className="ManageAppointmentsPatient-p">Status: {appointment.status}</p>
                <button className="ManageAppointmentsPatient-button" onClick={() => handleViewMedicalReport(appointment.appointmentid)}>
                  View Medical Report
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ManageAppointmentsPatient;
