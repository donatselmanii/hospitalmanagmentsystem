import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function SendEmail(props) {
  const { userId } = useParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.log("User ID is not available");
      // Handle the case when userId is undefined or not available
      // For example, redirect to a different page or display an error message
      // navigate("/users"); // Redirect to users page
    } else {
      console.log("User ID:", userId);
    }
  }, [userId, navigate]);

  async function sendEmail() {
    try {
      const response = await axios.get(`http://localhost:8081/users/${userId}`);
      const user = response.data;
      console.log("User Email:", user.email);

      await axios.post("http://localhost:8081/users/send-email", {
        recipient: user.email,
        subject: "Your Subject",
        message: message,
      });

      console.log("Email sent successfully");
    } catch (error) {
      console.log("Failed to send email:", error);
    }
  }

  return (
    <div>
      <h1>Send Email</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default SendEmail;
