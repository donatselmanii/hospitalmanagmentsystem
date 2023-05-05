import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/largedevices/Users.css'

function Users() {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8081/user");
      setUsers(response.data);
    }
    fetchData();
  }, []);

  async function deleteUser(id) {
    try {
      await axios.delete(`http://localhost:8081/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  async function editUser(id) {
    try {
      console.log("Edited user:", editedUser);
      await axios.put(`http://localhost:8081/users/${id}`, editedUser);
      setUsers(
        users.map((user) => (user.id === id ? { ...user, ...editedUser } : user))
      );
      setEditedUser({});
    } catch (error) {
      console.log(error);
    }
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
                <input type="text" placeholder="ID" defaultValue={user.id} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="ID Number" defaultValue={user.idnum} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="Name" defaultValue={user.name} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="Surname" defaultValue={user.surname} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="Phone" defaultValue={user.phone} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="Email" defaultValue={user.email} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="Role" defaultValue={user.role} />
              </td>
              <td className="adminPagetable">
                
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            <button onClick={() => editUser(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Users;
