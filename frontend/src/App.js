import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ContactForm from './components/Dashboard/UserComponents/FeedBackComponents/ContactForm';
import Users from './components/Dashboard/AdminComponents/UserManagmentComponents/Users';
import AdminMessages from './components/Dashboard/AdminComponents/FeedBackMessagesComponents/AdminMessages';
import InsertAppointment from './components/Dashboard/UserComponents/AppointmentComponents/InsertAppointment';
import AddCategory from './components/Dashboard/AdminComponents/CategoryComponents/AddCategory';
import Dashboard from './components/Dashboard/CommonComponents/DashboardComponents/Dashboard';
import AddProduct from './components/Dashboard/AdminComponents/EPharmComponents/AddProduct';
import AddProductTest from './components/Dashboard/AdminComponents/AddProductTest';
import MedicalReport from './components/Dashboard/DoctorComponents/MedicalReport';
import TimeSlots from './components/Dashboard/AdminComponents/AppointmentComponents/TimeSlots';
import SendEmail from './components/Dashboard/AdminComponents/AppointmentComponents/SendEmail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AdminMessages" element={<AdminMessages />} />
          <Route path="/ContactForm" element={<ContactForm />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/email/:userId" element={<SendEmail />} />
          <Route path="/Appointment" element={<InsertAppointment />} />
          <Route path="/Test" element={<InsertAppointment />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/AddProductTest" element={<AddProductTest />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/Report" element={<MedicalReport />} />
          <Route path="/TimeSlots" element={<TimeSlots />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
