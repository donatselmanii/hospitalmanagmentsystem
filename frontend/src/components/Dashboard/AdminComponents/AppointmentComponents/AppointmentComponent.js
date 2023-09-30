import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBInput,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdb-react-ui-kit';
import '../../../../css/Dashboardcss/dashboard.css';
import '../../../../css/Appointment/AppointmentComponent.css';

function AppointmentComponent() {
  const [appointments, setAppointments] = useState([]);
  const [timeRange, setTimeRange] = useState('last10');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let url = `http://localhost:8081/appointments/fetch/${timeRange}`;

      switch (timeRange) {
        case 'today':
          url += '?timeRange=today';
          break;
        case 'yesterday':
          url += '?timeRange=yesterday';
          break;
        case 'lastweek':
          url += '?timeRange=lastweek';
          break;
        case 'lastmonth':
          url += '?timeRange=lastmonth';
          break;
        case 'last10':
          url += '?timeRange=last10';
          break;
        case 'all':
          url += '?timeRange=all';
          break;
        default:
          break;
      }

      // Add the search query to the URL if it's provided
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const response = await axios.get(url);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleDropdownSelect = (selectedTimeRange) => {
    setTimeRange(selectedTimeRange);
    // Clear the search input when the dropdown value changes
    clearSearch();
  };

  // Function to clear the search input
  const clearSearch = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    fetchData();
  }, [timeRange, searchQuery]);

  const handleWriteReport = (appointmentId) => {
    navigate(`/medical-report/${appointmentId}`);
  };

  return (
    <div className="AppointmentComponent-container">
      <div className="AppointmentComponent-tablediv">
        <div>
          <MDBDropdown style={{ width: '180px', marginRight: '300px' }}>
  <MDBDropdownToggle color="primary" caret>
    {timeRange === 'last10' ? 'Last 10 Appointments' : timeRange}
  </MDBDropdownToggle>
  <MDBDropdownMenu>
    <MDBDropdownItem onClick={() => handleDropdownSelect('last10')}>
      Last 10
    </MDBDropdownItem>
    <MDBDropdownItem onClick={() => handleDropdownSelect('today')}>
      Today
    </MDBDropdownItem>
    <MDBDropdownItem onClick={() => handleDropdownSelect('yesterday')}>
      Yesterday
    </MDBDropdownItem>
    <MDBDropdownItem onClick={() => handleDropdownSelect('lastweek')}>
      Last Week
    </MDBDropdownItem>
    <MDBDropdownItem onClick={() => handleDropdownSelect('lastmonth')}>
      Last Month
    </MDBDropdownItem>
    <MDBDropdownItem onClick={() => handleDropdownSelect('all')}>
      All
    </MDBDropdownItem>
  </MDBDropdownMenu>
</MDBDropdown>

        </div>

        <div>
          <label>Search by Appointment ID, Doctor ID, ID Num:</label>
          <MDBInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Replace the HTML table with MDBTable */}
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>Appointment ID</th>
              <th>ID Number</th>
              <th>Doctor ID</th>
              <th>Date & Time</th>
              <th>City</th>
              <th>Time</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.appointmentid}</td>
                <td>{appointment.idnum}</td>
                <td>{appointment.doctor_id}</td>
                <td>{new Date(appointment.appointment_date).toDateString()}</td>
                <td>{appointment.categoryname}</td>
                <td>{appointment.appointment_time}</td>
                <td>
                  <MDBBtn
                    color="primary"
                    size="sm"
                    className="DoctorAppointments-button"
                    onClick={() => handleWriteReport(appointment.appointmentid)}
                  >
                    View Report
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}

export default AppointmentComponent;
