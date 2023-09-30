import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardComponent from './DashboardComponent';
import StaffComponent from '../../AdminComponents/StaffComponents/StaffComponent';
import ClientOrder from '../../AdminComponents/UserManagmentComponents/ClientOrder';
import AppointmentComponent from '../../AdminComponents/AppointmentComponents/AppointmentComponent';
import TimeSlots from '../../AdminComponents/AppointmentComponents/TimeSlots'
import UserCardComponent from '../Card/UserCardComponent'
import AppointmentPatientComponent from '../../UserComponents/AppointmentComponents/AppointmentPatientComponent'
import InsertAppointment from '../../UserComponents/AppointmentComponents/InsertAppointment';
import ManageAppointmentsPatient from '../../UserComponents/AppointmentComponents/ManageAppointmentsPatient'
import ContactForm from '../../UserComponents/FeedBackComponents/ContactForm';
import DoctorAppointments from '../../DoctorComponents/Appointments/DoctorAppointments'
import Users from '../../AdminComponents/UserManagmentComponents/Users'
import Orders from '../../PharmComponents/Orders.js'
import '../../../../css/Dashboardcss/dashboard.css'
import AddProduct from '../../AdminComponents/EPharmComponents/AddProduct';
import ProductList from '../../AdminComponents/EPharmComponents/ProductList';
import InsertCompany from '../../AdminComponents/CategoryComponents/InsertCompany.js';
import InsertProductCategory from '../../AdminComponents/CategoryComponents/InsertProductCategory';
import AddCategory from '../../AdminComponents/CategoryComponents/AddCategory';
import ProductCategoryList from '../../AdminComponents/EPharmComponents/ProductCategoryList';
import CompanyList from '../../AdminComponents/EPharmComponents/CompanyList';


function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('usercard');
  const [userRole, setUserRole] = useState('');
  const [expandedItems, setExpandedItems] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await axios.get('http://localhost:8081/login/rolecheck', { withCredentials: true });
      const { role } = response.data;
      setUserRole(role);
    } catch (error) {
      console.error('Error fetching user role:', error);
      navigate('/login');
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
    const isExpanded = isItemExpanded(item);
    if (isExpanded) {
      setExpandedItems((prevItems) => prevItems.filter((i) => i !== item));
    } else {
      setExpandedItems((prevItems) => [...prevItems, item]);
    }
  
    setActiveComponent(item); 
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
    case 'MyOrders':
      contentComponent = <ClientOrder />;
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
    case 'ManageAppointmentsPatient':
      contentComponent = < ManageAppointmentsPatient/>;
      break; 
    case 'InsertAppointment':
      contentComponent = < InsertAppointment/>;
      break;
    case 'ContactForm':
      contentComponent = < ContactForm/>;
      break;
    case 'DoctorAppointments':
      contentComponent = < DoctorAppointments/>;
      break;
    case 'Users':
      contentComponent = < Users/>;
      break;
    case 'Orders':
      contentComponent = < Orders/>;
      break;
    case 'AddProduct':
      contentComponent = < AddProduct/>;
      break;
    case 'ProductList':
      contentComponent = < ProductList/>;
      break;
      case 'InsertCompany':
        contentComponent = < InsertCompany/>;
      break;
    case 'InsertProductCategory':
        contentComponent = < InsertProductCategory/>;
      break;
    case 'AddCategory':
        contentComponent = < AddCategory/>;
      break;
    case 'Company':
        contentComponent = < CompanyList/>;
      break;
    case 'ProductCategory':
        contentComponent = < ProductCategoryList/>;
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
            <a href="#" onClick={() => handleComponentChange('dashboard')}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('staff')}>
              Staff
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('Users')}>
              Patients
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('MyOrders')}>
              Orders
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('ProductList')}>
             Products
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
            <a href="#" onClick={() => handleComponentChange('AddCategory')}>
              Add Category
            </a>
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
            <a href="#" onClick={() => handleComponentChange('MyOrders')}>
              Orders
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
          <li>
            <a href="#" id="active--link" onClick={() => handleComponentChange('usercard')}>
              My info
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('MyOrders')}>
              Orders
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('DoctorAppointments')}>
              Appointments
            </a>
          </li>
          <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
        </ul>
      );
    } else if (userRole === 'pharm') {
      return (
        <ul className="sidebar--items">
          <li>
            <a href="#" id="active--link" onClick={() => handleComponentChange('usercard')}>
              My info
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('Orders')}>
              Orders
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('AddProduct')}>
              Add Products
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('ProductList')}>
             Products
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('InsertCompany')}>
              Add Company
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('InsertProductCategory')}>
             Add Product Category
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('Company')}>
            Company Category
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleComponentChange('ProductCategory')}>
            Product Category
            </a>
          </li>
          <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
          </li>
        </ul>
      );
    } else {
      navigate('/login');
      return null;
    }
  };

  return (
    <div>
      <section className="header"></section>
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
