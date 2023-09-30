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
        req.idnum = idnum;
        res.locals.idnum = idnum;
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
        req.idnum = idnum;
        res.locals.idnum = idnum;

        const q = 'SELECT * FROM appointments WHERE idnum = ?';

        db.query(q, [idnum], (error, results) => {
          if (error) {
            return res.json({ Error: 'Failed to fetch appointments' });
          }

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
        req.idnum = idnum;
        res.locals.idnum = idnum; 

        const q = 'SELECT * FROM appointments WHERE idnum = ? and status like "completed" ';

        db.query(q, [idnum], (error, results) => {
          if (error) {
            return res.json({ Error: 'Failed to fetch appointments' });
          }
          return res.json({ Status: 'Success', appointments: results });
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
        req.idnum = idnum;
        res.locals.idnum = idnum; 

        const q = 'SELECT * FROM appointments WHERE idnum = ? and status like "unfinished" ';

        db.query(q, [idnum], (error, results) => {
          if (error) {
            return res.json({ Error: 'Failed to fetch appointments' });
          }
          return res.json({ Status: 'Success', appointments: results });
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
      res.status(500).json({ message: 'Error saving appointment' });
    } else {
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
      } else{
      }
    })
  }

  
export const CancelAppointment = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM appointments WHERE id=?";

  db.query(query, [id], (error, result) => {
    if (error) {
      res.status(500).json({ status: 'Error', message: 'Failed to cancel the appointment.' });
    } else {
      res.json({ status: 'Success', message: 'Appointment cancelled successfully.' });
    }
  });
};

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

export const fetchAppointments = async (req, res) => {
  try {
    let q = 'SELECT * FROM appointments WHERE appointment_date IS NOT NULL';

    const { timeRange } = req.params;
    const { search } = req.query; 

  
    if (search) {
      q += ` AND (appointmentid LIKE '%${search}%' OR idnum LIKE '%${search}%' OR doctor_id LIKE '%${search}%')`; 
    }

    switch (timeRange) {
      case 'today':
        q += " AND DATE(appointment_date) = CURDATE()";
        break;
      case 'yesterday':
        q += " AND DATE(appointment_date) = DATE(CURDATE() - INTERVAL 1 DAY)";
        break;
      case 'lastweek':
        q += " AND appointment_date >= CURDATE() - INTERVAL 1 WEEK";
        break;
      case 'lastmonth':
        q += " AND appointment_date >= CURDATE() - INTERVAL 1 MONTH";
        break;
      case 'last10':
        q += " ORDER BY appointment_date DESC LIMIT 10";
        break;
      case 'all':
        break;
      default:
        return res.status(400).json({ message: 'Invalid time range' });
    }

    db.query(q, (error, data) => {
      if (error) {
        return res.status(500).json(error);
      }

      return res.json(data);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
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
        return res.status(500).json({ error: 'Failed to insert time slots' });
      } else {
        return res.json({ status: 'success', message: 'Time slot inserted successfully' });
      }
    });
  };

//
//
export const UserReports = (req, res) => {
  const appointmentId = req.params.appointmentId;
  const query = "SELECT * FROM appointments WHERE appointmentid = ?";


  db.query(query, [appointmentId], (error, results) => {
    if (error) {
      res.status(500).json({ Status: 'Error', Message: 'Failed to fetch medical report' });
    } else {
      if (results.length > 0) {
        const medicalReport = results[0].medical_report;
        const doctorid = results[0].doctor_id;
        const idnum = results[0].idnum;
        res.status(200).json({ Status: 'Success', MedicalReport: medicalReport, doctorid: doctorid, idnum: idnum });
      } else {
        res.status(404).json({ Status: 'Error', Message: 'Medical report not found' });
      }
    }
  });
};

//
//
export const UserReport = (req, res) => {
  const appointmentId = req.params.appointmentId;
  const query = "SELECT * FROM medical_report WHERE appointmentid = ?";


  db.query(query, [appointmentId], (error, results) => {
    if (error) {
      res.status(500).json({ Status: 'Error', Message: 'Failed to fetch medical report' });
    } else {
      if (results.length > 0) {
        const medicalReport = results[0].description;
        const patientid = results[0].patientid;
        res.status(200).json({ Status: 'Success', MedicalReport: medicalReport, patientid: patientid });
      } else {
        res.status(404).json({ Status: 'Error', Message: 'Medical report not found' });
      }
    }
  });
};

//
//
export const getMedicalReportByReportId = (req, res) => {
  const reportid = req.params.reportid;
  const query = "SELECT * FROM medical_report WHERE id = ?";

  db.query(query, [reportid], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ status: 'Error', message: 'Failed to fetch medical report' });
    } else {
      if (results.length > 0) {
        const medicalReport = results[0].description;
        const patientid = results[0].patientid;
        res.status(200).json({ status: 'Success', medicalReport, patientid });
      } else {
        res.status(404).json({ status: 'Error', message: 'Medical report not found' });
      }
    }
  });
};


export const LatestReport = (req, res) => {
  const { doctorId, appointmentId } = req.params;
  const query = "SELECT * FROM medical_report WHERE doctorid = ? AND appointmentid = ?";

  db.query(query, [doctorId, appointmentId], (error, results) => {
    if (error) {
      res.status(500).json({ Status: 'Error', Message: 'Failed to fetch medical report' });
    } else {
      if (results.length > 0) {
        const reportId = results[0].id;
        res.status(200).json({ Status: 'Success', reportId: reportId });
      } else {
        res.status(404).json({ Status: 'Error', Message: 'Report not found' });
      }
    }
  });
};


