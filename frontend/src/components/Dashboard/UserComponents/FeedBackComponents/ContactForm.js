import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../css/largedevices/ContactForm.css'


function ContactForm() {
  const [idnum, setIdnum] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const response = await axios.get('http://localhost:8081/login/rolecheck', { withCredentials: true });
        const { idnum, email, name } = response.data;
        setIdnum(idnum);
        setEmail(email);
        setName(name);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }

    fetchUserRole();
  }, []);

  const contactform = () => {
    axios
      .post('http://localhost:8081/contactform', {
        name: name,
        email: email,
        comment: comment,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error submitting contact form:', error);
      });

      
      sendEmailToAdmin();
      console.log("Funksionon");

  };

  const sendEmailToAdmin = () => {
    const emailData = {
      recipient: 'labcourse1@hotmail.com', 
      subject: 'New FeedBack Form User',
      message: `Name: ${name}\nEmail: ${email}\n\n\nComment: ${comment}`,
    };

    axios
      .post('http://localhost:8081/users/send-email', emailData)
      .then(() => {
        console.log('Email sent to the admin');
      })
      .catch((error) => {
        console.error('Error sending email to the admin:', error);
      });
  };

  return (
    <div className="contactformcard">
      <div className="contactformgroup">
      <textarea className="contactformtextarea" onChange={(e) => setComment(e.target.value)}></textarea>
        <label className="contactformlabel">Comment</label>
      </div>
      <button className="contactformbutton" onClick={contactform}>
        Send
      </button>
    </div>
  );
}

export default ContactForm;
