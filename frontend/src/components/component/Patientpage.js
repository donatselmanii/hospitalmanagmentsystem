import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Patientpage() {
  const [role, setRole] = useState('');  
  axios.defaults.withCredentials = true;


  useEffect(() => {
    axios.get("http://localhost:8081/login").then((response) => {
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
      }
    });
  }, []);

  return (
    <>
      <div>{role}</div>
      <p>Test</p>
    </>
  );
}

