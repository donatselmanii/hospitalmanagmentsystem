import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../../../../../css/largedevices/Users.css'

function AdminMessages() {
  const [contactforms, setContactForms] = useState([]);
  const [editedContactForm, setEditedContactForm] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8081/contactform/");
      setContactForms(response.data);
    }
    fetchData();
  }, []);

  async function confirmMessage(id) {
    try {
      await axios.put(`http://localhost:8081/contactform/${id}`, { status: "Message has been answered in email" });
      setContactForms(
        contactforms.map((contactform) => (contactform.id === id ? { ...contactform, status: "Message has been answered in email" } : contactform))
      );
    } catch (error) {
      console.log(error);
    }
  }

 

  return (
    <>
      <h1 className="adminPageH1">Contact Form Messages</h1>
      <table>
        <thead>
          <tr>
            <th className="adminPageTableHead">ID</th>
            <th className="adminPageTableHead">Name</th>
            <th className="adminPageTableHead">Email</th>
            <th className="adminPageTableHead">Comment</th>
            <th className="adminPageTableHead">Status</th>
            <th className="adminPageTableHead">Functions</th>
          </tr>
        </thead>
        <tbody>
          {contactforms.map((contactform) => (
            <tr key={contactform.id}>
              <td className="adminPagetable">
                <input type="text" placeholder="ID" defaultValue={contactform.id} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="Name" defaultValue={contactform.name} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="Email" defaultValue={contactform.email} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="Comment" defaultValue={contactform.comment} />
              </td>
              <td className="adminPagetable">
                <input type="text" placeholder="status" defaultValue={contactform.status} />
              </td>
              <td className="adminPagetable">
            
              <button onClick={() => confirmMessage(contactform.id)}>Confirm</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminMessages;
