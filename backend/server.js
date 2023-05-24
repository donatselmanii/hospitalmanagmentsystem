import express from 'express'
import cors from 'cors'
import ContactFormRoutes from './Routes/ContactFormRoutes.js';
import UserRoutes from './Routes/UserRoutes.js';
import AppointmentRoutes from './Routes/AppointmentRoutes.js';
import CityCategoryRoutes from './Routes/CityCategoryRoutes.js';
import LoginRoutes from './Routes/LoginRoutes.js';
import EpharmRoutes from './Routes/EpharmRoutes.js'

const app = express()

app.use(express.json())



app.use(cors({
  origin: "http://localhost:3000",
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true,
}));


app.get("/", (req, res) => {
  res.json('hello this is backend')
})

app.use('/contactform', ContactFormRoutes);
app.use('/users', UserRoutes);
app.use('/appointments', AppointmentRoutes);
app.use('/citycategory', CityCategoryRoutes);
app.use('/login', LoginRoutes);
app.use('/epharm', EpharmRoutes);

app.put('/users/:id', (req, res) => {
 const updatedUser = updateUser(req, res)
});


const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
