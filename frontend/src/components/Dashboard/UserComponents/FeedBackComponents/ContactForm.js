import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../css/largedevices/ContactForm.css';
import '../../../../css/largedevices/ShowAlert.css';

function ContactForm() {
  const [idnum, setIdnum] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    if (e.target.value.trim() !== '') {
      setErrorMessage('');
    }
  };

  const contactform = () => {
    if (comment.trim() === '') {
      setErrorMessage('Please enter a comment');
      return;
    }

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
    setShowAlert(true);
    setComment('');
  };

  const sendEmailToAdmin = () => {
    const emailData = {
      recipient: 'labcourse1@hotmail.com',
      subject: 'New Feedback Form User',
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

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="contactformcard">
      <div className="contactformgroup">
        <textarea className="contactformtextarea" onChange={handleCommentChange} value={comment}></textarea>
        <label className="contactformlabel">Comment</label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <button className="contactformbutton" onClick={contactform}>
        Send
      </button>
      {showAlert && (
        <div className="alert">
          <p>Message sent successfully!</p>
          <button className="loginbutton" onClick={handleAlertClose}>
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
