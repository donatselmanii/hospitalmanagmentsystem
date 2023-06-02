import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InsertAppointmentTest = () => {
  const [idnum, setIdnum] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeslots, setTimeSlots] = useState([]);
  const [cityCategories, setCityCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
          categoryname: selectedCity,
          appointmentDate: selectedDate,
          timeslot: selectedTimeSlot
        };

        const response = await axios.post('http://localhost:8081/appointments/test', appointmentData);

        if (response.data.message === 'Maximum appointments limit reached for the specified date.') {
          setErrorMessage('Maximum appointments limit reached for the specified date.');
        } else if (response.data.message === 'No available doctor found in the specified city category.') {
          setErrorMessage('No available doctor found in the specified city category.');
        } else {
          // Reset the form values
          setSelectedCity('');
          setSelectedDate('');
          setSelectedTimeSlot('');

          setErrorMessage('Appointment successfully booked!');
        }
      } catch (error) {
        console.error('Error booking appointment:', error);

        if (error.response && error.response.status === 409) {
          setErrorMessage('Maximum appointments limit reached for the specified date.');
        } else if (error.response && error.response.status === 404) {
          setErrorMessage('No available doctor found in the specified city category.');
        } else {
          setErrorMessage('Error booking appointment');
        }
      }
    } else {
      setErrorMessage('Please select a time slot before submitting the appointment.');
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:8081/login', { withCredentials: true })
      .then((res) => {
        if (res.data.Status === 'Success') {
          setIdnum(res.data.idnum);
          console.log('Okay');
        } else {
          console.log('Not okay');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/appointments/fetchtimeslots');
        setTimeSlots(response.data);
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCityCategories() {
      try {
        const response = await axios.get('http://localhost:8081/citycategory');
        setCityCategories(response.data);
      } catch (error) {
        console.error('Error fetching city categories:', error);
      }
    }
    fetchCityCategories();
  }, []);

  return (
    <div className="appointment-form">
      <h2>Make an Appointment</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
      <button type="button" onClick={handleSubmit}>
        Book Appointment
      </button>
    </div>
  );
};

export default InsertAppointmentTest;
