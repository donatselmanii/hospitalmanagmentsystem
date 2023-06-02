import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/largedevices/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [editedUsers, setEditedUsers] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8081/users");
      setUsers(response.data);
    }
    fetchData();
  }, []);

  async function deleteUser(id) {
    try {
      await axios.delete(`http://localhost:8081/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      resetInputField(id);
    } catch (error) {
      console.log(error);
    }
  }

  async function editUser(id, user) {
    try {
      const editedUser = editedUsers[id];
      const updatedUser = {
        ...user,
        ...editedUser
      };
      await axios.put(`http://localhost:8081/users/${id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === id ? { ...u, ...updatedUser } : u))
      );
      resetInputField(id);
    } catch (error) {
      console.log(error);
    }
  }
  

  function handleInputChange(event, userId, key) {
    const { value } = event.target;
    setEditedUsers((prevEditedUsers) => ({
      ...prevEditedUsers,
      [userId]: {
        ...prevEditedUsers[userId],
        [key]: value,
      },
    }));
  }

  function resetInputField(userId, field) {
    setEditedUsers((prevEditedUsers) => ({
      ...prevEditedUsers,
      [userId]: {
        ...prevEditedUsers[userId],
        [field]: undefined,
      },
    }));
  }
  

  return (
    <>
      <h1 className="adminPageH1">Users list</h1>
      <table>
        <thead>
          <tr>
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
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="adminPagetable">
                <input
                  type="text"
                  placeholder="ID"
                  value={editedUsers[user.id]?.id || user.id}
                  onChange={(event) => handleInputChange(event, user.id, "id")}
                />
              </td>
              <td className="adminPagetable">
                <input
                  type="text"
                  placeholder="ID Number"
                  value={editedUsers[user.id]?.idnum || user.idnum}
                  onChange={(event) => handleInputChange(event, user.id, "idnum")}
                />
              </td>
              <td className="adminPagetable">
                <input
                  type="text"
                  placeholder="Name"
                  value={editedUsers[user.id]?.name || user.name}
                  onChange={(event) => handleInputChange(event, user.id, "name")}
                />
              </td>
              <td className="adminPagetable">
                <input
                  type="text"
                  placeholder="Surname"
                  value={editedUsers[user.id]?.surname || user.surname}
                  onChange={(event) => handleInputChange(event, user.id, "surname")}
                />
              </td>
              <td className="adminPagetable">
                <input
                  type="text"
                  placeholder="Phone"
                  value={editedUsers[user.id]?.phone || user.phone}
                  onChange={(event) => handleInputChange(event, user.id, "phone")}
                />
              </td>
              <td className="adminPagetable">
                <input
                  type="text"
                  placeholder="Email"
                  value={editedUsers[user.id]?.email || user.email}
                  onChange={(event) => handleInputChange(event, user.id, "email")}
                />
              </td>
              <td className="adminPagetable">
                <input
                  type="text"
                  placeholder="Role"
                  value={editedUsers[user.id]?.role || user.role}
                  onChange={(event) => handleInputChange(event, user.id, "role")}
                />
              </td>
              <td className="adminPagetable">
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => editUser(user.id, user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Users;
