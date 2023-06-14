import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../css/Appointment/DoctorAppointments.css";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/appointments/doctorappointments",
        {
          withCredentials: true,
        }
      );
      setAppointments(response.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (appointments === null) {
    return <p>Loading...</p>;
  }

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  const unfinishedAppointments = appointments.filter(
    (appointment) => appointment.status !== "completed"
  );

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/appointments/${appointmentId}/cancel`,
        {},
        {
          withCredentials: true,
        }
      );

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewReport = (medicalReport) => {
    // Handle viewing the medical report
    console.log(medicalReport);
  };

  const handleSetCompleted = async (appointmentId) => {
    console.log(appointmentId);
    try {
      const response = await axios.put(
        `http://localhost:8081/appointments/complete/${appointmentId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setShowAlert(true);
        fetchData(); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWriteReport = (appointmentId) => {
    navigate(`/writereport/${appointmentId}`);
  };

  return (
    <>
      <h1>Doctor Appointments</h1>

      <div className="DoctorAppointments-container">
        <div className="DoctorAppointments-unfinished">
          <h2>Unfinished Appointments</h2>
          <table className="DoctorAppointments-table">
            {/* ... table code ... */}
            <tbody>
              {unfinishedAppointments.map((appointment) => (
                <tr key={appointment.appointmentid}>
                  {/* ... table row code ... */}
                  <td className="DoctorAppointments-td">
                    <button
                      className="DoctorAppointments-button"
                      onClick={() => handleSetCompleted(appointment.appointmentid)}
                    >
                      Set Completed
                    </button>
                    {/* ... other buttons ... */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="DoctorAppointments-completed">
          <h2>Completed Appointments</h2>
          <table className="DoctorAppointments-table">
            {/* ... table code ... */}
            <tbody>
              {completedAppointments.map((appointment) => (
                <tr key={appointment.appointmentid}>
                  {/* ... table row code ... */}
                  <td className="DoctorAppointments-td">
                    <button
                      className="DoctorAppointments-button"
                      onClick={() => handleViewReport(appointment.medical_report)}
                    >
                      View Report
                    </button>
                    {/* ... other buttons ... */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAlert && (
        <div className="alert">
          <p>Appointment marked as completed!</p>
          <button className="loginbutton" onClick={handleAlertClose}>
            OK
          </button>
        </div>
      )}
    </>
  );
}

export default DoctorAppointments;
