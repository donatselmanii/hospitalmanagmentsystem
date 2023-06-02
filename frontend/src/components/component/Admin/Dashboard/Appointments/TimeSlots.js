import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../../css/Dashboardcss/timeslots.css';
import '../../../../../css/Dashboardcss/dashboard.css';

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
    <div className="timeslotcontainer">
      <div className="timeslotcontent">
        <h2>Add Time Slot</h2>
        <form onSubmit={handleSubmit}>
          <label className='timeslotlabel'>
            Hour:
            <input type="number" value={hour} onChange={(e) => setHour(e.target.value)} />
          </label>
          <label className='timeslotlabel'>
            Minutes:
            <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
          </label>
          <button type="submit">Add Time Slot</button>
        </form>
      </div>
      <br/><br/>
      <br/><br/>
      <br/><br/>
      <br/><br/>

      <div className="timeslottable">
        <h2>Time Slots</h2>
        <table>
          <thead>
            <tr>
              <th>Hour</th>
              <th>Minute</th>
            </tr>
          </thead>
          <tbody>
            {timeslots.map((timeslot) => (
              <tr key={timeslot.id}>
                <td>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Hour"
                    value={editedAppointment[timeslot.id]?.hour || timeslot.hour}
                    onChange={(event) => handleInputChange(event, 'hour', timeslot.id)}
                  />
                </td>
                <td>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Minute"
                    value={editedAppointment[timeslot.id]?.minutes || timeslot.minutes}
                    onChange={(event) => handleInputChange(event, 'minute', timeslot.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeSlots;
