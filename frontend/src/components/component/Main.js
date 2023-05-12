import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [idnum, setIdnum] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/login', { withCredentials: true }).then(res => {
      if (res.data.Status === 'Success') {
        setAuth(true);
        setIdnum(res.data.idnum);
      } else {
        setAuth(false);
        setMessage(res.data.error);
      }
    }).catch(err => console.log(err))
  }, []);

  const handleLogout = () => {
    // Send a request to the server to delete the token or perform any necessary logout actions
    axios.post('http://localhost:8081/login/logout', { withCredentials: true }).then(res => {
      // Clear the token and reset the authentication state
      setAuth(false);
      setIdnum('');
      navigate('/');
    }).catch(err => console.log(err));
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };
  
  return (
    <>
    <p>Render</p>
  {auth ? (
    <>
      <h3>Authorized with id number: {idnum}</h3>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </>
  ) : (
    <>
          <h3>{message || 'You must be logged in. Please login.'}</h3>
          <button onClick={handleLoginRedirect}>Go to Login</button>
    </>
  )}
</>

  );
}

export default Main;
