import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import styles from "../../../../css/Appointment/DoctorAppointments.module.css";
import "../../../../css/largedevices/ShowAlert.css";

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
      const response = await axios.delete(
        `http://localhost:8081/appointments/cancel/${appointmentId}`,
        {
          withCredentials: true,
        }
      );
  
      if (response.status === 204) {
        setShowAlert(true);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
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
    navigate(`/medical-report/${appointmentId}`);
  };

  return (
    <>
      <div className={styles.DoctorAppointmentsContainer}>
        <div className={styles.DoctorAppointmentsUnfinished}>
          <h2>Unfinished Appointments</h2>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Appointment ID</th>
                <th>ID Number</th>
                <th>Appointment Date</th>
                <th>City</th>
                <th>Appointment Time</th>
                <th>Status</th>
                <th>User Name</th>
                <th>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {unfinishedAppointments.map((appointment) => (
                <tr key={appointment.appointmentid}>
                  <td>{appointment.appointmentid}</td>
                  <td>{appointment.idnum}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.categoryname}</td>
                  <td>{appointment.appointment_time}</td>
                  <td>
                    <MDBBadge color='warning' pill>
                      {appointment.status}
                    </MDBBadge>
                  </td>
                  <td>{appointment.user_name}</td>
                  <td>
                    <MDBBtn
                      color='success'
                      size='sm'
                      onClick={() =>
                        handleSetCompleted(appointment.appointmentid)
                      }
                    >
                      Set Completed
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>

        <div className={styles.DoctorAppointmentsCompleted}>
          <h2>Completed Appointments</h2>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Appointment ID</th>
                <th>ID Number</th>
                <th>Appointment Date</th>
                <th>City</th>
                <th>Appointment Time</th>
                <th>Status</th>
                <th>Patient Name</th>
                <th>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {completedAppointments.map((appointment) => (
                <tr key={appointment.appointmentid}>
                  <td>{appointment.appointmentid}</td>
                  <td>{appointment.idnum}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.categoryname}</td>
                  <td>{appointment.appointment_time}</td>
                  <td>
                    <MDBBadge color='success' pill>
                      {appointment.status}
                    </MDBBadge>
                  </td>
                  <td>{appointment.user_name}</td>
                  <td>
                    <MDBBtn
                      color='info'
                      size='sm'
                      onClick={() =>
                        handleWriteReport(appointment.appointmentid)
                      }
                    >
                      Edit or View Report
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>

      {showAlert && (
        <div className="alert">
          <p>Appointment status updated successfully!</p>
          <MDBBtn color='primary' size='sm' onClick={handleAlertClose}>
            Close
          </MDBBtn>
        </div>
      )}
    </>
  );
}

export default DoctorAppointments;
