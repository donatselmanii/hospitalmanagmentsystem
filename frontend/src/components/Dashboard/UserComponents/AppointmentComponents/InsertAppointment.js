import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../css/Appointment/InsertAppointment.css'

const InsertAppointment = () => {
  const [idnum, setIdnum] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [timeslots, setTimeSlots] = useState([]);
  const [cityCategories, setCityCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [patientName, setPatientName] = useState('');


  useEffect(() => {
    async function fetchUserRole() {
      try {
        const response = await axios.get('http://localhost:8081/login/rolecheck', { withCredentials: true });
        const { idnum, email, name } = response.data;
        setIdnum(idnum)
        setUserEmail(email);
        setPatientName(name);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }
    
    fetchUserRole();
  }, []);

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
        const selectedTimeSlotObj = timeslots.find((timeslot) => timeslot.id === selectedTimeSlot);

        
        const appointmentData = {
          idnum: idnum,
          categoryname: selectedCity,
          appointmentDate: selectedDate,
          timeslot: selectedTimeSlot,
          appointmentTime: `${selectedTimeSlotObj.hour.toString().padStart(2, '0')}:${selectedTimeSlotObj.minutes.toString().padStart(2, '0')}:00`,  
        };

        const response = await axios.post('http://localhost:8081/appointments/test', appointmentData);

        if (response.data.message === 'Maximum appointments limit reached for the specified date.') {
          setErrorMessage('Maximum appointments limit reached for the specified date.');
        } else if (response.data.message === 'No available doctor found in the specified city category.') {
          setErrorMessage('No available doctor found in the specified city category.');
        } else {
          const emailData = {
            recipient: userEmail,
            subject: 'Appointment Confirmation',
            message: `Dear ${patientName},\n\nYour appointment has been booked successfully.\n\nAppointment Details: \nCity: ${selectedCity},\nDate: ${selectedDate},\nTime: ${selectedTimeSlotObj.hour
              .toString()
              .padStart(2, '0')}:${selectedTimeSlotObj.minutes.toString().padStart(2, '0')}.\n\nThank you for choosing our service! 💊\n\nBest regards,\nThe Appointment Team`,
          };
          
          

          await axios.post('http://localhost:8081/users/send-email', emailData);

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
    <div className="insertappointment-form">
      <h2 className='insertappointment-h2'>Make an Appointment</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className='insertappointment-form-group'>
        <label className='insertappointment-label' htmlFor="city">City:</label>
        <select id="city" value={selectedCity} onChange={handleCitySelect}>
          <option value="">Select City</option>
          {cityCategories.map((cityCategory) => (
            <option key={cityCategory.id} value={cityCategory.categoryname}>
              {cityCategory.categoryname}
            </option>
          ))}
        </select>
      </div>
      <div className='insertappointment-form-group'>
        <label htmlFor="date">Date:</label>
        <input className='insertappointment-input' type="date" id="date" value={selectedDate} onChange={handleDateSelect} />
      </div>
      <div className='insertappointment-form-group'>
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
      <button className='insertappointment-button' type="button" onClick={handleSubmit}>
        Book Appointment
      </button>
    </div>
  );
};

export default InsertAppointment;
