import './App.css';
import Homepage from './components/Homepage';
import Login from './components/homepagecomponents/Login';
import Register from './components/homepagecomponents/Register';
import Patientpage from './components/component/Patientpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMessages from './components/component/AdminMessages';
import ContactForm  from './components/component/ContactForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AdminMessages" element={<AdminMessages />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Patientpage" element={<Patientpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
