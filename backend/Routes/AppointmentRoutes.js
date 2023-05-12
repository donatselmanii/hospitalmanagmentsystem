import express from 'express'
import { DeleteAppointment, InsertAppointment, verifyToken } from '../Controllers/AppointmentController.js';


const router = express.Router();

// This function is responsible for inserting appointments in database
// Used in:ContactForm(Frontend side)
router.post('/', InsertAppointment);

//
//
router.delete('/', DeleteAppointment);

//
//
router.get('/', verifyToken);

export default router