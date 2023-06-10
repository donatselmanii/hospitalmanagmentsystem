import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardComponent() {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({});
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8081/users/recentusers");
      setUsers(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/users/count')
      .then(response => {
        setTotalPatients(response.data.count);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/appointments/count')
      .then(response => {
        setTotalAppointments(response.data.count);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/users/countDoctors')
      .then(response => {
        setTotalDoctors(response.data.doctorcount);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  function handleInputChange(event, key) {
    const value = event.target.value;
    setEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      [key]: value,
    }));
  }

  return (
    <main>
    <div className="dashboard">
      <div className="main--content">
        <div className="overview">
          <div className="title">
            <h2 className="section--title">Overview</h2>
            <select name="date" id="date" className="dropdown">
              <option value="today">Today</option>
              <option value="lastweek">Last Week</option>
              <option value="lastmonth">Last Month</option>
              <option value="lastyear">Last Year</option>
              <option value="alltime">All Time</option>
            </select>
          </div>
          <div className="cards">
            <div className="card card-1">
              <div className="card--data">
                <div className="card--content">
                  <h5 className="card--title">Total Appointments</h5>
                  <h1>{totalAppointments}</h1>
                </div>
                <i className="ri-user-2-line card--icon--lg"></i>
              </div>
              <div className="card--stats">
                <span><i className="ri-bar-chart-fill card--icon stat--icon"></i>65%</span>
                <span><i className="ri-arrow-up-s-fill card--icon up--arrow"></i>10</span>
                <span><i className="ri-arrow-down-s-fill card--icon down--arrow"></i>2</span>
              </div>
            </div>
            <div className="card card-2">
              <div className="card--data">
                <div className="card--content">
                  <h5 className="card--title">Total Patients</h5>
                  <h1>{totalPatients}</h1>
                </div>
                <i className="ri-user-line card--icon--lg"></i>
              </div>
              <div className="card--stats">
  <span>
    <i className="ri-bar-chart-fill card--icon stat--icon"></i>
  </span>
  <span>
    <i className="ri-arrow-up-s-fill card--icon up--arrow"></i>230
  </span>
  <span>
    <i className="ri-arrow-down-s-fill card--icon down--arrow"></i>45
  </span>
</div>

            </div>
            <div className="card card-3">
              <div className="card--data">
                <div className="card--content">
                  <h5 className="card--title">Doctors</h5>
                  <h1>{totalDoctors}</h1>
                </div>
                <i className="ri-calendar-2-line card--icon--lg"></i>
              </div>
              <div className="card--stats">
                <span><i className="ri-bar-chart-fill card--icon stat--icon"></i>27%</span>
                <span><i className="ri-arrow-up-s-fill card--icon up--arrow"></i>31</span>
                <span><i className="ri-arrow-down-s-fill card--icon down--arrow"></i>23</span>
              </div>
            </div>
            <div className="card card-4">
              <div className="card--data">
                <div className="card--content">
                  <h5 className="card--title">Beds Available</h5>
                  <h1>15</h1>
                </div>
                <i className="ri-hotel-bed-line card--icon--lg"></i>
              </div>
              <div className="card--stats">
                <span><i className="ri-bar-chart-fill card--icon stat--icon"></i>8%</span>
                <span><i className="ri-arrow-up-s-fill card--icon up--arrow"></i>11</span>
                <span><i className="ri-arrow-down-s-fill card--icon down--arrow"></i>2</span>
              </div>
            </div>
          </div>
        </div>
        <div className="doctors">
          <div className="title">
            <h2 className="section--title">Doctors</h2>
            <div className="doctors--right--btns">
              <select name="date" id="date" className="dropdown doctor--filter">
                <option>Filter</option>
                <option value="free">Free</option>
                <option value="scheduled">Scheduled</option>
              </select>
              <button className="add"><i className="ri-add-line"></i>Add Doctor</button>
            </div>
          </div>
          <div className="doctors--cards">
            <a href="#" className="doctor--card">
              <div className="img--box--cover">
                <div className="img--box">
                  <img src="assets/images/doctor1.jpg" alt="" />
                </div>
              </div>
              <p className="free">Free</p>
            </a>
            <a href="#" className="doctor--card">
              <div className="img--box--cover">
                <div className="img--box">
                  <img src="assets/images/doctor2.jpg" alt="" />
                </div>
              </div>
              <p className="scheduled">Scheduled</p>
            </a>
            {/* More doctor cards */}
          </div>
        </div>
        <div className="recent--patients">
          <div className="title">
            <h2 className="section--title">Recent Patients</h2>
            <button className="add"><i className="ri-add-line"></i>Add Doctor</button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID Number</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="ID Number"
                        defaultValue={user.idnum}
                        onChange={(event) => handleInputChange(event, "idnum")}
                      />
                    </td>
                    <td>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Name"
                        defaultValue={user.name}
                        onChange={(event) => handleInputChange(event, "name")}
                      />
                    </td>
                    <td >
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Surname"
                        defaultValue={user.surname}
                        onChange={(event) => handleInputChange(event, "surname")}
                      />
                    </td>
                    <td >
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Phone"
                        defaultValue={user.phone}
                        onChange={(event) => handleInputChange(event, "phone")}
                      />
                    </td>
                    <td>
                      <input
                      className="input-field"
                        type="text"
                        placeholder="Email"
                        defaultValue={user.email}
                        onChange={(event) => handleInputChange(event, "email")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
}

export default DashboardComponent;
