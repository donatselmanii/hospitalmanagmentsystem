import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import ContactFormRoutes from './Routes/ContactFormRoutes.js';
import UserRoutes from './Routes/UserRoutes.js';
import AppointmentRoutes from './Routes/AppointmentRoutes.js';
import CityCategoryRoutes from './Routes/CityCategoryRoutes.js';

const app = express()

app.use(express.json())

const saltRounds = 10

app.use(cors({
  origin: "*",
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  key: 'userId',
  secret: 'qelsijetes',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: true,
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000 
  }
}));

app.get("/", (req, res) => {
  res.json('hello this is backend')
})

app.use('/contactform', ContactFormRoutes);
app.use('/users', UserRoutes);
app.use('/appointments', AppointmentRoutes);
app.use('/citycategory', CityCategoryRoutes);

app.put('/users/:id', (req, res) => {
 const updatedUser = updateUser(req, res)
});


const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
