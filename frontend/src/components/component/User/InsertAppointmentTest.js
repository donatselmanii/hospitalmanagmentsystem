import React, { useState } from 'react'; // Import the CSS file for styling


const InsertAppointmentTest = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const handleCitySelect = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDateSelect = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmit = () => {
    // Add your logic for handling the appointment submission, e.g., making an API request to save the appointment details
    // ...
  };

  const renderTimeSlots = () => {
    const startTime1 = new Date().setHours(8, 0, 0, 0); // Set the starting time for the first time slot (8:00 AM)
    const endTime1 = new Date().setHours(12, 0, 0, 0); // Set the ending time for the first time slot (12:00 PM)
    const startTime2 = new Date().setHours(13, 0, 0, 0); // Set the starting time for the second time slot (1:00 PM)
    const endTime2 = new Date().setHours(16, 0, 0, 0); // Set the ending time for the second time slot (4:00 PM)
    const timeSlotDuration = 30 * 60 * 1000; // Duration of each time slot in milliseconds
    const timeSlots = [];

    const addTimeSlots = (startTime, endTime) => {
      while (startTime < endTime) {
        const timeSlot = new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push(
          <div
            key={timeSlot}
            className={`time-slot ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
            onClick={() => handleTimeSlotSelect(timeSlot)}
          >
            {timeSlot}
          </div>
        );
        startTime += timeSlotDuration;
      }
    };

    addTimeSlots(startTime1, endTime1);
    addTimeSlots(startTime2, endTime2);

    return timeSlots;
  };

  return (
    <div className="appointment-form">
      <h2>Make an Appointment</h2>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <select id="city" value={selectedCity} onChange={handleCitySelect}>
          <option value="">Select City</option>
          <option value="city1">City 1</option>
          <option value="city2">City 2</option>
          <option value="city3">City 3</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={selectedDate} onChange={handleDateSelect} />
      </div>
      <div className="form-group">
        <label htmlFor="timeSlot">Time Slot:</label>
        <div className="time-slots-container">{renderTimeSlots()}</div>
      </div>
      <button onClick={handleSubmit}>Book Appointment</button>
    </div>
  );
};

export default InsertAppointmentTest;
