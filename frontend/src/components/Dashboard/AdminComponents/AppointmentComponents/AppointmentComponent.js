import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../css/Dashboardcss/dashboard.css'

function AppointmentComponent(){
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [editedAppointment, setEditedAppointments] = useState({});
  

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8081/appointments/fetch");
      setAppointments(response.data);
    }
    fetchData();
  }, []);

  function handleInputChange(event, key) {
    const value = event.target.value;
    setEditedAppointments((prevEditedAppointment) => ({
      ...prevEditedAppointment,
      [key]: value,
    }));
  }
    return(
        <>
        <div class="main--content">
        <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>ID Number</th>
                  <th>Date & Time</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="ID Number"
                        defaultValue={appointment.appointmentid}
                        onChange={(event) => handleInputChange(event, "appointmentid")}
                      />
                    </td>
                    <td>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="idnum"
                        defaultValue={appointment.idnum}
                        onChange={(event) => handleInputChange(event, "idnum")}
                      />
                    </td>
                    <td >
                      <input
                        className="input-field"
                        type="text"
                        placeholder="appointment_date"
                        defaultValue={new Date(appointment.appointment_date).toDateString()}
                        onChange={(event) => handleInputChange(event, "appointment_date")}
                      />
                    </td>
                    <td >
                      <input
                        className="input-field"
                        type="text"
                        placeholder="categoryname"
                        defaultValue={appointment.categoryname}
                        onChange={(event) => handleInputChange(event, "categoryname")}
                      />
                    </td>
                    <td>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="timeSlot"
                      defaultValue={appointment.timeslot} 
                      onChange={(event) => handleInputChange(event, 'timeSlot')}
                    />
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
    );
}
export default AppointmentComponent