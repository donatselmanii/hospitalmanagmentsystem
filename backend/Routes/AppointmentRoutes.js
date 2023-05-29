import express from 'express'
import cookieParser from 'cookie-parser';
import { DeleteAppointment, InsertAppointment, VerifyUser, CountAppointments, PatientAppointments, Appointments, AddSlots, TimeSlots} from '../Controllers/AppointmentController.js';


const router = express.Router();
router.use(express.json());
router.use(cookieParser());

// This function is responsible for inserting appointments in database
// Used in:InsertAppointment(Frontend side)
router.post('/', InsertAppointment);



//
//
router.post('/timeslots', AddSlots);

//
//
router.delete('/', DeleteAppointment);

//
//
router.get('/', VerifyUser);

//
//
router.get('/count', CountAppointments);

//
//
router.get('/fetch', Appointments);

//
//
router.get('/patientappointments', PatientAppointments);

//
//
router.get('/fetchtimeslots', TimeSlots);

export default router