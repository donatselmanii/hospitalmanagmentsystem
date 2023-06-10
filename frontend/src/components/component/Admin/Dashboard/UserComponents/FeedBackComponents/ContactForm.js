import react from 'react'
import axios from 'axios'
import React, { useState } from 'react';

function ContactForm(){
    const[NameReg, setNameReg] = useState("");
    const[EmailReg, setEmailReg] = useState("");
    const[CommentReg, setCommentReg] = useState("");

    const contactform = () =>{
        axios.post("http://localhost:8081/contactform",{
        name: NameReg,
        email: EmailReg,
        comment: CommentReg,
    }).then((response)=>{
         console.log(response);
    });
    }
    return(
        <div className="card">
  
    <div className="group">
    <input placeholder="" type="text" onChange={(e) => { setNameReg(e.target.value); }}></input>
    <label>Name</label>
    </div>
<div className="group">
    <input placeholder="" type="text" required="" onChange={(e) => { setEmailReg(e.target.value); }}></input>
    <label>Email</label>
    </div>
<div className="group">
    <input placeholder=""  onChange={(e) => { setCommentReg(e.target.value); }}></input>
    <label>Comment</label>
</div>
    <button onClick={contactform}>Send</button>
  
  
</div>

    );
}
export default ContactForm