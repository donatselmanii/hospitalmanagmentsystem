import db from '../Database/db.js'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
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


// This function is used for selecting user data then checking if passwords match,
// incase of no results sends a message  that user doesnt exist.
// Used in: Login.js(Frontend side)

export const Login = (req, res) => {
  const { idnum, password } = req.body;
  const q = "SELECT * FROM user WHERE idnum = ?;";

  db.query(q, idnum, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (error, response) => {
        if (response) {
          const idnum = results[0].idnum;
          const token = jwt.sign({ idnum }, 'jwt-secret-key', { expiresIn: '1d' });
          res.cookie('token', token);
          return res.json({ Status: "Success", idnum: results[0].idnum });
        } else {
          return res.send({ message: "Wrong username/password combination!" });
        }
      });
    } else {
      return res.send({ message: "User doesn't exist" });
    }
  });
};


  
//
//
export const VerifyUser = (req,res)=>{
  const token = req.cookies.token;

  if(!token){
    return res.json({Error:"You are not authenticated"});
  }
  else{
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okay!" });
      } else {
        const idnum = decoded.idnum;
        console.log('Login Decoded token:', decoded);
        console.log('Login Decoded idnum:', idnum);
        req.idnum = idnum;
        res.locals.idnum = idnum; // Set res.locals.idnum
        console.log('Login req.idnum:', req.idnum);
        console.log('Login res.locals.idnum:', res.locals.idnum); // Log res.locals.idnum
        return res.json({ Status: "Success", idnum: idnum });
      }
    })
  }
}

//
//
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
        console.log('Decoded token:', decoded);
        console.log('Decoded idnum:', idnum);
        req.idnum = idnum;
        res.locals.idnum = idnum; // Set res.locals.idnum
        console.log('req.idnum:', req.idnum);
        console.log('res.locals.idnum:', res.locals.idnum); // Log res.locals.idnum

        // Query the database to get user role and other data
        const q = 'SELECT name, surname, phone, email, role FROM user WHERE idnum = ?';

        db.query(q, [idnum], (error, results) => {
          if (error) {
            return res.json({ Error: 'Failed to fetch user role' });
          }

          if (results.length === 0) {
            return res.json({ Error: 'User not found' });
          }

          const role = results[0].role;
          const name = results[0].name;
          const surname = results[0].surname;
          const phone = results[0].phone;
          const email = results[0].email;

          return res.json({ Status: 'Success', idnum: idnum, role: role, name: name, surname: surname, phone: phone, email: email });
        });
      }
    });
  }
};


//
//
export const Logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  return res.json({ Status: "Success", message: "Logged out successfully" });
}