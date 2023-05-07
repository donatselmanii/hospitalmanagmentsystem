import db from '../Database/db.js'

// This function is responsible for inserting appointments in database
// Used in:ContactForm(Frontend side)

 export const InsertAppointment = (req, res) => {

    const { userid, datetime, citycategory } = req.body;
    const query = 'INSERT INTO appointments (userid, datetime, citycategory) VALUES (?, ?, ?)';
    const values = [userid, datetime, citycategory];
  
    db.query(query, values, (error, results) => {
      if (error) {
        console.error(err);
      } else {
        console.log("Appointment inserted successfully!")
      }
    });
  }
