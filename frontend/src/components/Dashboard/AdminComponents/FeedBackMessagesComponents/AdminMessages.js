import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from '../../../../css/largedevices/Users.module.css'

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
    <div>
      <h1 className={classes.adminPageH1}>Contact Form Messages</h1>
      <table className={classes["Users-table"]}>
        <thead className={classes["Users-thead"]}>
          <tr className={classes["Users-tr"]}>
            <th className={classes.adminPageTableHead}>ID</th>
            <th className={classes.adminPageTableHead}>Name</th>
            <th className={classes.adminPageTableHead}>Email</th>
            <th className={classes.adminPageTableHead}>Comment</th>
            <th className={classes.adminPageTableHead}>Status</th>
            <th className={classes.adminPageTableHead}>Functions</th>
          </tr>
        </thead>
        <tbody className={classes["Users-tbody"]}>
          {contactforms.map((contactform) => (
            <tr key={contactform.id} className={classes["Users-tr"]}>
              <td className={classes.adminPagetable}>
                <input type="text" placeholder="ID" defaultValue={contactform.id} />
              </td>
              <td className={classes.adminPagetable}>
                <input type="text" placeholder="Name" defaultValue={contactform.name} />
              </td>
              <td className={classes.adminPagetable}>
                <input type="text" placeholder="Email" defaultValue={contactform.email} />
              </td>
              <td className={classes.adminPagetable}>
                <input type="text" placeholder="Comment" defaultValue={contactform.comment} />
              </td>
              <td className={classes.adminPagetable}>
                <input type="text" placeholder="status" defaultValue={contactform.status} />
              </td>
              <td className={classes.adminPagetable}>
                <button className={classes["Users-button"]} onClick={() => confirmMessage(contactform.id)}>Confirm</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMessages;
