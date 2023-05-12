import React, { useState } from 'react';
import Navigate from 'react-router-dom';
import axios from 'axios';
import '../../css/largedevices/ShowAlert.css'
import { useNavigate } from 'react-router-dom';

function Register() {
  const [IdnumReg, setIdnumReg] = useState('');
  const [NameReg, setNameReg] = useState('');
  const [SurnameReg, setSurnameReg] = useState('');
  const [PhoneReg, setPhoneReg] = useState('');
  const [EmailReg, setEmailReg] = useState('');
  const [PasswordReg, setPasswordReg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const Register = () => {
    axios
      .post('http://localhost:8081/users', {
        idnum: IdnumReg,
        name: NameReg,
        surname: SurnameReg,
        phone: PhoneReg,
        email: EmailReg,
        password: PasswordReg,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setShowAlert(true);
          setIdnumReg('');
          setNameReg('');
          setSurnameReg('');
          setPhoneReg('');
          setEmailReg('');
          setPasswordReg('');
        }
      });
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate('/login')
  };

  return (
    <>
      <div className="register">
        {showAlert && (
          <div className="alert">
            <p>Registration successful!</p>
            <button onClick={handleAlertClose}>OK</button>
          </div>
        )}
        <p>ID</p>
        <input type="text" value={IdnumReg} onChange={(e) => setIdnumReg(e.target.value)} />
        <p>Name</p>
        <input type="text" value={NameReg} onChange={(e) => setNameReg(e.target.value)} />
        <p>Surname</p>
        <input type="text" value={SurnameReg} onChange={(e) => setSurnameReg(e.target.value)} />
        <p>Phone</p>
        <input type="text" value={PhoneReg} onChange={(e) => setPhoneReg(e.target.value)} />
        <p>Email</p>
        <input type="text" value={EmailReg} onChange={(e) => setEmailReg(e.target.value)} />
        <p>Password</p>
        <input type="text" value={PasswordReg} onChange={(e) => setPasswordReg(e.target.value)} />
        <br />
        <button onClick={Register}>Register</button>
      </div>
    </>
  );  
}

export default Register;
