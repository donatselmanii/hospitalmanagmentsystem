import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../../../../css/Dashboardcss/timeslots.css';
import '../../../../css/Dashboardcss/dashboard.css';

const TimeSlots = () => {
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');
  const [timeslots, setTimeSlots] = useState([]);
  const [editedAppointment, setEditedAppointments] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8081/appointments/timeslots', {
        hour: hour,
        minutes: minutes,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8081/appointments/fetchtimeslots');
      setTimeSlots(response.data);
    }
    fetchData();
  }, []);

  function handleInputChange(event, key, id) {
    const value = event.target.value;
    setEditedAppointments((prevEditedAppointment) => ({
      ...prevEditedAppointment,
      [id]: {
        ...prevEditedAppointment[id],
        [key]: value,
      },
    }));
  }

  return (
    <MDBContainer style={{ marginLeft:'500px', maxWidth:'600px'}}>
      <MDBRow className="timeslotcontent">
        <MDBCol>
          <h2>Add Time Slot</h2>
          <form onSubmit={handleSubmit}>
            <MDBInput
              label="Hour"
              type="number"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            />
            <MDBInput
              label="Minutes"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
            <MDBBtn className="timeslot-button" type="submit">Add Time Slot</MDBBtn>
          </form>
        </MDBCol>
      </MDBRow>

      <br /><br />
      <br /><br />

      <MDBRow className="timeslottable">
        <MDBCol>
          <h2>Time Slots</h2>
          <MDBTable className="timeslot-table">
            <MDBTableHead className="timeslot-thead">
              <tr className="timeslot-tr">
                <th className="timeslot-th">Hour</th>
                <th className="timeslot-th">Minute</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody className="timeslot-tbody">
              {timeslots.map((timeslot) => (
                <tr key={timeslot.id}>
                  <td className="timeslot-td">
                    <MDBInput
                      type="text"
                      label="Hour"
                      value={editedAppointment[timeslot.id]?.hour || timeslot.hour}
                      onChange={(event) => handleInputChange(event, 'hour', timeslot.id)}
                    />
                  </td>
                  <td className="timeslot-td">
                    <MDBInput
                      type="text"
                      label="Minute"
                      value={editedAppointment[timeslot.id]?.minutes || timeslot.minutes}
                      onChange={(event) => handleInputChange(event, 'minute', timeslot.id)}
                    />
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default TimeSlots;
