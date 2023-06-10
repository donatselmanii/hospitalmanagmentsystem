import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserCardComponent() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/login/rolecheck', { withCredentials: true });
      const { idnum, name, surname, phone, email } = response.data;
      setUserData({ idnum, name, surname, phone, email });
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login'); // Redirect to the login page
    }
  };

  return (
    <>
      {userData ? (
        <div className="containerDashboard">
          <h1 className="titulliPershkrim">Welcome!</h1>
          <h2>Your info</h2>
          <p className="usercardp">
            <strong>ID Number:</strong> {userData.idnum}
          </p>
          <p className="usercardp">
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="usercardp">
            <strong>Surname:</strong> {userData.surname}
          </p>
          <p className="usercardp">
            <strong>Phone:</strong> {userData.phone}
          </p>
          <p className="usercardp">
            <strong>Email:</strong> {userData.email}
          </p>
          <div className="usercardtest">
            <a className="usercarda" href="">
              <button className="buttonusercard">Update your info</button>
            </a>
            <a className="usercarda" href="">
              <button className="buttonusercard">Change password</button>
            </a>
          </div>
          <a className="usercarda" href="">
            <button className="buttonusercard">Your appointments</button>
          </a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default UserCardComponent;
