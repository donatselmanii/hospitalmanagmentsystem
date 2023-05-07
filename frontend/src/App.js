import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import Main from './components/component/Main';
import Login from './components/homepagecomponents/Login';
import Register from './components/homepagecomponents/Register';
import Patientpage from './components/component/Patientpage';
import ContactForm from './components/component/ContactForm';
import Users from './components/component/Users';
import AdminMessages from './components/component/AdminMessages';
import InsertAppointment from './components/component/User/InsertAppointment';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AdminMessages" element={<AdminMessages />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Patientpage" element={<Patientpage />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/AdminMessages" element={<AdminMessages />} />
        <Route path="/Appointment" element={<InsertAppointment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
