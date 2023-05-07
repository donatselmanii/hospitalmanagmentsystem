import express from 'express'
import { InsertAppointment } from '../Controllers/AppointmentController.js';


const router = express.Router();

// This function is responsible for inserting appointments in database
// Used in:ContactForm(Frontend side)
router.post('/', InsertAppointment);

export default router