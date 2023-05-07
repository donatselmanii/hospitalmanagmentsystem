import axios from 'axios'
import React, { useState } from 'react';

function InsertAppointment(){
    const[DateTimeReg, setDateTimeReg] = useState("");
    const[CityCategoryReg, setCityCategoryReg] = useState("");

    const InsertAppointment = () =>{
        axios.post("http://localhost:8081/insertappointment",{
        datetime: DateTimeReg,
        citycategory: CityCategoryReg,
    }).then((response)=>{
         console.log(response);
    });
    }
    return(
        <div className="card">
  
    <div className="group">
        <input placeholder="" type="datetime-local" onChange={(e) => {setDateTimeReg(e.target.value); }}></input>
    <label>Date</label>
    </div>
<div className="group">
    <input placeholder="" type="text" required="" onChange={(e) => { setCityCategoryReg(e.target.value); }}></input>
    <label>City</label>
    </div>
    <button onClick={InsertAppointment}>Select an appointment</button>
  
  
</div>

    );
}
export default InsertAppointment