import React, { useState } from 'react';
import axios from 'axios';
import '../css/largedevices/login.css'
import '../css/largedevices/ShowAlert.css'
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
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1 className="h1login">Hello People</h1>
            <p className="loginp">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et est sed felis aliquet sollicitudin</p>
          </div>
        </div>

        <div className="right">
        {showAlert && (
          <div className="alert">
            <p>Registration successful!</p>
            <button className='loginbutton' onClick={handleAlertClose}>OK</button>
          </div>
        )}
          <h5>Register</h5>
          <p className="loginp">Already have an account? <a href="/Login">Log In</a></p>
          <div className="inputs">
            <input type="text" placeholder="ID Number" value={IdnumReg} onChange={(e) => setIdnumReg(e.target.value)} />
            <br />
            <input type="text" placeholder="Name" value={NameReg} onChange={e => setNameReg(e.target.value)} />
            <br />
            <input type="text" placeholder="Surname" value={SurnameReg} onChange={e => setSurnameReg(e.target.value)} />
            <br />
            <input type="text" placeholder="Phone" value={PhoneReg} onChange={e => setPhoneReg(e.target.value)} />
            <br />
            <input type="text" placeholder="Email" value={EmailReg} onChange={e => setEmailReg(e.target.value)} />
            <br />
            <input type="password" placeholder="Password" value={PasswordReg} onChange={e => setPasswordReg(e.target.value)} />
          </div>
          <br /><br />
          <button className="loginbutton" onClick={Register}>Register</button>
        </div>
      </div>
    </>
  );  
}

export default Register;
