import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../css/Appointment/ManageAppointmentsPatient.css'

function ManageAppointmentsPatient() {
    const [completedAppointments, setCompletedAppointments] = useState([]);
    const [unfinishedAppointments, setUnfinishedAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCompletedAppointments();
        fetchUnfinishedAppointments();
    }, []);

    async function fetchCompletedAppointments() {
        try {
            const response = await axios.get('http://localhost:8081/appointments/completedappointments', { withCredentials: true });
            if (response.data.Status === 'Success') {
                setCompletedAppointments(response.data.appointments);
                console.log("Completed Appointments:", response.data.appointments);
            } else {
                setCompletedAppointments([]);
                console.log("No completed appointments found.");
            }
        } catch (error) {
            setError(error);
        }
    }

    async function fetchUnfinishedAppointments() {
        try {
            const response = await axios.get('http://localhost:8081/appointments/unfinishedappointments', { withCredentials: true });
            if (response.data.Status === 'Success') {
                setUnfinishedAppointments(response.data.appointments);
                console.log("Unfinished Appointments:", response.data.appointments);
            } else {
                setUnfinishedAppointments([]);
                console.log("No unfinished appointments found.");
            }
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="appointment-container">
          <div className="left-section">
            <h2 className='ManageAppointmentsPatient-h'>Unfinished Appointments</h2>
            {unfinishedAppointments.length === 0 ? (
              <p className='ManageAppointmentsPatient-p'>No unfinished appointments found.</p>
            ) : (
              <>
                <ul className="appointment-list">
                  {unfinishedAppointments.map((appointment) => (
                    <li className="appointment-item unfinished" key={appointment.appointmentid}>
                      {/* Render unfinished appointment data here */}
                      <p className='ManageAppointmentsPatient-p'>Appointment ID: {appointment.appointmentid}</p>
                      <p className='ManageAppointmentsPatient-p'>Appointment Date: {new Date(appointment.appointment_date).toDateString()}</p>
                      <p className='ManageAppointmentsPatient-p'>Appointment Time: {appointment.appointment_time}</p>
                      <p className='ManageAppointmentsPatient-p'>Category Name: {appointment.categoryname}</p>
                      <p className='ManageAppointmentsPatient-p'>Status: {appointment.status}</p>
                      <button className='ManageAppointmentsPatient-button-cancel'>Cancel Appointment</button>
                    </li>
                  ))}
                </ul>
                
              </>
            )}
          </div>
          <div className="right-section">
            <h2 className='ManageAppointmentsPatient-h'>Completed Appointments</h2>
            {completedAppointments.length === 0 ? (
              <p className='ManageAppointmentsPatient-p'>No completed appointments found.</p>
            ) : (
              <ul className="appointment-list">
                {completedAppointments.map((appointment) => (
                  <li className="appointment-item completed" key={appointment.appointmentid}>
                    <p className='ManageAppointmentsPatient-p'>Appointment ID: {appointment.appointmentid}</p>
                    <p className='ManageAppointmentsPatient-p'>Appointment Date: {new Date(appointment.appointment_date).toDateString()}</p>
                    <p className='ManageAppointmentsPatient-p'>Appointment Time: {appointment.appointment_time}</p>
                    <p className='ManageAppointmentsPatient-p'>Category Name: {appointment.categoryname}</p>
                    <p className='ManageAppointmentsPatient-p'>Status: {appointment.status}</p>
                    <button className='ManageAppointmentsPatient-button'>View Medical Report</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
      
      
}

export default ManageAppointmentsPatient;
