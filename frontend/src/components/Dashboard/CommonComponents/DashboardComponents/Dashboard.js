import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardComponent from './DashboardComponent';
import StaffComponent from '../../AdminComponents/StaffComponents/StaffComponent';
import PatientComponent from '../../AdminComponents/PatientComponent';
import EpharmComponent from '../EPharmComponents/EpharmComponent';
import AppointmentComponent from '../../AdminComponents/AppointmentComponents/AppointmentComponent';
import TimeSlots from '../../AdminComponents/AppointmentComponents/TimeSlots'
import ManageAppointmentsComponent from '../../AdminComponents/AppointmentComponents/ManageAppointmentsComponent'
import UserCardComponent from '../Card/UserCardComponent'
import AppointmentPatientComponent from '../../UserComponents/AppointmentComponents/AppointmentPatientComponent'
import InsertAppointment from '../../UserComponents/AppointmentComponents/InsertAppointment';
import ContactForm from '../../UserComponents/FeedBackComponents/ContactForm';
import '../../../../css/Dashboardcss/dashboard.css'

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('usercard');
  const [userRole, setUserRole] = useState('');
  const [expandedItems, setExpandedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Make API call to fetch user role
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await axios.get('http://localhost:8081/login/rolecheck', { withCredentials: true });
      const { role } = response.data;
      setUserRole(role);
    } catch (error) {
      console.error('Error fetching user role:', error);
      navigate('/login'); // Redirect to the login page
    }
  };

  const handleLogout = () => {

    axios.post('http://localhost:8081/login/logout', { withCredentials: true }).then(res => {
      setUserRole('');
      navigate('/');
    }).catch(err => console.log(err));
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const handleNestedItemClick = (item) => {
    // Toggle the expansion of the nested item
    const isExpanded = isItemExpanded(item);
    if (isExpanded) {
      setExpandedItems((prevItems) => prevItems.filter((i) => i !== item));
    } else {
      setExpandedItems((prevItems) => [...prevItems, item]);
    }
  
    setActiveComponent(item); // Set activeComponent to the clicked nested item
  };
  

  const isItemExpanded = (item) => {
    return expandedItems.includes(item);
  };

  const renderNestedItems = (parentItem) => {
    if (parentItem === 'dashboard') {
      return (
        <ul>
          <li>
            <a href="#" onClick={() => handleNestedItemClick('TimeSlots')}>
              Time Slots
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleNestedItemClick('ManageAppointments')}>
              Manage Appointments
            </a>
          </li>
        </ul>
      );
    }
    if (parentItem === 'appointment') {
      return (
        <ul>
          <li>
            <a href="#" onClick={() => handleNestedItemClick('TimeSlots')}>
              Time Slots
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleNestedItemClick('ManageAppointments')}>
              Manage Appointments
            </a>
          </li>
        </ul>
      );
    }
    if (parentItem === 'appointmentpatient') {
      return (
        <ul>
          <li>
            <a href="#" onClick={() => handleNestedItemClick('InsertAppointment')}>
              Insert Appointment 
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleNestedItemClick('ManageAppointments')}>
              Manage Appointments
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleNestedItemClick('ContactForm')}>
              FeedBack 
            </a>
          </li>
        </ul>
      );
    }
    return null;
  };

  let contentComponent;

  switch (activeComponent) {
    case 'usercard':
      contentComponent = <UserCardComponent />;
      break;
    case 'dashboard':
      contentComponent = <DashboardComponent />;
      break;
    case 'staff':
      contentComponent = <StaffComponent />;
      break;
    case 'patient':
      contentComponent = <PatientComponent />;
      break;
    case 'epharm':
      contentComponent = <EpharmComponent />;
      break;
    case 'appointment':
      contentComponent = <AppointmentComponent />;
      break;
    case 'appointmentpatient':
      contentComponent = <AppointmentPatientComponent />;
      break;
    case 'TimeSlots':
      contentComponent = <TimeSlots />;
      break;
    case 'ManageAppointments':
      contentComponent = < ManageAppointmentsComponent/>;
      break; 
    case 'InsertAppointment':
      contentComponent = < InsertAppointment/>;
      break;
    case 'ContactForm':
      contentComponent = < ContactForm/>;
      break;
    default:
      contentComponent = null;
  }

  const renderNavbar = () => {
    if (userRole === 'admin') {
      return (
        <ul className="sidebar--items">
          <li>
            <a href="#" id="active--link" onClick={() => handleComponentChange('usercard')}>
              My info
            </a>
          </li>
          <li>
            <a href="#" id="active--link" onClick={() => handleComponentChange('dashboard')}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('staff')}>
              Staff
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('patient')}>
              Patients
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('epharm')}>
              E-pharm
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNestedItemClick('appointment')}
              className={isItemExpanded('appointment') ? 'expanded' : ''}
            >
              Appointments
            </a>
            {isItemExpanded('appointment') && renderNestedItems('appointment')}
          </li>
          <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
        </ul>
      );
    } else if (userRole === 'patient') {
      return (
        <ul className="sidebar--items">
          <li>
            <a href="#" id="active--link" onClick={() => handleComponentChange('usercard')}>
              My info
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('epharm')}>
              E-pharm
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNestedItemClick('appointmentpatient')}
              className={isItemExpanded('appointmentpatient') ? 'expanded' : ''}
            >
              Appointments
            </a>
            {isItemExpanded('appointmentpatient') && renderNestedItems('appointmentpatient')}
          </li>
          <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>

        </ul>
      );
    } else if (userRole === 'doctor') {
      return (
        <ul className="sidebar--items">
          {/* Doctor-specific navbar items */}
          <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
        </ul>
      );
    } else {
      navigate('/login'); // Redirect to the login page
      return null;
    }
  };

  return (
    <div>
      <section className="header">{/* Header content */}</section>
      <section className="main">
        <div className="sidebar">
          {renderNavbar()}
          <ul className="sidebar--bottom-items">
            
          </ul>
        </div>
        <div className="content">{contentComponent}</div>
      </section>
    </div>
  );
}

export default Dashboard;
