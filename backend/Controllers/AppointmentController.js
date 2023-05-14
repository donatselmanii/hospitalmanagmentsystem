import db from '../Database/db.js'
import express  from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true,
}));



export const VerifyUser = (req,res)=>{
  const token = req.cookies.token;

  if(!token){
    return res.json({Error:"You are not authenticateddddd"});
  }
  else{
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okay!" });
      } else {
        const idnum = decoded.idnum;
        console.log('Decoded token:', decoded);
        console.log('Decoded idnum:', idnum);
        req.idnum = idnum;
        res.locals.idnum = idnum; // Set res.locals.idnum
        console.log('req.idnum:', req.idnum);
        console.log('res.locals.idnum:', res.locals.idnum); // Log res.locals.idnum
        return res.json({ Status: "Success", idnum: idnum });
      }
    })
  }
}

// This function is responsible for inserting appointments in database
// Used in:ContactForm(Frontend side)

export const InsertAppointment = (req, res) => {
  const { idnum, datetime, categoryname } = req.body;
  const query = 'INSERT INTO appointments (idnum, datetime, categoryname) VALUES (?, ?, ?)';
  const values = [idnum ,datetime, categoryname];

  db.query(query, values, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to insert appointment' });
    } else {
      console.log('Appointment inserted successfully!');
      // Send a response to the client indicating the success of the operation
      return res.json({ status: 'success', message: 'Appointment inserted successfully' });
    }
  });
};



// 
//

  export const DeleteAppointment = (req, res) =>{
    const id = req.params.id;
    const q = "DELETE FROM appointments WHERE id=?"

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

  const q = "SELECT * FROM appointments a INNER JOIN user u ON a.useridnum = u.idnum"

  db.query(q, (error, data) => {
    if (error) {
      return res.json(error)
    }
    return res.json(data)
  })
}