import db from '../Database/db.js'
import express  from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
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
// Used in:InsertAppointment(Frontend side)

export const InsertAppointment = (req, res) => {
  const { idnum, citycategory, datetime, timeSlot } = req.body;

  
  const q = 'INSERT INTO appointments (idnum, categoryname, appointment_date, timeslot) VALUES (?, ?, ?, ?)';

  db.query(q, [idnum, citycategory, datetime, timeSlot], (error, results) => {
    if (error) {
      console.error('Error saving appointment:', error);
      res.status(500).json({ message: 'Error saving appointment' });
    } else {
      console.log('Appointment saved successfully!');
      res.status(200).json({ message: 'Appointment saved successfully' });
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

//This function is responsible for fetching appoitnments from database.
//Used in AppointmentComponent(frontend side).
export const Appointments = (req, res) =>{

  const q = "SELECT * FROM appointments"

  db.query(q, (error, data) => {
    if (error) {
      return res.json(error)
    }
    return res.json(data)
  })
}

//
//
export const PatientAppointments = (req, res) =>{
  const idnum = req.body;
  const q = "SELECT * FROM appointments where idnum=?"

  db.query(q, (error, data) => {
    if (error) {
      return res.json(error)
    }
    return res.json(data)
  })
}

//
//
export const TimeSlots = (req, res) =>{

  const q = "SELECT * FROM timeslots"

  db.query(q, (error, data) => {
    if (error) {
      return res.json(error)
    }
    return res.json(data)
  })
}

//This function is responsible for counting appointments from database and returning the number of the total appointments!
//Used in Dashboard.js(Frontend side).

export const CountAppointments = (req, res) => {
  const q = "SELECT COUNT(*) AS appointmentCount FROM appointments";

  db.query(q, (error, results) => {
    if (error) {
      console.error('Error:', error);
      return;
    }

    const appointmentCount = results[0].appointmentCount;
    res.json({ count: appointmentCount });
  });
};


//
//
  export const AddSlots = (req, res) => {
    const { hour, minutes } = req.body;
    const q = "Insert INTO timeslots (hour, minutes) VALUES (?,?) ";
    const values = [hour, minutes];
  
    db.query(q, values, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to insert time slots' });
      } else {
        console.log('Time slot inserted successfully!');
        // Send a response to the client indicating the success of the operation
        return res.json({ status: 'success', message: 'Time slot inserted successfully' });
      }
    });
  };