import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/Dashboardcss/timeslots.css';

const InsertAppointmentTest = () => {
  const [idnum, setIdnum] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeslots, setTimeSlots] = useState([]);
  const [cityCategories, setCityCategories] = useState([]);

  const handleCitySelect = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDateSelect = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmit = async () => {
    if (selectedTimeSlot) {
      try {
       
        const appointmentData = {
          idnum: idnum, 
          citycategory: selectedCity, 
          datetime: selectedDate,
          timeSlot: selectedTimeSlot,
        };
  
        await axios.post('http://localhost:8081/appointments', appointmentData);
  
        // Reset the form values
        setSelectedCity('');
        setSelectedDate('');
        setSelectedTimeSlot('');
  
        
        console.log('Appointment successfully booked!');
      } catch (error) {
        
        console.error('Error booking appointment:', error);
      }
    } else {
      console.warn('Please select a time slot before submitting the appointment.');
    }
  };
  

  useEffect(() => {
    axios.get('http://localhost:8081/login', { withCredentials: true }).then(res => {
      if (res.data.Status === 'Success') {
        setIdnum(res.data.idnum);
        console.log("Okay")
      } else {
        console.log("Not okay")
      }
    }).catch(err => console.log(err))
  }, []);
  

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8081/appointments/fetchtimeslots');
      setTimeSlots(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCityCategories() {
      const response = await axios.get('http://localhost:8081/citycategory');
      setCityCategories(response.data);
    }
    fetchCityCategories();
  }, []);

  return (
    <div className="appointment-form">
      <h2>Make an Appointment</h2>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <select id="city" value={selectedCity} onChange={handleCitySelect}>
          <option value="">Select City</option>
          {cityCategories.map((cityCategory) => (
            <option key={cityCategory.id} value={cityCategory.categoryname}>
              {cityCategory.categoryname}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={selectedDate} onChange={handleDateSelect} />
      </div>
      <div className="form-group">
        <label htmlFor="timeSlot">Time Slot:</label>
        <div className="time-slots-container">
        {timeslots.map((timeslot) => (
            <div key={timeslot.id}>
              <button
                className={`time-slot ${selectedTimeSlot === timeslot.id ? 'selected' : ''}`}
                onClick={() => handleTimeSlotSelect(timeslot.id)}
              >
                {timeslot.hour.toString().padStart(2, '0')}:{timeslot.minutes.toString().padStart(2, '0')}
              </button>
            </div>
          ))}

        </div>
      </div>
      <button type="button" onClick={handleSubmit}>Book Appointment</button>
    </div>
  );
};

export default InsertAppointmentTest;
