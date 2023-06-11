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
        console.log('Verify-User Decoded token:', decoded);
        console.log('Verify-User Decoded idnum:', idnum);
        req.idnum = idnum;
        res.locals.idnum = idnum; // Set res.locals.idnum
        console.log('Verify-User req.idnum:', req.idnum);
        console.log('Verify-User res.locals.idnum:', res.locals.idnum); // Log res.locals.idnum
        return res.json({ Status: "Success", idnum: idnum });
      }
    })
  }
}

//This function is responsible forfetching appointment data for the user.
//Used in AppointmentPatientComponent.js(Frontend side).

export const VerifyUserAppointments = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ Error: 'You are not authenticated' });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Error: 'Token is not valid' });
      } else {
        const idnum = decoded.idnum;
        console.log('User-Appointments Decoded token:', decoded);
        console.log('User-Appointments Decoded idnum:', idnum);
        req.idnum = idnum;
        res.locals.idnum = idnum; // Set res.locals.idnum
        console.log('User-Appointments req.idnum:', req.idnum);
        console.log('User-Appointments res.locals.idnum:', res.locals.idnum); // Log res.locals.idnum

        // Query the database to get user role and other data
        const q = 'SELECT * FROM appointments WHERE idnum = ?';

        db.query(q, [idnum], (error, results) => {
          if (error) {
            console.log('Error fetching appointments:', error);
            return res.json({ Error: 'Failed to fetch appointments' });
          }

          console.log('Appointments:', results); // Log fetched appointments

          return res.json({ Status: 'Successs', appointments: results });
        });
      }
    });
  }
};

export const CompletedAppointments = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ Error: 'You are not authenticated' });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Error: 'Token is not valid' });
      } else {
        const idnum = decoded.idnum;
        console.log('User-Appointments Decoded token:', decoded);
        console.log('User-Appointments Decoded idnum:', idnum);
        req.idnum = idnum;
        res.locals.idnum = idnum; // Set res.locals.idnum
        console.log('User-Appointments req.idnum:', req.idnum);
        console.log('User-Appointments res.locals.idnum:', res.locals.idnum); // Log res.locals.idnum

        // Query the database to get user role and other data
        const q = 'SELECT * FROM appointments WHERE idnum = ? and status like "completed" ';

        db.query(q, [idnum], (error, results) => {
          if (error) {
            console.log('Error fetching appointments:', error);
            return res.json({ Error: 'Failed to fetch appointments' });
          }

          console.log('Appointments:', results); // Log fetched appointments

          return res.json({ Status: 'Successs', appointments: results });
        });
      }
    });
  }
};
export const UnfinishedAppointments = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ Error: 'You are not authenticated' });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Error: 'Token is not valid' });
      } else {
        const idnum = decoded.idnum;
        console.log('User-Appointments Decoded token:', decoded);
        console.log('User-Appointments Decoded idnum:', idnum);
        req.idnum = idnum;
        res.locals.idnum = idnum; // Set res.locals.idnum
        console.log('User-Appointments req.idnum:', req.idnum);
        console.log('User-Appointments res.locals.idnum:', res.locals.idnum); // Log res.locals.idnum

        // Query the database to get user role and other data
        const q = 'SELECT * FROM appointments WHERE idnum = ? and status like "unfinished" ';

        db.query(q, [idnum], (error, results) => {
          if (error) {
            console.log('Error fetching appointments:', error);
            return res.json({ Error: 'Failed to fetch appointments' });
          }

          console.log('Appointments:', results); // Log fetched appointments

          return res.json({ Status: 'Successs', appointments: results });
        });
      }
    });
  }
};



// This function is responsible for inserting appointments in database
// Used in:InsertAppointment(Frontend side)

export const InsertAppointmentTest = (req, res) => {
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


  //
  //

  export const InsertAppointment = async (req, res) => {
    try {
      const { idnum, appointmentDate, timeslot, categoryname, appointmentTime } = req.body;
  
      // Get the doctor with the minimum appointments count from the specific city
      const selectDoctorQuery = `
        SELECT id
        FROM user
        WHERE city = ? AND role = 'doctor' AND appointments_count = (
          SELECT MIN(appointments_count)
          FROM user
          WHERE city = ? AND role = 'doctor'
        )
        LIMIT 1;
      `;
      const [doctorResult] = await executeQuery(selectDoctorQuery, [categoryname, categoryname]);
  
      if (doctorResult) {
        const doctorId = doctorResult.id;
  
        // Check if the doctor has already reached the maximum appointments limit for the specified date
        const countAppointmentsQuery = `
          SELECT COUNT(*) AS appointmentsCount
          FROM appointments
          WHERE doctor_id = ? AND appointment_date = ?;
        `;
        const countAppointmentsValues = [doctorId, appointmentDate];
        const [countResult] = await executeQuery(countAppointmentsQuery, countAppointmentsValues);
  
        const appointmentsCount = countResult.appointmentsCount;
        const maxAppointmentsPerDay = 10;
  
        if (appointmentsCount >= maxAppointmentsPerDay) {
          return res.status(400).json({ message: 'Maximum appointments limit reached for the specified date.' });
        }
  
        // Update the appointments count for the selected doctor
        const updateQuery = `
          UPDATE user
          SET appointments_count = appointments_count + 1
          WHERE id = ?;
        `;
        await executeQuery(updateQuery, [doctorId]);
  
        // Insert the appointment
        const insertQuery = `
      INSERT INTO appointments (doctor_id, idnum, appointment_date, timeslot, categoryname, appointment_time)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const insertValues = [doctorId, idnum, appointmentDate, timeslot, categoryname, appointmentTime];
    await executeQuery(insertQuery, insertValues);
  
        res.status(200).json({ message: 'Appointment successfully booked!' });
      } else {
        res.status(404).json({ message: 'No available doctor found in the specified city category.' });
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      res.status(500).json({ message: 'Error booking appointment' });
    }
  };
  
  
  
  
  const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
      db.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  
  
  
 