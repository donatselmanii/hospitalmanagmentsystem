import react from 'react'
import React, { useState } from 'react';
import axios from 'axios';

function Register(){
    const[IdnumReg, setIdnumReg] = useState("");
    const[NameReg, setNameReg] = useState("");
    const[SurnameReg, setSurnameReg] = useState("");
    const[PhoneReg, setPhoneReg] = useState("");
    const[EmailReg, setEmailReg] = useState("");
    const[PasswordReg, setPasswordReg] = useState("");

    axios.defaults.withCredentials = true;
    const Register = () =>{
        axios.post("http://localhost:8081/register",{
        idnum: IdnumReg,
        name: NameReg,
        surname: SurnameReg,
        phone: PhoneReg,
        email: EmailReg,
        password: PasswordReg,
    }).then((response)=>{
         console.log(response);
    });
    }
    return(
        <div>
            <p>ID</p>
            <input type="text" onChange={(e) => { setIdnumReg(e.target.value); }} />
            <p>Name</p>
            <input type="text" onChange={(e) => { setNameReg(e.target.value); }} />
            <p>Surname</p>
            <input type="text" onChange={(e) => { setSurnameReg(e.target.value); }} />
            <p>Phone</p>
            <input type="text" onChange={(e) => { setPhoneReg(e.target.value); }} />
            <p>Email</p>
            <input type="text" onChange={(e) => { setEmailReg(e.target.value); }} />
            <p>Password</p>
            <input type="text" onChange={(e) => { setPasswordReg(e.target.value); }} />
            <br></br>
            <button onClick={Register}>Register</button>
        </div>
    );
    
}

export default Register