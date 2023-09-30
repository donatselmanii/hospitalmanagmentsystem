import express from 'express'
import cors from 'cors'
import ContactFormRoutes from './Routes/ContactFormRoutes.js';
import UserRoutes from './Routes/UserRoutes.js';
import AppointmentRoutes from './Routes/AppointmentRoutes.js';
import CityCategoryRoutes from './Routes/CityCategoryRoutes.js';
import LoginRoutes from './Routes/LoginRoutes.js';
import EpharmRoutes from './Routes/EpharmRoutes.js'
import fileUpload from 'express-fileupload';
import CompanyCategoryRoutes from './Routes/CompanyCategoryRoutes.js';
import ProductCategoryRoutes from './Routes/ProductCategoryRoutes.js'

const app = express()

app.use(express.json())
app.use(fileUpload());
app.use(express.static('Public'));


app.use(cors({
  origin: "http://localhost:3000",
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
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
app.use('/company', CompanyCategoryRoutes);
app.use('/productcategory', ProductCategoryRoutes);


const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});