import db from '../Database/db.js'
import express  from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// This function is responsible for inserting appointments in database
// Used in:ContactForm(Frontend side)

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    
    req.idnum = decoded.idnum;

    next();
  });
};

 export const InsertAppointment = (req, res) => {
    // const useridnum = req.cookies.idnum;
    const { datetime, categoryname } = req.body;
    const query = 'INSERT INTO appointments (useridnum, datetime, categoryname) VALUES (?, ?, ?)';
    const values = [req.idnum, datetime, categoryname];
  
    db.query(query, values, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Appointment inserted successfully!")
      }
    });
  }

// 
//

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

//
//
export const Appointments = (req, res) =>{

  const q = "SELECT * FROM appointment a INNER JOIN user u ON a.useridnum = u.idnum"

  db.query(q, (error, data) => {
    if (error) {
      return res.json(error)
    }
    return res.json(data)
  })
}