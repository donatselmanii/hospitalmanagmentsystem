import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from '../css/largedevices/login.module.css';
import '../css/largedevices/ShowAlert.css';
import { useNavigate } from 'react-router-dom';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


function Register() {
  const [IdnumReg, setIdnumReg] = useState('');
  const [NameReg, setNameReg] = useState('');
  const [SurnameReg, setSurnameReg] = useState('');
  const [PhoneReg, setPhoneReg] = useState('');
  const [EmailReg, setEmailReg] = useState('');
  const [PasswordReg, setPasswordReg] = useState('');  
  const [selectedCity, setSelectedCity] = useState('');
  const [AddressReg, setAddressReg] = useState('');
  const [cityCategories, setCityCategories] = useState([]);
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
        city: selectedCity,
        address: AddressReg,
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
          setSelectedCity('');
          setAddressReg('');
        }
      });
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate('/login')
  };
  
  const handleCitySelect = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    async function fetchCityCategories() {
      try {
        const response = await axios.get('http://localhost:8081/citycategory');
        setCityCategories(response.data);
      } catch (error) {
        console.error('Error fetching city categories:', error);
      }
    }
    fetchCityCategories();
  }, []);


  return (
    <> 
      <div className={classes['box-form']}>
        <div className={classes.left}>
          <div className={classes.overlay}>
            <h1 className={classes.h1login}>Hello People</h1>
            <p className={classes.loginp}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et est sed felis aliquet sollicitudin</p>
          </div>
        </div>

        <div className={classes.right}>
        {showAlert && (
          <div className={classes.alert}>
            <p>Registration successful!</p>
            <button className={classes.loginbutton} onClick={handleAlertClose}>OK</button>
          </div>
        )}
          <h5 className={classes.h5}>Register</h5>
          <p className={classes.loginp}>Already have an account? <a href="/Login" className={classes.loginp}>Log In</a></p>
          <div className={classes.inputs}>
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
            <input type="text" placeholder="Address" value={AddressReg} onChange={e => setAddressReg(e.target.value)} />
            <br />
            <input type="password" placeholder="Password" value={PasswordReg} onChange={e => setPasswordReg(e.target.value)} />
          </div>
          <br />
          <div className={classes['insertappointment-form-group']}>
            <MDBDropdown>
          <MDBDropdownToggle>Select City</MDBDropdownToggle>
          <MDBDropdownMenu>
            {cityCategories.map((cityCategory) => (
              <MDBDropdownItem
                key={cityCategory.id}
                onClick={() => setSelectedCity(cityCategory.categoryname)}
              >
                {cityCategory.categoryname}
              </MDBDropdownItem>
            ))}
          </MDBDropdownMenu>
        </MDBDropdown>
          </div>
          <br />
          <button className={classes.loginbutton} onClick={Register}>Register</button>
        </div>
      </div>
    </>
  );  
}

export default Register;
