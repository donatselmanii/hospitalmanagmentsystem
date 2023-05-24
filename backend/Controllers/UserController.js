import db from '../Database/db.js'
import bcrypt from 'bcrypt'


// This function is responsible for selecting user info from database and showing it to the frontend code
// Used in: UserList.js(Frontend side)
 export const User = (req, res) =>{

    const q = "SELECT * FROM user"

    db.query(q, (error, data) => {
      if (error) {
        return res.json(error)
      }
      return res.json(data)
    })
 }


// This function is responsible for selecting 10 recent users with their info from database and showing it to the frontend code
// Used in: DashboardComponent.js(Frontend side)
export const RecentUser = (req, res) =>{

  const q = "SELECT * FROM user WHERE role='patient' ORDER BY id DESC LIMIT 6";

  db.query(q, (error, data) => {
    if (error) {
      return res.json(error)
    }
    return res.json(data)
  })
}

// This function is responsible for updating user info
// Used in: UserList.js(Frontend side)
 export const UpdateUser = (req, res) => {

    const { id, idnum, name, surname, phone, email, password, role} = req.body;
    const q = `UPDATE user SET idnum=?, name=?, surname=?, phone=?, email=?, password=?, role=? WHERE id=?`;
    const values = [idnum, name, surname, phone, email, password, role, id]

    db.query(q, values, (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`User with ID ${id} updated successfully`);
      }
    });
   }

// This function is responsible for deleting users from database
// Used in: UserList.js(Frontend side)
export const DeleteUser = (req, res) => {

    const id = req.params.id;
    const q = "DELETE FROM user WHERE id = ?";

    db.query(q, [id], (error, result) => {
      if(error){
        return res.json(error);
      } else{
      return res.json(result);
      }
    });
  }

// This function is responsible for user registration
// Used in Register.js(Frontend side)
const saltRounds = 10
export const UserRegister = (req, res) => {

    const { idnum, name, surname, phone, email, password, role} = req.body;
    

    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) {
        console.log(error)
      }

      const values = [idnum, name, surname, phone, email, hash, 'patient'];
      
      db.query(
        "INSERT INTO user (idnum, name, surname, phone, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values, (error, results) => {
          if (error) {
            console.log(err.message);
          } else {
            console.log('Data inserted successfully');
            return res.json({Status : "Success"})
          }
        }
      );
    });
}

//This function is responsible for counting users from database and returning the number of the total users!
//Used in Dashboard.js(Frontend side).

export const CountUsers = (req, res) => {
  const query = "SELECT COUNT(*) AS userCount FROM user WHERE role='patient'";

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error:', error);
      return;
    }

    const userCount = results[0].userCount;
    res.json({ count: userCount });
  });
};

//This function is responsible for counting users from database and returning the number of the total users!
//Used in Dashboard.js(Frontend side).

export const CountDoctors = (req, res) => {
  const query = "SELECT COUNT(*) AS doctorCount FROM user WHERE role='doctor'";

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error:', error);
      return;
    }

    const doctorCount = results[0].doctorCount;
    res.json({ doctorcount: doctorCount });
  });
};
