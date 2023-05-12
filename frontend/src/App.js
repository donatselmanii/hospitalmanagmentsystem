import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import Main from './components/component/Main';
import Login from './components/homepagecomponents/Login';
import Register from './components/homepagecomponents/Register';
import Patientpage from './components/component/Patientpage';
import ContactForm from './components/component/User/ContactForm';
import Users from './components/component/Admin/Users';
import AdminMessages from './components/component/Admin/AdminMessages';
import InsertAppointment from './components/component/User/InsertAppointment';
import AddCategory from './components/component/Admin/AddCategory';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/Main" element={<Main />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AdminMessages" element={<AdminMessages />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Patientpage" element={<Patientpage />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/AdminMessages" element={<AdminMessages />} />
        <Route path="/Appointment" element={<InsertAppointment />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
