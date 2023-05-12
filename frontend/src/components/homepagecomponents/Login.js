import react, { useEffect, useState } from 'react'
import axios from 'axios';
import { BrowserRouter, Route, Link, useNavigate, Navigate } from 'react-router-dom';


function Login(){
    const[Idnum, setIdnum] = useState("");
    const[Password, setPassword] = useState("");
    const[loginstatus, setLoginStatus] = useState("");
    const[role, setrole] = useState("");
    const navigate = useNavigate();   
    
  
    axios.defaults.withCredentials=true;
    const login = () => {
        axios.post("http://localhost:8081/login", {
          idnum: Idnum,
          password: Password,
        }).then((response) => {
          if(response.data.Status === "Success"){
            navigate('/Main')
          } else{
            console.log("Error!")
          }
        });
      };

    

    return(
        <div>
            <p>ID</p>
            <input type="text" onChange={(e) => { setIdnum(e.target.value); }} />
            <p>Password</p>
            <input type="text" onChange={(e) => { setPassword(e.target.value); }} />
            <br></br>
            <button onClick={login}>Log In</button>
            <Link to="/Register">Register</Link>
            <h1>{loginstatus}</h1>
            <h1>{role}</h1>
        </div>
    );
    
}

export default Login