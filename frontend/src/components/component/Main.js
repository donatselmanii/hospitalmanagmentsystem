import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Doctorpage from './Doctorpage';
import Patientpage from './Patientpage';
import Adminpage from './Adminpage';

export default function Main() {
  const [role, setRole] = useState("");

  
  useEffect(() => {
    axios.get("http://localhost:8081/login").then((response) => {
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
      }
    });
  }, []);

  useEffect(() => {
    console.log("Role updated:", role);
  }, [role]);

  return (
    <>
      <p>Test main page</p>
      <div>
      {role =='patient' && <Patientpage />}
      {role =='doctor' && <Doctorpage />}
      {role =='admin' && <Adminpage />}
      </div>
      <h1>{role}</h1>
    </> 
  );
}

