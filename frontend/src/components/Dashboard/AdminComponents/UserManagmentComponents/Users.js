import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../css/largedevices/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
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
      setEditingUserId(null); // Clear editing state after deletion
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
      setEditingUserId(null); // Clear editing state after update
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

  return (
    <>
      <h1 className="adminPageH1">Users list</h1>
      <div className="Users-container">
        <table className="Users-table">
          <thead className="Users-thead">
            <tr className="Users-tr">
              <th className="adminPageTableHead">ID</th>
              <th className="adminPageTableHead">ID Number</th>
              <th className="adminPageTableHead">Name</th>
              <th className="adminPageTableHead">Surname</th>
              <th className="adminPageTableHead">Phone</th>
              <th className="adminPageTableHead">Email</th>
              <th className="adminPageTableHead">Role</th>
              <th className="adminPageTableHead">Functions</th>
            </tr>
          </thead>
          <tbody className="Users-tbody">
            {users.map((user) => (
              <tr className="Users-tr" key={user.id}>
                <td className="adminPagetable">{user.id}</td>
                <td className="adminPagetable">{user.idnum}</td>
                <td className="adminPagetable">{user.name}</td>
                <td className="adminPagetable">{user.surname}</td>
                <td className="adminPagetable">{user.phone}</td>
                <td className="adminPagetable">{user.email}</td>
                <td className="adminPagetable">{user.role}</td>
                <td className="adminPagetable">
                  <div>
                    <button className="Users-button" onClick={() => deleteUser(user.id)}>
                      Delete
                    </button>
                    <button className="Users-button" onClick={() => handleSendEmail(user.id)}>
                      Send Email
                    </button>
                    {editingUserId === user.id ? (
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={user.name}
                          onChange={(e) => setUsers((prevUsers) =>
                            prevUsers.map((prevUser) => (
                              prevUser.id === user.id ? { ...prevUser, name: e.target.value } : prevUser
                            ))
                          )}
                        />
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={user.email}
                          onChange={(e) => setUsers((prevUsers) =>
                            prevUsers.map((prevUser) => (
                              prevUser.id === user.id ? { ...prevUser, email: e.target.value } : prevUser
                            ))
                          )}
                        />
                        <input
                          type="text"
                          name="idnum"
                          placeholder="ID Number"
                          value={user.idnum}
                          onChange={(e) => setUsers((prevUsers) =>
                            prevUsers.map((prevUser) => (
                              prevUser.id === user.id ? { ...prevUser, idnum: e.target.value } : prevUser
                            ))
                          )}
                        />
                        {/* Add other input fields for updating other fields */}
                        {/* For example, add input fields for surname, phone, and role */}
                        <input
                          type="text"
                          name="surname"
                          placeholder="Surname"
                          value={user.surname}
                          onChange={(e) => setUsers((prevUsers) =>
                            prevUsers.map((prevUser) => (
                              prevUser.id === user.id ? { ...prevUser, surname: e.target.value } : prevUser
                            ))
                          )}
                        />
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone"
                          value={user.phone}
                          onChange={(e) => setUsers((prevUsers) =>
                            prevUsers.map((prevUser) => (
                              prevUser.id === user.id ? { ...prevUser, phone: e.target.value } : prevUser
                            ))
                          )}
                        />
                        <input
                          type="text"
                          name="role"
                          placeholder="Role"
                          value={user.role}
                          onChange={(e) => setUsers((prevUsers) =>
                            prevUsers.map((prevUser) => (
                              prevUser.id === user.id ? { ...prevUser, role: e.target.value } : prevUser
                            ))
                          )}
                        />
                        <button className="Users-button" onClick={() => updateUser(user)}>
                          Update
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button className="Users-button" onClick={() => handleEditUser(user.id)}>
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
