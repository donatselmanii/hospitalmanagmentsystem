import db from '../Database/db.js'

// This function is responsible for inserting appointments in database
// Used in:ContactForm(Frontend side)

 export const InsertAppointment = (req, res) => {

    const { datetime, categoryname } = req.body;
    const query = 'INSERT INTO appointments (datetime, categoryname) VALUES (?, ?)';
    const values = [datetime, categoryname];
  
    db.query(query, values, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Appointment inserted successfully!")
      }
    });
  }

  export const DeleteAppointment = (req, res) =>{
    const id = req.params.id;
    const q = "DELETE FROM appointment WHERE id=?"

    db.query(q, [id], (error,result)=>{
      if(error){
        console.log(error)
      } else{
        console.log('Deleted appointment with id: ${id} ');
      }
    })
  }