//
//
export const InsertMedicine = (req, res) => {
  try {
    const { reportid, productid, quantity, code } = req.body;
   
    const sql = 'INSERT INTO recommended_products (reportid, productid, quantity, code) VALUES (?, ?, ?, ?)';
    const values = [reportid, productid, quantity, code];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding product to cart:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      return res.status(201).json({ message: 'Product added to cart' });
    });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
//
//
export const InsertMedicalReport = (req, res) => {
  const { appointmentId } = req.params;
  const { medicalReport, DoctorId, idnum } = req.body;
  console.log(medicalReport, DoctorId, idnum,appointmentId )

  const q = 'INSERT INTO medical_report (appointmentid, description, doctorid, patientid) VALUES (?, ?, ?, ?)';

  db.query(q, [appointmentId, medicalReport, DoctorId, idnum], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Failed to insert medical report' });
    } else {
      return res.json({ Status: 'Success' });
    }
  });
};


export const CheckMedicalReportExists = (req, res) => {
  const { appointmentId } = req.params;
  const query = 'SELECT COUNT(*) AS reportCount FROM medical_report WHERE appointmentid = ?';

  db.query(query, [appointmentId], (error, results) => {
    if (error) {
      console.error('Error checking medical report existence:', error);
      res.status(500).json({ MedicalReportExists: false, error: 'Failed to check medical report existence' });
    } else {
      const reportCount = results[0].reportCount;
      const medicalReportExists = reportCount > 0;
      res.status(200).json({ MedicalReportExists: medicalReportExists });
    }
  });
};


export const UpdateMedicalReport = (req, res) => {
  const { appointmentId } = req.params;
  const { medicalReport } = req.body;
  const query = 'UPDATE medical_report SET description = ? WHERE appointmentid = ?';

  db.query(query, [medicalReport, appointmentId], (error, results) => {
    if (error) {
      console.error('Error updating medical report:', error);
      res.status(500).json({ error: 'Failed to update medical report' });
    } else {
      res.status(200).json({ Status: 'Success' });
    }
  });
};



//
//


export const getDoctorAppointments = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ Error: 'You are not authenticated' });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Error: 'Token is not valid' });
      } else {
        const idnum = decoded.idnum;

        const q = 'SELECT name, surname, phone, email, role FROM user WHERE idnum = ?';

        db.query(q, [idnum], (error, results) => {
          if (error) {
            return res.json({ Error: 'Failed to fetch user role' });
          }

          if (results.length === 0) {
            return res.json({ Error: 'User not found' });
          }
          const id = results[0].id;
          const role = results[0].role;
          const name = results[0].name;
          const surname = results[0].surname;
          const phone = results[0].phone;
          const email = results[0].email;

          const query = `
            SELECT a.*, u.idnum AS user_idnum, u.name AS user_name
            FROM appointments AS a
            JOIN user AS u ON a.idnum = u.idnum
            WHERE a.doctor_id = ?;
          `;

          db.query(query, [idnum], (error, appointmentResults) => {
            if (error) {
              res.status(500).json({ error: 'Error retrieving appointments' });
            } else {
              res.json({
                Status: 'Success',
                id: id,
                idnum: idnum,
                role: role,
                name: name,
                surname: surname,
                phone: phone,
                email: email,
                appointments: appointmentResults
              });
            }
          });
        });
      }
    });
  }
};



export const VerifyUserRole = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ Error: 'You are not authenticated' });
  } else {
    jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ Error: 'Token is not valid' });
      } else {
        const idnum = decoded.idnum;

        req.idnum = idnum;
        res.locals.idnum = idnum;

        const q = 'SELECT name, surname, phone, email, role FROM user WHERE idnum = ?';

        db.query(q, [idnum], (error, results) => {
          if (error) {
            return res.json({ Error: 'Failed to fetch user role' });
          }

          if (results.length === 0) {
            return res.json({ Error: 'User not found' });
          }
          const id = results[0].id;
          const role = results[0].role;
          const name = results[0].name;
          const surname = results[0].surname;
          const phone = results[0].phone;
          const email = results[0].email;

          return res.json({ Status: 'Success', id: id, idnum: idnum, role: role, name: name, surname: surname, phone: phone, email: email });
        });
      }
    });
  }
};

//
//
export const DoctorAppointments = (req, res) => {
  const doctorId = req.idnum; // Access the idnum from the VerifyUserRole function

  // SQL query to fetch appointments of the doctor with user details
  const query = `
  SELECT a.*, u.idnum AS user_idnum, u.name AS user_name
  FROM appointments
  AS a JOIN user AS u ON a.idnum = u.idnum
  WHERE a.doctor_id = ?;
  `;

  // Execute the query with the provided doctorId parameter
  db.query(query, [doctorId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving appointments' });
    } else {
      res.json(results);
    }
  });
};

//
//
// 
// Update appointment status to completed

export const CompletedAppointment = (req, res) => {
  const { appointmentId } = req.params;

  const q = 'UPDATE appointments SET status = "completed" WHERE appointmentid = ?';

  db.query(q, [appointmentId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Failed to update appointment status' });
    } else {
      res.sendStatus(200);
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
  
  
  
 