import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/largedevices/login.css';

function Login() {
  const [Idnum, setIdnum] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const login = () => {
    axios.post("http://localhost:8081/login", {
      idnum: Idnum,
      password: Password,
    }).then((response) => {
      if (response.data.Status === "Success") {
        navigate('/Dashboard');
      } else {
        console.log("Error!");
      }
    });
  };

  return (
    <>
     <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h1 className='h1login'>Hello People</h1>
		<p class="loginp" >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		Curabitur et est sed felis aliquet sollicitudin</p>
		</div>
	</div>
	
	
		<div class="right">
		<h5>Login</h5>
		<p class="loginp">Don't have an account? <a href="/Register">Create Your Account</a> it takes less than a minute</p>
		<div class="inputs">
			<input type="text" placeholder="ID Number" onChange={e => setIdnum(e.target.value)}/>
			<br/>
			<input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }}/>
		</div>
			
			<br/><br/>
			
		<div class="remember-me--forget-password">
		
	
			
		</div>
			
			<br/>
			<button class="loginbutton" onClick={login}>Log In</button>
	</div>
	
</div>
    </>
  );
}

export default Login;
