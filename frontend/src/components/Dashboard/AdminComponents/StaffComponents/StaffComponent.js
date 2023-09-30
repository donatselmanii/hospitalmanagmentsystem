import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "../../../../css/largedevices/Staff.module.css";
import { useNavigate } from "react-router-dom";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'; 


function StaffComponent() {
  const [selectedCity, setSelectedCity] = useState("");
  const [cityCategories, setCityCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCityCategories() {
      try {
        const response = await axios.get('http://localhost:8081/citycategory');
        setCityCategories(response.data);
      } catch (error) {
        console.error('Error fetching city categories:', error);
      }
    }
    fetchCityCategories();
  }, []);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await axios.get(
          `http://localhost:8081/users/doctors/${selectedCity}`
        );
        setUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    }

    if (selectedCity) {
      fetchDoctors();
    }
  }, [selectedCity]);

  const handleCitySelect = (event) => {
    setSelectedCity(event.target.value);
    setSelectedUser(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  async function deleteUser(id) {
    try {
      await axios.delete(`http://localhost:8081/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setEditingUserId(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUser(updatedUser) {
    try {
      await axios.put(`http://localhost:8081/users/${updatedUser.id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditingUserId(null);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditUser(userId) {
    setEditingUserId(userId);
  }

  function handleSendEmail(userId) {
    navigate(`/email/${userId}`);
  }

  function handleViewAppointments(user) {
    if (user) {
      if (user.role === "doctor") {
        navigate(`/appointments/${user.id}`);
      } else {
        alert("This function is for doctors only.");
      }
    }
  }

  

  return (
    <div className={classes.usersContainer}>
      <h1>Staff Page</h1>
      <label className={classes.insertAppointmentLabel} htmlFor="city">
        City:
      </label>
      <select
  id="city"
  value={selectedCity}
  onChange={handleCitySelect}
  style={{ marginLeft: '300px' }}
>
        <option value="">Select City</option>
        {cityCategories.map((cityCategory) => (
          <option key={cityCategory.id} value={cityCategory.categoryname}>
            {cityCategory.categoryname}
          </option>
        ))}
      </select>

      <div className={classes.usersPage}>
      <MDBTable className={classes.marginLeftTable}>
          <MDBTableHead>
            <tr>
              <th>ID</th>
              <th>ID Number</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Functions</th>
              <th>Additional Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.idnum}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div>
                    <MDBBtn color='danger' size='sm' onClick={() => deleteUser(user.id)}>
                      Delete
                    </MDBBtn>
                    <MDBBtn color='success' size='sm' onClick={() => handleSendEmail(user.id)}>
                      Send Email
                    </MDBBtn>
                    {editingUserId === user.id ? (
                      <div>
                        <MDBBtn color='success' size='sm' onClick={() => updateUser(user)}>
                          Update
                        </MDBBtn>
                      </div>
                    ) : (
                      <div>
                        <MDBBtn color='warning' size='sm' onClick={() => handleEditUser(user.id)}>
                          Edit
                        </MDBBtn>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <MDBBtn color='info' size='sm' onClick={() => handleViewAppointments(user)}>
                    Appointments
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );

}

export default StaffComponent;