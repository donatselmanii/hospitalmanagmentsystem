import react from 'react'
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function Login(){
    const[Idnum, setIdnum] = useState("");
    const[Password, setPassword] = useState("");
    const[loginstatus, setLoginStatus] = useState("");

    const Login = () =>{
        axios.post("http://localhost:8081/login",{
        idnum: Idnum,
        password: Password,
    }).then((response)=>{
         if(response.data.message){
            setLoginStatus(response.data.message);
         }else{
            setLoginStatus(response.data[0].role);
         }
    });
    }
    return(
        <div>
            <p>ID</p>
            <input type="text" onChange={(e) => { setIdnum(e.target.value); }} />
            <p>Password</p>
            <input type="text" onChange={(e) => { setPassword(e.target.value); }} />
            <br></br>
            <button onClick={Login}>Log In</button>
            <Link to="/Register">Register</Link>
        </div>
    );
    
}

export default Login