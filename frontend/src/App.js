import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Main from './components/component/Main';
import Login from './components/Login';
import Register from './components/Register';
import Patientpage from './components/component/Patientpage';
import ContactForm from './components/component/User/ContactForm';
import Users from './components/component/Admin/Users';
import AdminMessages from './components/component/Admin/AdminMessages';
import InsertAppointment from './components/component/User/InsertAppointment';
import AddCategory from './components/component/Admin/AddCategory';
import Dashboard from './components/component/Admin/Dashboard/Dashboard';
import AddProduct from './components/component/Admin/Dashboard/AddProduct';
import AddProductTest from './components/component/Admin/AddProductTest';
import MedicalReport from './components/component/Admin/MedicalReport';
import TimeSlots from './components/component/Admin/Dashboard/Appointments/TimeSlots';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/Main" element={<Main />} />
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AdminMessages" element={<AdminMessages />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Patientpage" element={<Patientpage />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/AdminMessages" element={<AdminMessages />} />
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
