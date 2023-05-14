import express from 'express'
import cookieParser from 'cookie-parser';
import { DeleteAppointment, InsertAppointment, VerifyUser} from '../Controllers/AppointmentController.js';


const router = express.Router();
router.use(express.json());
router.use(cookieParser());

// This function is responsible for inserting appointments in database
// Used in:ContactForm(Frontend side)
router.post('/', InsertAppointment);

//
//
router.delete('/', DeleteAppointment);

//
//
router.get('/', VerifyUser);

export default router