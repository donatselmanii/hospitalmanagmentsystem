import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from "mdb-react-ui-kit";
import classes from "../../../../css/largedevices/Users.module.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8081/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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

    // Find the user to edit by ID
    const userToEdit = users.find((user) => user.id === userId);

    // Set the editUserData to the user's data
    setEditUserData({ ...userToEdit });
  }

  function handleCancelEdit() {
    setEditingUserId(null);
  }

  function handleSendEmail(userId) {
    navigate(`/email/${userId}`);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEditUserData((prevData) => ({ ...prevData, [name]: value }));
  }

  return (
    <>
      <h1 className={classes.adminPageH1}>Users list</h1>
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
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.idnum}</td>
              <td>
                {editingUserId === user.id ? (
                  <MDBInput
                    type="text"
                    name="name"
                    value={editUserData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <MDBInput
                    type="text"
                    name="surname"
                    value={editUserData.surname}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.surname
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <MDBInput
                    type="text"
                    name="phone"
                    value={editUserData.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <MDBInput
                    type="text"
                    name="email"
                    value={editUserData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <MDBInput
                    type="text"
                    name="role"
                    value={editUserData.role}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                <div>
                  <MDBBtn color="danger" size="sm" onClick={() => deleteUser(user.id)}>
                    Delete
                  </MDBBtn>
                  <MDBBtn color="success" size="sm" onClick={() => handleSendEmail(user.id)}>
                    Send Email
                  </MDBBtn>
                  {editingUserId === user.id ? (
                    <div>
                      <MDBBtn color="success" size="sm" onClick={() => updateUser(editUserData)}>
                        Update
                      </MDBBtn>
                      <MDBBtn color="warning" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </MDBBtn>
                    </div>
                  ) : (
                    <MDBBtn color="warning" size="sm" onClick={() => handleEditUser(user.id)}>
                      Edit
                    </MDBBtn>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}

export default Users;
