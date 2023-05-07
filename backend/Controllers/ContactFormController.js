import db from '../Database/db.js';

// This function is responsible for inserting data( messages from users ) in database
// Used in:ContactForm(Frontend side)

export const ContactFormRegister = (req, res) => {

    const { name, email, comment } = req.body;
    const q = "INSERT INTO contactform (name, email, comment) VALUES (?, ?, ?)";
    const values = [name, email, comment]
    db.query(q, values, (err, results) => {
        if (err) {
          console.log(err.message);
          console.log("Failed to insert message into database");
        } else {
          console.log("Message sent successfully");
        }
      }
    );
  }

// This function is responsible for selecting contactform messages from database
// Used in: AdminMessages.js(Frontend)

export const ContactFormList = (req, res) => {

    const q = "SELECT * FROM contactform"

    db.query(q, (error, data) => {
      if (error){
        return res.json(error)
      } else{
      return res.json(data)
      }
    })
  }

// This function is responsible for confirming messages that are answered
// Used in: AdminMessages.js(Frontend side)
export const ConfirmMessages = (req, res) => {

    const id = req.params.id;
    const status = "Message has been answered in email";
    const q = `UPDATE user SET status=? WHERE id=?`;

    db.query(q, [status, id], (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Message with ID ${id} confirmed successfully`);
      }
    });
  }

